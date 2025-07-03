import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from '@mui/material'
import './App.css'
import AppRoutes from './routes'
import theme from './theme/MuiTheme'

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
