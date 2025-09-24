import { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Container,
  Avatar,
  Link
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';

function LoginView() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Intentando iniciar sesión con:', credentials);
      // Implementa tu lógica de autenticación aquí
    } catch (error) {
      console.error('Error durante la autenticación:', error);
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
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Usuario"
            name="username"
            autoComplete="username"
            autoFocus
            value={credentials.username}
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
          >
            Iniciar Sesión
          </Button>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
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