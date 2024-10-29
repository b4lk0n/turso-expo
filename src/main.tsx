import "~/theme/init"
import { AuthProvider } from "./auth-context"
import { DbProvider } from "./db-context"
import { RootApp } from "./root-app"

export function App() {
  return (
    <AuthProvider>
      <DbProvider>
        <RootApp />
      </DbProvider>
    </AuthProvider>
  )
}
