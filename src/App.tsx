import {BrowserRouter} from 'react-router-dom'
import RoutesSetup from './routes/RoutesSetup'
import {AuthProvider, BoardProvider} from './contexts'
function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BoardProvider>
          <RoutesSetup />
        </BoardProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
