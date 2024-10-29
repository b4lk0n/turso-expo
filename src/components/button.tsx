import { isDriverValueEncoder } from "drizzle-orm"
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from "react-native"
import Animated, {
  cancelAnimation,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated"
import { createStyleSheet, useStyles } from "react-native-unistyles"
import { isDirty } from "zod"
import { Text } from "./text"

const DEFAULT_TARGET_SCALE = 0.98
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type Props = Omit<PressableProps, "children" | "style"> & {
  label: string
  targetScale?: number
  variant?: "primary" | "ghost" | "critical"
  style?: StyleProp<ViewStyle>
}

export function Button({
  onPressIn,
  onPressOut,
  style,
  targetScale = DEFAULT_TARGET_SCALE,
  label,
  disabled = false,
  variant = "primary",
  ...props
}: Props) {
  const scale = useSharedValue(1)
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }))
  const { styles } = useStyles(stylesheet, { variant })

  return (
    <AnimatedPressable
      onPressIn={(e) => {
        if (onPressIn) {
          onPressIn(e)
        }

        cancelAnimation(scale)
        scale.value = withTiming(targetScale, { duration: 100 })
      }}
      onPressOut={(e) => {
        if (onPressOut) {
          onPressOut(e)
        }
        cancelAnimation(scale)
        scale.value = withTiming(1, { duration: 100 })
      }}
      disabled={disabled}
      style={[styles.root(!!disabled), animatedStyle, style]}
      {...props}
    >
      <Text variant="caption" style={styles.label(!!disabled)}>
        {label}
      </Text>
    </AnimatedPressable>
  )
}

const stylesheet = createStyleSheet((theme) => ({
  root: (isDisabled: boolean) => ({
    height: theme.spacing(10),
    alignItems: "center",
    justifyContent: "center",
    borderRadius: theme.radius.normal,

    variants: {
      variant: {
        primary: {
          backgroundColor:
            theme.color[isDisabled ? "primaryDisabled" : "primary"],
        },
        ghost: {
          backgroundColor: isDisabled ? theme.color.disabled : "transparent",
        },

        critical: {
          backgroundColor: isDisabled ? theme.color.disabled : "transparent",
        },
      },
    },
  }),

  label: (isDisabled: boolean) => ({
    variants: {
      variant: {
        primary: {
          color: theme.color[isDisabled ? "textDisabled" : "textOnPrimary"],
          fontWeight: "500",
        },
        ghost: {
          color: theme.color[isDisabled ? "textDisabled" : "textMain"],
        },
        critical: {
          color: theme.color[isDisabled ? "textDisabled" : "textCritical"],
        },
      },
    },
  }),
}))
