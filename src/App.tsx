import AppRouter from './router';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import customTheme from './theme/customTheme';
import './styles/global.css';

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
      <AppRouter />
    </ThemeProvider>
  );
}

export default App;
