export type Radius = "sharp" | "small" | "normal" | "large" | "full"

export type BorderRadius = Record<Radius, number>

export const borderRadius: BorderRadius = {
  sharp: 0,
  small: 2,
  normal: 4,
  large: 8,
  full: 9999,
}
