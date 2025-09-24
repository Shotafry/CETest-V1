import { Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { 
  AppBar, 
  Box, 
  CssBaseline, 
  Button, 
  IconButton, 
  Toolbar, 
  Typography, 
  Container,
  Stack,
  Avatar,
  useTheme,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SecurityIcon from '@mui/icons-material/Security';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import SettingsIcon from '@mui/icons-material/Settings';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useState } from 'react';

function MainLayout() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [notificationAnchor, setNotificationAnchor] = useState<null | HTMLElement>(null);
  const location = useLocation();
  const theme = useTheme();
  
  const isMenuOpen = Boolean(anchorEl);
  const isNotificationsOpen = Boolean(notificationAnchor);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationOpen = (event: React.MouseEvent<HTMLElement>) => {
    setNotificationAnchor(event.currentTarget);
  };

  const handleNotificationClose = () => {
    setNotificationAnchor(null);
  };

  // Menú de perfil
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      open={isMenuOpen}
      onClose={handleMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem onClick={handleMenuClose}>Mi Perfil</MenuItem>
      <MenuItem onClick={handleMenuClose}>Configuración</MenuItem>
      <MenuItem onClick={handleMenuClose}>Cerrar Sesión</MenuItem>
    </Menu>
  );

  // Menú de notificaciones
  const renderNotifications = (
    <Menu
      anchorEl={notificationAnchor}
      open={isNotificationsOpen}
      onClose={handleNotificationClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <MenuItem onClick={handleNotificationClose}>Alerta de seguridad nueva</MenuItem>
      <MenuItem onClick={handleNotificationClose}>Actualización completada</MenuItem>
      <MenuItem onClick={handleNotificationClose}>Ver todas las notificaciones</MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar
        position="static"
        elevation={1}
        sx={{
          backgroundColor: 'background.paper',
          color: 'text.primary',
          width: '100vw'
        }}
      >
        <Toolbar sx={{ display: 'flex', width: '100%', px: { xs: 1, sm: 2 }, paddingBottom: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
            {/*<SecurityIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" noWrap className="hide-on-mobile">
              CyberProject
            </Typography>*/}
            <img src="/cyberLogo.png" alt="CyberProject Logo" style={{ height: 70 }} />
          </Box>

          <Box sx={{ flexGrow: 1, display: 'flex', width: '100%' }} className="main-navbar">
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/dashboard"
              className={`nav-button ${location.pathname === '/dashboard' ? 'active' : ''}`}
              sx={{ 
                flexGrow: 1,
                borderBottomColor: theme.palette.primary.main
              }}
              startIcon={<DashboardIcon />}
            >
              <span className="nav-button-text">Dashboard</span>
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/analytics"
              className={`nav-button ${location.pathname === '/analytics' ? 'active' : ''}`}
              sx={{ 
                flexGrow: 1,
                borderBottomColor: theme.palette.primary.main
              }}
              startIcon={<AnalyticsIcon />}
            >
              <span className="nav-button-text">Analytics</span>
            </Button>
            <Button 
              color="inherit" 
              component={RouterLink} 
              to="/settings"
              className={`nav-button ${location.pathname === '/settings' ? 'active' : ''}`}
              sx={{ 
                flexGrow: 1,
                borderBottomColor: theme.palette.primary.main
              }}
              startIcon={<SettingsIcon />}
            >
              <span className="nav-button-text">Configuración</span>
            </Button>
          </Box>
          
          <Stack direction="row" spacing={1} alignItems="center">
            <Tooltip title="Notificaciones">
              <IconButton 
                color="inherit" 
                onClick={handleNotificationOpen}
                size="medium"
              >
                <NotificationsIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Perfil">
              <IconButton
                color="inherit"
                onClick={handleProfileMenuOpen}
                size="medium"
              >
                <Avatar sx={{ width: 32, height: 32, bgcolor: theme.palette.primary.main }}>
                  <AccountCircleIcon />
                </Avatar>
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </AppBar>
      {renderMenu}
      {renderNotifications}
      
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3 }}
      >
        <Container>
          <Outlet />
        </Container>
      </Box>
      
      <Box component="footer" sx={{ mt: 'auto', p: 2, borderTop: 1, borderColor: 'divider' }}>
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} CyberProject
        </Typography>
      </Box>
    </Box>
  );
}

export default MainLayout;