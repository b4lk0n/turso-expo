import { createStyleSheet, useStyles } from "react-native-unistyles"
import { Button } from "~/components/button"
import { Text } from "~/components/text"
import { View } from "~/components/view"

type Props = {
  fullName: string
  isDeleting?: boolean
  onDelete: () => void
}

export function ContactListItem({
  fullName,
  isDeleting = false,
  onDelete,
}: Props) {
  const { styles } = useStyles(stylesheet)

  return (
    <View style={styles.root(isDeleting)}>
      <Text variant="caption" color={isDeleting ? "textDisabled" : "textTitle"}>
        {fullName}
      </Text>

      <Button
        label="Delete"
        onPress={onDelete}
        disabled={isDeleting}
        variant="critical"
      />
    </View>
  )
}

const stylesheet = createStyleSheet((theme) => ({
  root: (isDeleting: boolean) => ({
    height: 40,
    paddingHorizontal: theme.spacing(4),
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.color[isDeleting ? "disabled" : "surface"],
  }),
}))
