import { 
  Box, 
  Typography, 
  Grid, 
  LinearProgress,
  Button
} from '@mui/material';
import { useState, useEffect } from 'react';
import CustomCard from '../../components/common/CustomCard';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { useNavigate } from 'react-router-dom';

function DashboardView() {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Simular una carga para mostrar las animaciones
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Box className="loading-container" sx={{ p: 3 }}>
        <LinearProgress sx={{ width: '50%' }} />
      </Box>
    );
  }

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom component="div" className="fade-in">
        Panel de Control
      </Typography>
      
      <Button 
        variant="outlined" 
        color="primary" 
        onClick={() => navigate('/font-test')} 
        sx={{ mb: 3 }}
      >
        Probar fuente Satoshi
      </Button>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            title="Estadísticas"
            subheader="Visión general"
            className="fade-in"
            showMoreMenu
          >
            <Typography variant="body1" className="mb-2">
              Bienvenido al panel de control
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TrendingUpIcon color="success" />
              <Typography variant="body2" color="success.main" sx={{ ml: 1 }}>
                12% de incremento esta semana
              </Typography>
            </Box>
          </CustomCard>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            title="Actividad Reciente"
            className="fade-in"
            showMoreMenu
            footer={
              <Button size="small" color="primary">
                Ver todas
              </Button>
            }
          >
            <Typography variant="body1">
              Información sobre actividades recientes
            </Typography>
          </CustomCard>
        </Grid>
        
        <Grid item xs={12} md={6} lg={4}>
          <CustomCard
            title="Notificaciones"
            className="fade-in"
            showMoreMenu
          >
            <Typography variant="body1">
              Tus notificaciones aparecerán aquí
            </Typography>
          </CustomCard>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardView;