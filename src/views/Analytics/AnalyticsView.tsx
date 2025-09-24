import { 
  Box, 
  Typography, 
  Grid, 
  Paper,
  Card,
  CardContent,
  CardHeader,
  LinearProgress
} from '@mui/material';
import { useState } from 'react';

function AnalyticsView() {
  const [loading] = useState(false);
  
  // Datos ficticios para representar estadísticas de seguridad
  const securityStats = [
    { title: 'Ataques Bloqueados', value: '2,345', percent: 78 },
    { title: 'Vulnerabilidades', value: '126', percent: 42 },
    { title: 'Nivel de Protección', value: '89%', percent: 89 },
    { title: 'Alertas Activas', value: '7', percent: 20 }
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom component="div">
        Análisis de Seguridad
      </Typography>
      
      {loading ? (
        <LinearProgress />
      ) : (
        <>
          <Grid container spacing={3}>
            {securityStats.map((stat, index) => (
              <Grid item xs={12} md={6} lg={3} key={index}>
                <Card>
                  <CardHeader title={stat.title} />
                  <CardContent>
                    <Typography variant="h3" component="div" gutterBottom>
                      {stat.value}
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={stat.percent} 
                      sx={{ 
                        height: 8, 
                        borderRadius: 5,
                        mb: 1
                      }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {stat.percent}% del umbral
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} lg={8}>
              <Paper sx={{ p: 3, height: '400px' }}>
                <Typography variant="h6" gutterBottom>
                  Tendencias de amenazas
                </Typography>
                <Box sx={{ 
                  height: '90%', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center' 
                }}>
                  <Typography variant="body1" color="text.secondary">
                    Aquí iría un gráfico con las tendencias de amenazas
                  </Typography>
                </Box>
              </Paper>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Paper sx={{ p: 3, height: '400px' }}>
                <Typography variant="h6" gutterBottom>
                  Distribución de alertas
                </Typography>
                <Box sx={{ 
                  height: '90%', 
                  display: 'flex', 
                  justifyContent: 'center', 
                  alignItems: 'center' 
                }}>
                  <Typography variant="body1" color="text.secondary">
                    Aquí iría un gráfico circular con la distribución
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}
    </Box>
  );
}

export default AnalyticsView;