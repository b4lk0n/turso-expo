import AsyncStorage from "@react-native-async-storage/async-storage"
import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react"
import type { Consultant } from "./db/auth-schema"

type AuthAction =
  | { type: "restore_auth"; user: Consultant | null }
  | { type: "sign_in"; user: Consultant }
  | { type: "sign_out" }

type AuthState = {
  user: Consultant | null
  isSignOut: boolean
  isLoading: boolean
}

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case "restore_auth":
      return {
        ...state,
        user: action.user,
        isLoading: false,
      }

    case "sign_in":
      return {
        ...state,
        isSignOut: false,
        isLoading: false,
        user: action.user,
      }

    case "sign_out":
      return {
        ...state,
        isLoading: false,
        isSignOut: true,
        user: null,
      }

    default:
      return state
  }
}

const initialState: AuthState = {
  isLoading: true,
  isSignOut: false,
  user: null,
}

type AuthCtxState = AuthState & {
  signIn: (user: Consultant) => Promise<void>
  signOut: () => Promise<void>
}

const AuthCtx = createContext<AuthCtxState>({
  ...initialState,
  signIn: async (_: Consultant) => {},
  signOut: async () => {},
})

export function useAuth() {
  return useContext(AuthCtx)
}

type Props = {
  children: ReactNode
}

export function AuthProvider({ children }: Props) {
  const [state, dispatch] = useReducer(authReducer, initialState)

  useEffect(() => {
    const checkAuth = async () => {
      let user: Consultant | null = null

      try {
        user = JSON.parse((await AsyncStorage.getItem("user")) as "")

        if (!user?.id) {
          user = null
        }
      } catch {}

      dispatch({ type: "restore_auth", user })
    }

    checkAuth()
  }, [])

  const authCtx = useMemo(
    () => ({
      signIn: async (user: Consultant) => {
        await AsyncStorage.setItem("user", JSON.stringify(user))
        dispatch({ type: "sign_in", user })
      },
      signOut: async () => {
        await AsyncStorage.removeItem("user")
        dispatch({ type: "sign_out" })
      },
      ...state,
    }),
    [state],
  )

  return <AuthCtx.Provider value={authCtx}>{children}</AuthCtx.Provider>
}
