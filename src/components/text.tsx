import { createElement } from "react"
import type { TextProps } from "react-native"
import { createStyleSheet, useStyles } from "react-native-unistyles"
import type { Color } from "~/theme/colors"
import type { TextVariant } from "~/theme/text"

type Props = TextProps & {
  variant?: TextVariant
  weight?: "normal" | "medium" | "semibold"
  color?: Color
}

export function Text({
  variant = "body",
  weight = "normal",
  color = "textMain",
  style,
  ...props
}: Props) {
  const { styles } = useStyles(stylesheet, { variant, weight })
  return createElement("RCTText", {
    ...props,
    style: [styles.root(color), style],
  })
}

const stylesheet = createStyleSheet((theme) => ({
  root: (color: Color) => ({
    fontFamily: "Poppins",
    color: theme.color[color],
    variants: {
      variant: {
        title: {
          fontSize: theme.text.title.fontSize,
          lineHeight: theme.text.title.lineHeight,
        },
        body: {
          fontSize: theme.text.body.fontSize,
          lineHeight: theme.text.body.lineHeight,
        },
        caption: {
          fontSize: theme.text.caption.fontSize,
          lineHeight: theme.text.caption.lineHeight,
        },
      },
      weight: {
        normal: {
          fontWeight: "400",
        },
        medium: {
          fontWeight: "500",
        },
        semibold: {
          fontWeight: "600",
        },
      },
    },
  }),
}))
