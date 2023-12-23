import RouteApp from './RouteApp'
import { AuthProvider } from './contexts/AuthContext'

function App() {

  return (
    <AuthProvider>
      <RouteApp />
    </AuthProvider>
  )
}

export default App
