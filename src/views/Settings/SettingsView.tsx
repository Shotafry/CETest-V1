import { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Grid
} from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function SettingsView() {
  const [value, setValue] = useState(0);
  const [userSettings, setUserSettings] = useState({
    email: 'usuario@ejemplo.com',
    password: '',
    notifications: true,
    twoFactor: false,
    darkMode: false,
    language: 'es'
  });

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setUserSettings({
      ...userSettings,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSaveProfile = () => {
    console.log('Guardando configuración de perfil:', userSettings);
    // Aquí implementarías la lógica para guardar los cambios
  };

  const handleSaveSecurity = () => {
    console.log('Guardando configuración de seguridad:', userSettings);
    // Aquí implementarías la lógica para guardar los cambios
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom component="div">
        Configuración
      </Typography>

      <Paper sx={{ width: '100%', mt: 3 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
        >
          <Tab label="Perfil" />
          <Tab label="Seguridad" />
          <Tab label="Notificaciones" />
          <Tab label="General" />
        </Tabs>

        <TabPanel value={value} index={0}>
          <Typography variant="h6" gutterBottom>
            Información de perfil
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                value={userSettings.email}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Nombre de usuario"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mt: 2, mb: 2 }}>
                <Button variant="contained" onClick={handleSaveProfile}>
                  Guardar cambios
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Typography variant="h6" gutterBottom>
            Configuración de seguridad
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                type="password"
                label="Contraseña actual"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="password"
                name="password"
                label="Nueva contraseña"
                value={userSettings.password}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                type="password"
                label="Confirmar contraseña"
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ mt: 2, mb: 2 }} />
              <FormControlLabel
                control={
                  <Switch
                    name="twoFactor"
                    checked={userSettings.twoFactor}
                    onChange={handleInputChange}
                  />
                }
                label="Activar autenticación de dos factores"
              />
            </Grid>
            <Grid item xs={12}>
              <Box sx={{ mt: 2 }}>
                <Button variant="contained" onClick={handleSaveSecurity}>
                  Guardar cambios
                </Button>
              </Box>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <Typography variant="h6" gutterBottom>
            Preferencias de notificaciones
          </Typography>
          <Box>
            <FormControlLabel
              control={
                <Switch
                  name="notifications"
                  checked={userSettings.notifications}
                  onChange={handleInputChange}
                />
              }
              label="Recibir alertas por email"
            />
          </Box>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <Typography variant="h6" gutterBottom>
            Configuración general
          </Typography>
          <Box>
            <FormControlLabel
              control={
                <Switch
                  name="darkMode"
                  checked={userSettings.darkMode}
                  onChange={handleInputChange}
                />
              }
              label="Modo oscuro"
            />
          </Box>
          <Box sx={{ mt: 2 }}>
            <TextField
              select
              name="language"
              label="Idioma"
              value={userSettings.language}
              onChange={handleInputChange as any}
              SelectProps={{
                native: true,
              }}
            >
              <option value="es">Español</option>
              <option value="en">English</option>
            </TextField>
          </Box>
        </TabPanel>
      </Paper>
    </Box>
  );
}

export default SettingsView;