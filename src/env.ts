import { z } from "zod"

const schema = z.object({
  EXPO_PUBLIC_TURSO_AUTH_DATABASE_URL: z.string().url(),
  EXPO_PUBLIC_TURSO_AUTH_DATABASE_AUTH_TOKEN: z.string(),

  EXPO_PUBLIC_TURSO_ORG: z.string(),
  EXPO_PUBLIC_TURSO_GROUP_AUTH_TOKEN: z.string(),
})

export const env = schema.parse(process.env)
