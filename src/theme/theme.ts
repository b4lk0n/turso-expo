import type { BorderRadius } from "./border-radius"
import type { Palette } from "./colors"
import type { TextVariantAttributes } from "./text"

export type Theme = {
  text: TextVariantAttributes
  color: Palette
  radius: BorderRadius
  spacing: (multiplier?: number) => number
}
