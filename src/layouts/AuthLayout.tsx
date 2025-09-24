import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Container, Typography, Link } from '@mui/material';

function AuthLayout() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        minHeight: '100vh',
        bgcolor: 'background.default'
      }}
    >
      <CssBaseline />
      <Container component="main" maxWidth={false} disableGutters>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh'
          }}
        >
          <Outlet />
          
          <Box component="footer" sx={{ mt: 8, mb: 4 }}>
            <Typography variant="body2" color="text.secondary" align="center">
              {'© '}
              <Link color="inherit" href="/">
                CyberProject
              </Link>{' '}
              {new Date().getFullYear()}
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default AuthLayout;