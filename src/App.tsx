import {Provider as ReduxProvider} from 'react-redux'
import {useStore} from './store/useStore'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import {BrowserRouter} from 'react-router-dom'
import RoutesSetup from './routes/RoutesSetup'
import {AuthProvider, BoardProvider} from './contexts'
function App() {
  const store = useStore()
  return (
    <ReduxProvider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <BoardProvider>
            <RoutesSetup />
          </BoardProvider>
        </AuthProvider>
      </BrowserRouter>
    </ReduxProvider>
  )
}

export default App
