import type { ComponentPropsWithoutRef } from "react"
import { createStyleSheet, useStyles } from "react-native-unistyles"
import { View } from "./view"

type Props = ComponentPropsWithoutRef<typeof View>

export function SafeAreaView({ style, ...props }: Props) {
  const { styles } = useStyles(stylesheet)

  return <View {...props} style={[styles.root, style]} />
}

const stylesheet = createStyleSheet((theme, runtime) => ({
  root: {
    flex: 1,
    backgroundColor: theme.color.background,
    paddingTop: runtime.insets.top,
    paddingRight: runtime.insets.right,
    paddingBottom: runtime.insets.bottom,
    paddingLeft: runtime.insets.left,
  },
}))
