import { openSync } from "@op-engineering/op-sqlite"
import { drizzle } from "drizzle-orm/op-sqlite"
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react"
import * as schema from "~/db/schema"
import { useAuth } from "./auth-context"
import { env } from "./env"

function createDbClient(userRef: string) {
  const localDb = `local-replica-${userRef}.sqlite`
  const remoteUrl = `libsql://${userRef}-${env.EXPO_PUBLIC_TURSO_ORG}.turso.io`

  const client = openSync({
    name: localDb,
    url: remoteUrl,
    authToken: env.EXPO_PUBLIC_TURSO_GROUP_AUTH_TOKEN,
    syncInterval: 60,
  })

  return drizzle(client, {
    schema,
    casing: "snake_case",
  })
}

type DbCtxState = ReturnType<typeof createDbClient>

const DbCtx = createContext<DbCtxState | null>(null)

export function useDb() {
  const ctx = useContext(DbCtx)

  return ctx
}

type Props = {
  children: ReactNode
}
export function DbProvider({ children }: Props) {
  const { user } = useAuth()
  const prevUser = useRef(user)
  const [state, setState] = useState<DbCtxState | null>(null)

  useEffect(() => {
    if (user && user !== prevUser.current) {
      const db = createDbClient(user.ref)

      setState(db)
    }
  }, [user])

  return <DbCtx.Provider value={state}>{children}</DbCtx.Provider>
}
