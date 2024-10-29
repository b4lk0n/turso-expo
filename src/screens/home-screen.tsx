import { desc, eq } from "drizzle-orm"
import { useCallback, useEffect, useState } from "react"
import { FlatList, StyleSheet } from "react-native"
import { createStyleSheet, useStyles } from "react-native-unistyles"
import { View } from "~/components/view"
import { useDb } from "~/db-context"
import * as schema from "~/db/schema"
import type { Contact } from "~/db/schema"
import { ContactListItem } from "./contact-list-item"

export default function HomeScreen() {
  const db = useDb()
  const [contacts, setContacts] = useState<Contact[]>([])
  const { styles } = useStyles(stylesheet)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [deletingId, setDeletingId] = useState<number | null>(null)

  const fetchContacts = useCallback(async () => {
    const start = performance.now()
    const rows = await db?.query.contacts.findMany({
      orderBy: [desc(schema.contacts.id)],
    })
    const end = performance.now()

    console.log("Fetch contacts took:", end - start, "ms")

    setContacts(rows ?? [])
  }, [db])

  useEffect(() => {
    fetchContacts()
  }, [fetchContacts])

  const refreshList = async () => {
    setIsRefreshing(true)

    await fetchContacts()

    setIsRefreshing(false)
  }

  const deleteContact = async (contactId: number) => {
    setDeletingId(contactId)
    await db?.delete(schema.contacts).where(eq(schema.contacts.id, contactId))
    await fetchContacts()
    setDeletingId(null)
  }

  return (
    <View>
      <FlatList
        onRefresh={refreshList}
        refreshing={isRefreshing}
        data={contacts}
        renderItem={({ item }) => (
          <ContactListItem
            isDeleting={deletingId === item.id}
            fullName={item.fullName}
            onDelete={() => deleteContact(item.id)}
          />
        )}
        keyExtractor={(item) => String(item.id)}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        style={styles.list}
      />
    </View>
  )
}

const stylesheet = createStyleSheet((theme) => ({
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: theme.color.borderStrong,
  },
  list: {},
}))
