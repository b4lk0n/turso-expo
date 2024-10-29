import { openRemote } from "@op-engineering/op-sqlite"
import { drizzle } from "drizzle-orm/op-sqlite"
import { env } from "~/env"
import * as schema from "./auth-schema"

const authClient = openRemote({
  url: env.EXPO_PUBLIC_TURSO_AUTH_DATABASE_URL,
  authToken: env.EXPO_PUBLIC_TURSO_AUTH_DATABASE_AUTH_TOKEN,
})

export const authDb = drizzle(authClient, {
  schema,
  casing: "snake_case",
})
