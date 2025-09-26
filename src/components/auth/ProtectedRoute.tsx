import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Box, CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'admin' | 'organizer' | 'attendee';
  requireAuth?: boolean;
}

function ProtectedRoute({ 
  children, 
  requiredRole, 
  requireAuth = true 
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  // Si requiere autenticación pero no está autenticado
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Si requiere un rol específico pero el usuario no lo tiene
  if (requiredRole && user && user.role !== requiredRole) {
    // Los admin pueden acceder a todo
    if (user.role !== 'admin') {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}

export default ProtectedRoute;