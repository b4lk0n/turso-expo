import { UnistylesRegistry } from "react-native-unistyles"
import { lightTheme } from "./light-theme"
import type { Theme } from "./theme"

declare module "react-native-unistyles" {
  export interface UnistylesThemes extends Record<"light", Theme> {}
}

UnistylesRegistry.addThemes({
  light: lightTheme,
}).addConfig({
  adaptiveThemes: true,
})
