import { zodResolver } from "@hookform/resolvers/zod"
import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Controller, useForm } from "react-hook-form"
import { createStyleSheet, useStyles } from "react-native-unistyles"
import { z } from "zod"
import { useAuth } from "~/auth-context"
import { Alert } from "~/components/alert"
import { Button } from "~/components/button"
import { Text } from "~/components/text"
import { TextField } from "~/components/text-field"
import { View } from "~/components/view"
import { useDb } from "~/db-context"
import * as dbSchema from "~/db/schema"

type Props = NativeStackScreenProps<{
  NewContact: undefined
}>

const schema = z.object({
  name: z.string().min(3).max(100),
})
type FormData = z.infer<typeof schema>

export function NewContactScreen({ navigation }: Props) {
  const { styles } = useStyles(stylesheet)
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })
  const db = useDb()
  const { user } = useAuth()

  const onSubmit = async (data: FormData) => {
    if (!db) {
      setError("root", {
        message: "Database is not ready",
      })

      return
    }

    if (!user?.id) {
      setError("root", {
        message: "No auth user",
      })
      return
    }

    try {
      await db.insert(dbSchema.contacts).values({
        fullName: data.name,
        consultantId: user.id,
      })

      navigation.goBack()
    } catch (e) {
      const cause = e instanceof Error ? e.message : String(e)

      setError("root", { message: `Error: ${cause}` })
    }
  }

  return (
    <View style={styles.root}>
      <Text variant="body" color="textSecondary">
        Add a new contact
      </Text>

      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextField
            placeholder="John Doe"
            disabled={isSubmitting}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            autoCorrect={false}
            autoComplete="name"
            error={errors.name?.message}
          />
        )}
      />

      <View style={styles.footer}>
        <Button
          variant="ghost"
          label="Cancel"
          style={styles.button}
          onPress={() => navigation.goBack()}
          disabled={isSubmitting}
        />
        <Button
          label="Create"
          style={styles.button}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        />
      </View>

      {errors.root?.message && (
        <Alert variant="critical" text={errors.root.message} />
      )}
    </View>
  )
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    gap: theme.spacing(4),
    paddingHorizontal: theme.spacing(6),
    paddingVertical: theme.spacing(4),
  },

  footer: {
    flexDirection: "row",
    gap: theme.spacing(2),
  },

  button: {
    flex: 1,
  },
}))
