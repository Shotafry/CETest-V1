import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import AddIcon from '@mui/icons-material/Add';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { useAuth } from '../../contexts/AuthContext';
import type { Event } from '../../types/event';
import EventLocationMap from '../../components/Map/EventLocationMap';

// Regiones de España para el selector
const SPANISH_REGIONS = [
  'Andalucía', 'Aragón', 'Asturias', 'Islas Baleares', 'Canarias', 'Cantabria',
  'Castilla-La Mancha', 'Castilla y León', 'Cataluña', 'Extremadura', 'Galicia',
  'La Rioja', 'Madrid', 'Murcia', 'Navarra', 'País Vasco', 'Valencia'
];

// Tags predefinidos de ciberseguridad
const SECURITY_TAGS = [
  'Pentesting', 'Red Team', 'Blue Team', 'Malware', 'Forense Digital',
  'Hacking Ético', 'OSINT', 'Criptografía', 'Compliance', 'ISO 27001',
  'GDPR', 'DevSecOps', 'Cloud Security', 'IoT Security', 'AI Security',
  'Incident Response', 'SOC', 'CTF', 'Bug Bounty', 'Social Engineering'
];

interface EventFormData {
  title: string;
  description: string;
  startDate: Date | null;
  endDate: Date | null;
  location: {
    lat: number;
    lng: number;
    city: string;
    region: string;
    address: string;
  };
  logoFile: File | null;
  logoUrl: string;
  tags: string[];
  organizer: {
    name: string;
    email: string;
  };
}

function EventFormView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditing = !!id;

  const [formData, setFormData] = useState<EventFormData>({
    title: '',
    description: '',
    startDate: null,
    endDate: null,
    location: {
      lat: 40.4165, // Madrid por defecto
      lng: -3.70256,
      city: '',
      region: 'Madrid',
      address: ''
    },
    logoFile: null,
    logoUrl: '',
    tags: [],
    organizer: {
      name: user?.name || 'Organizador',
      email: user?.email || ''
    }
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [logoPreview, setLogoPreview] = useState<string>('');

  // Cargar evento existente si estamos editando
  useEffect(() => {
    if (isEditing && id) {
      loadExistingEvent(id);
    }
  }, [id, isEditing]);

  const loadExistingEvent = (eventId: string) => {
    const organizerEvents = JSON.parse(localStorage.getItem('organizer_events') || '[]');
    const existingEvent = organizerEvents.find((e: any) => e.id === eventId);
    
    if (existingEvent) {
      setFormData({
        title: existingEvent.title,
        description: existingEvent.description,
        startDate: new Date(existingEvent.startDate),
        endDate: new Date(existingEvent.endDate),
        location: existingEvent.location,
        logoFile: null,
        logoUrl: existingEvent.logoUrl || '',
        tags: existingEvent.tags || [],
        organizer: existingEvent.organizer
      });
      setLogoPreview(existingEvent.logoUrl || '');
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError('');
  };

  const handleLocationChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value
      }
    }));
  };

  const handleMapClick = (lat: number, lng: number) => {
    setFormData(prev => ({
      ...prev,
      location: {
        ...prev.location,
        lat,
        lng
      }
    }));
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validar tamaño (máximo 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError('El logo debe ser menor a 2MB');
      return;
    }

    // Validar tipo
    if (!file.type.startsWith('image/')) {
      setError('Solo se permiten archivos de imagen');
      return;
    }

    setFormData(prev => ({ ...prev, logoFile: file }));

    // Crear preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setLogoPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadLogo = async (file: File): Promise<string> => {
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    
    // Intentar upload al backend primero
    if (apiUrl) {
      try {
        const formData = new FormData();
        formData.append('logo', file);
        
        const response = await fetch(`${apiUrl}/api/uploads`, {
          method: 'POST',
          body: formData,
        });
        
        if (response.ok) {
          const result = await response.json();
          return result.url;
        }
      } catch (error) {
        console.log('API upload not available, using fallback');
      }
    }
    
    // Fallback: convertir a base64
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target?.result as string);
      reader.readAsDataURL(file);
    });
  };

  const handleAddTag = (tag: string) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = (): boolean => {
    if (!formData.title.trim()) {
      setError('El título es obligatorio');
      return false;
    }
    
    if (!formData.description.trim()) {
      setError('La descripción es obligatoria');
      return false;
    }
    
    if (!formData.startDate || !formData.endDate) {
      setError('Las fechas son obligatorias');
      return false;
    }
    
    if (formData.startDate >= formData.endDate) {
      setError('La fecha de fin debe ser posterior a la fecha de inicio');
      return false;
    }
    
    if (!formData.location.city.trim()) {
      setError('La ciudad es obligatoria');
      return false;
    }

    return true;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError('');
    
    try {
      let logoUrl = formData.logoUrl;
      
      // Subir logo si hay uno nuevo
      if (formData.logoFile) {
        logoUrl = await uploadLogo(formData.logoFile);
      }
      
      // Crear objeto evento
      const eventData: Event = {
        id: isEditing ? id! : `event-${Date.now()}`,
        title: formData.title,
        description: formData.description,
        startDate: formData.startDate!.toISOString(),
        endDate: formData.endDate!.toISOString(),
        location: formData.location,
        logoUrl: logoUrl || '/cyberLogo.png',
        organizer: formData.organizer,
        tags: formData.tags,
        isActive: true,
        createdAt: isEditing ? undefined : new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };

      // Guardar en localStorage (mock de persistencia)
      const organizerEvents = JSON.parse(localStorage.getItem('organizer_events') || '[]');
      
      if (isEditing) {
        const index = organizerEvents.findIndex((e: any) => e.id === id);
        if (index !== -1) {
          organizerEvents[index] = eventData;
        }
      } else {
        organizerEvents.push(eventData);
      }
      
      localStorage.setItem('organizer_events', JSON.stringify(organizerEvents));
      
      // También agregar a los eventos generales para que aparezcan en el mapa
      const allEvents = JSON.parse(localStorage.getItem('all_events') || '[]');
      if (isEditing) {
        const index = allEvents.findIndex((e: any) => e.id === id);
        if (index !== -1) {
          allEvents[index] = eventData;
        }
      } else {
        allEvents.push(eventData);
      }
      localStorage.setItem('all_events', JSON.stringify(allEvents));

      setSuccess(isEditing ? 'Evento actualizado exitosamente' : 'Evento creado exitosamente');
      
      setTimeout(() => {
        navigate('/organizer/events');
      }, 2000);
      
    } catch (error) {
      console.error('Error saving event:', error);
      setError('Error al guardar el evento. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom sx={{ color: 'primary.main', mb: 3 }}>
            {isEditing ? 'Editar Evento' : 'Crear Nuevo Evento'}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3 }}>
              {success}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Información básica */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary' }}>
                  Información Básica
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} md={8}>
                <TextField
                  fullWidth
                  label="Título del Evento"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} md={4}>
                <FormControl fullWidth>
                  <InputLabel>Región</InputLabel>
                  <Select
                    value={formData.location.region}
                    onChange={(e) => handleLocationChange('region', e.target.value)}
                    label="Región"
                  >
                    {SPANISH_REGIONS.map((region) => (
                      <MenuItem key={region} value={region}>
                        {region}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Descripción"
                  multiline
                  rows={4}
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
              </Grid>

              {/* Fechas */}
              <Grid item xs={12} md={6}>
                <DateTimePicker
                  label="Fecha y Hora de Inicio"
                  value={formData.startDate}
                  onChange={(date) => handleInputChange('startDate', date)}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <DateTimePicker
                  label="Fecha y Hora de Fin"
                  value={formData.endDate}
                  onChange={(date) => handleInputChange('endDate', date)}
                  slotProps={{ textField: { fullWidth: true, required: true } }}
                />
              </Grid>

              {/* Ubicación */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary', mt: 2 }}>
                  <LocationOnIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Ubicación
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Ciudad"
                  value={formData.location.city}
                  onChange={(e) => handleLocationChange('city', e.target.value)}
                  required
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  label="Dirección"
                  value={formData.location.address}
                  onChange={(e) => handleLocationChange('address', e.target.value)}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Haz clic en el mapa para seleccionar la ubicación exacta:
                </Typography>
                <Box sx={{ height: 300, border: '1px solid #ddd', borderRadius: 1 }}>
                  <EventLocationMap
                    event={{
                      location: formData.location,
                      title: formData.title || 'Evento'
                    } as Event}
                    onMapClick={handleMapClick}
                    allowClick={true}
                  />
                </Box>
              </Grid>

              {/* Logo */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary', mt: 2 }}>
                  Logo del Evento
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12} md={6}>
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<AddIcon />}
                  fullWidth
                  sx={{ height: 56 }}
                >
                  Subir Logo
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    hidden
                  />
                </Button>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
                  Máximo 2MB. Formatos: JPG, PNG, GIF
                </Typography>
              </Grid>

              <Grid item xs={12} md={6}>
                {logoPreview && (
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Avatar
                      src={logoPreview}
                      sx={{ width: 80, height: 80, mr: 2 }}
                      variant="rounded"
                    />
                    <Typography variant="body2" color="text.secondary">
                      Vista previa del logo
                    </Typography>
                  </Box>
                )}
              </Grid>

              {/* Tags */}
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom sx={{ color: 'text.secondary', mt: 2 }}>
                  Etiquetas de Ciberseguridad
                </Typography>
                <Divider sx={{ mb: 2 }} />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ mb: 2 }}>
                  {SECURITY_TAGS.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onClick={() => handleAddTag(tag)}
                      variant={formData.tags.includes(tag) ? 'filled' : 'outlined'}
                      color={formData.tags.includes(tag) ? 'primary' : 'default'}
                      sx={{ m: 0.5, cursor: 'pointer' }}
                    />
                  ))}
                </Box>
              </Grid>

              <Grid item xs={12}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Etiquetas seleccionadas:
                </Typography>
                <Box>
                  {formData.tags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onDelete={() => handleRemoveTag(tag)}
                      color="primary"
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              </Grid>

              {/* Botones de acción */}
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    sx={{ minWidth: 200 }}
                  >
                    {loading ? (
                      <CircularProgress size={24} />
                    ) : (
                      isEditing ? 'Actualizar Evento' : 'Crear Evento'
                    )}
                  </Button>
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate('/organizer/events')}
                    disabled={loading}
                  >
                    Cancelar
                  </Button>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </LocalizationProvider>
  );
}

export default EventFormView;