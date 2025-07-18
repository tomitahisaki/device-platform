import { BrowserRouter as Router, useRoutes } from 'react-router-dom'
import { MuiThemeProvider } from './theme/theme'
import { routes } from './router/routes'
import './App.css'

function AppRoutes() {
  const element = useRoutes(routes);
  return element;
}

function App() {
  return (
    <MuiThemeProvider>
      <Router>
        <AppRoutes />
      </Router>
    </MuiThemeProvider>
  )
}

export default App
