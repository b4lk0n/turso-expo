import { createElement } from "react"
import type { ViewProps } from "react-native"

export function View(props: ViewProps) {
  return createElement("RCTView", {
    ...props,
  })
}
