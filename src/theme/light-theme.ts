import { baseTheme } from "./base-theme"
import { lightPalette } from "./light-palette"
import type { Theme } from "./theme"

export const lightTheme: Theme = {
  ...baseTheme,
  color: lightPalette,
}
