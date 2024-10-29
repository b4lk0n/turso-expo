export type TextVariant = "title" | "body" | "caption" | "footnote"

export type TextVariantAttributes = Record<
  TextVariant,
  {
    fontSize: number
    lineHeight: number
  }
>

export const textVariants: TextVariantAttributes = {
  title: {
    fontSize: 26,
    lineHeight: 32,
  },
  body: {
    fontSize: 17,
    lineHeight: 22,
  },
  caption: {
    fontSize: 14,
    lineHeight: 20,
  },
  footnote: {
    fontSize: 12,
    lineHeight: 16,
  },
}
