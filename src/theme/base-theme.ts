import { borderRadius } from "./border-radius"
import { textVariants } from "./text"
import type { Theme } from "./theme"

export const baseTheme: Omit<Theme, "color"> = {
  text: textVariants,
  radius: borderRadius,
  spacing: (multiplier = 1) => 4 * multiplier,
}
