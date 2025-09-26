import AppRouter from './router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import customTheme from './theme/customTheme';
import { AuthProvider } from './contexts/AuthContext';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
