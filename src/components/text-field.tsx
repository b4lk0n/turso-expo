import { StyleSheet, TextInput, type TextInputProps } from "react-native"
import { createStyleSheet, useStyles } from "react-native-unistyles"
import { Text } from "./text"
import { View } from "./view"

type Props = TextInputProps & {
  label?: string
  error?: string
  disabled?: boolean
}

export function TextField({
  label,
  error,
  disabled = false,
  style,
  ...props
}: Props) {
  const { styles, theme } = useStyles(stylesheet)

  return (
    <View style={styles.root}>
      {label && (
        <Text variant="caption" style={styles.label}>
          {label}
        </Text>
      )}

      <TextInput
        {...props}
        editable={!disabled}
        placeholderTextColor={theme.color.textPlaceholder}
        style={[styles.input(disabled), style]}
      />

      {error && (
        <Text variant="footnote" color="textCritical" style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  )
}

const stylesheet = createStyleSheet((theme) => ({
  root: {
    gap: 2,
  },
  label: {},
  input: (isDisabled: boolean) => ({
    height: theme.spacing(10),
    borderRadius: theme.radius.normal,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.color.borderStrong,
    backgroundColor: theme.color[isDisabled ? "disabled" : "surface"],
    color: theme.color[isDisabled ? "textDisabled" : "textMain"],
    fontSize: theme.text.body.fontSize,
    paddingHorizontal: theme.spacing(3),
  }),
  error: {},
}))
