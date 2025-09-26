import { useState } from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
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
  CircularProgress,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { useAuth } from '../../contexts/AuthContext';

function RegisterView() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: 'attendee'
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  const { register, isLoading } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpiar error al escribir
    if (error) setError('');
  };

  const handleRoleChange = (event: any) => {
    setFormData(prev => ({
      ...prev,
      role: event.target.value
    }));
  };

  const validateForm = () => {
    if (!formData.email || !formData.password || !formData.confirmPassword) {
      setError('Por favor, completa todos los campos');
      return false;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return false;
    }

    if (formData.password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres');
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, ingresa un email válido');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!validateForm()) {
      return;
    }

    try {
      const success = await register(formData.email, formData.password, formData.role);
      if (success) {
        setSuccess(true);
        setTimeout(() => {
          navigate('/auth/login');
        }, 2000);
      } else {
        setError('Este email ya está registrado. Intenta con otro email o inicia sesión.');
      }
    } catch (error) {
      console.error('Error durante el registro:', error);
      setError('Error interno del servidor');
    }
  };

  if (success) {
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
        >
          <Alert severity="success" sx={{ width: '100%', mb: 2 }}>
            ¡Cuenta creada exitosamente! Redirigiendo al login...
          </Alert>
        </Paper>
      </Container>
    );
  }

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
        className="register-paper"
      >
        <Avatar sx={{ bgcolor: 'secondary.main', mb: 2 }}>
          <PersonAddIcon />
        </Avatar>
        <Typography component="h1" variant="h5" className="mb-3">
          Crear Cuenta
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
            value={formData.email}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="new-password"
            value={formData.password}
            onChange={handleChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirmar Contraseña"
            type="password"
            id="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="role-select-label">Tipo de Usuario</InputLabel>
            <Select
              labelId="role-select-label"
              id="role-select"
              value={formData.role}
              label="Tipo de Usuario"
              onChange={handleRoleChange}
            >
              <MenuItem value="attendee">Asistente</MenuItem>
              <MenuItem value="organizer">Organizador</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className="register-button"
            sx={{ mt: 3, mb: 2, py: 1.5 }}
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : 'Crear Cuenta'}
          </Button>
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link component={RouterLink} to="/auth/login" variant="body2">
              ¿Ya tienes cuenta? Inicia sesión
            </Link>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default RegisterView;