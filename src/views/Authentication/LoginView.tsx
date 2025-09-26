import { useState } from 'react';
import { useNavigate, Link as RouterLink, useLocation } from 'react-router-dom';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Container,
  Avatar,
  Link,
  Alert,
  CircularProgress
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../../contexts/AuthContext';

function LoginView() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading } = useAuth();
  
  // Obtener la ruta de destino original o usar dashboard por defecto
  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error al escribir
    if (error) setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!credentials.email || !credentials.password) {
      setError('Por favor, completa todos los campos');
      return;
    }

    try {
      const success = await login(credentials.email, credentials.password);
      if (success) {
        // Redirigir a la ruta original o dashboard
        navigate(from, { replace: true });
      } else {
        setError('Email o contraseña incorrectos');
      }
    } catch (error) {
      console.error('Error durante la autenticación:', error);
      setError('Error interno del servidor');
    }
  };

  return (
    <Container component="main" maxWidth="xs" className="fade-in">
      <Paper 
        elevation={3} 
        sx={{
          marginTop: 8,
          padding: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
        className="login-paper"
      >
        <Avatar sx={{ bgcolor: 'primary.main', mb: 2 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className="mb-3">
          Acceso al Sistema
        </Typography>
        {error && (
          <Alert severity="error" sx={{ width: '100%', mb: 2 }}>
            {error}
          </Alert>
        )}
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            type="email"
            autoComplete="email"
            autoFocus
            value={credentials.email}
            onChange={handleChange}
            className="mb-2"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
            value={credentials.password}
            onChange={handleChange}
            className="mb-3"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="login-button"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Iniciar Sesión'}
          </Button>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link component={RouterLink} to="/auth/register" variant="body2" sx={{ mr: 2 }}>
              ¿No tienes cuenta? Regístrate
            </Link>
            <br />
            <Link href="#" variant="body2">
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default LoginView;