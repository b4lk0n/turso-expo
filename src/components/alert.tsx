import { StyleSheet, type ViewProps } from "react-native"
import { createStyleSheet, useStyles } from "react-native-unistyles"
import { Text } from "./text"
import { View } from "./view"

type Props = Omit<ViewProps, "children"> & {
  variant?: "normal" | "critical"
  text: string
}

export function Alert({ variant, text, style, ...props }: Props) {
  const { styles } = useStyles(stylesheet, { variant })

  return (
    <View style={styles.root}>
      <Text style={styles.text}>{text}</Text>
    </View>
  )
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    borderRadius: theme.radius.large,
    borderWidth: StyleSheet.hairlineWidth,
    paddingHorizontal: theme.spacing(3),
    paddingVertical: theme.spacing(2),

    variants: {
      variant: {
        normal: {
          borderColor: theme.color.borderStrong,
        },
        critical: {
          borderColor: theme.color.textCritical,
          backgroundColor: theme.color.critical,
        },
      },
    },
  },
  text: {
    fontSize: theme.text.caption.fontSize,
    lineHeight: theme.text.caption.lineHeight,

    variants: {
      variant: {
        normal: {
          color: theme.color.textMain,
        },
        critical: {
          color: theme.color.textCritical,
        },
      },
    },
  },
}))
