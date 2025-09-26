import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Box,
  Chip,
  Alert,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  LocationOn as LocationIcon,
  CalendarToday as CalendarIcon,
  Visibility as ViewIcon
} from '@mui/icons-material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAuth } from '../../contexts/AuthContext';
import type { Event } from '../../types/event';

function OrganizerEventsView() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [deleteDialog, setDeleteDialog] = useState<{open: boolean, eventId: string | null}>({
    open: false,
    eventId: null
  });

  useEffect(() => {
    loadOrganizerEvents();
  }, []);

  const loadOrganizerEvents = () => {
    const organizerEvents = JSON.parse(localStorage.getItem('organizer_events') || '[]');
    // Filtrar eventos del organizador actual
    const userEvents = organizerEvents.filter((event: Event) => 
      event.organizer.email === user?.email
    );
    setEvents(userEvents);
  };

  const handleDeleteEvent = (eventId: string) => {
    setDeleteDialog({ open: true, eventId });
  };

  const confirmDelete = () => {
    if (deleteDialog.eventId) {
      // Eliminar de eventos del organizador
      const organizerEvents = JSON.parse(localStorage.getItem('organizer_events') || '[]');
      const filteredEvents = organizerEvents.filter((event: Event) => event.id !== deleteDialog.eventId);
      localStorage.setItem('organizer_events', JSON.stringify(filteredEvents));

      // Eliminar de eventos generales
      const allEvents = JSON.parse(localStorage.getItem('all_events') || '[]');
      const filteredAllEvents = allEvents.filter((event: Event) => event.id !== deleteDialog.eventId);
      localStorage.setItem('all_events', JSON.stringify(filteredAllEvents));

      // Actualizar estado local
      setEvents(events.filter(event => event.id !== deleteDialog.eventId));
    }
    setDeleteDialog({ open: false, eventId: null });
  };

  const formatEventDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
      return `${format(start, "d 'de' MMMM 'de' yyyy", { locale: es })} • ${format(start, 'HH:mm', { locale: es })} - ${format(end, 'HH:mm', { locale: es })}`;
    }
    
    return `${format(start, "d 'de' MMM", { locale: es })} - ${format(end, "d 'de' MMM 'de' yyyy", { locale: es })}`;
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ color: 'primary.main' }}>
          Mis Eventos
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/organizer/events/new')}
          size="large"
        >
          Crear Evento
        </Button>
      </Box>

      {events.length === 0 ? (
        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            ¡Crea tu primer evento!
          </Typography>
          <Typography>
            Como organizador, puedes crear eventos de ciberseguridad que aparecerán en el mapa principal.
            Haz clic en "Crear Evento" para comenzar.
          </Typography>
        </Alert>
      ) : (
        <Grid container spacing={3}>
          {events.map((event) => (
            <Grid item xs={12} md={6} lg={4} key={event.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                {event.logoUrl && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={event.logoUrl}
                    alt={event.title}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom noWrap>
                    {event.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1, color: 'text.secondary' }}>
                    <CalendarIcon sx={{ fontSize: 16, mr: 1 }} />
                    <Typography variant="body2">
                      {formatEventDate(event.startDate, event.endDate)}
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, color: 'text.secondary' }}>
                    <LocationIcon sx={{ fontSize: 16, mr: 1 }} />
                    <Typography variant="body2" noWrap>
                      {event.location.city}, {event.location.region}
                    </Typography>
                  </Box>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {event.description.length > 100 
                      ? `${event.description.substring(0, 100)}...` 
                      : event.description
                    }
                  </Typography>
                  
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {event.tags?.slice(0, 3).map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        size="small"
                        variant="outlined"
                        color="primary"
                      />
                    ))}
                    {event.tags && event.tags.length > 3 && (
                      <Chip
                        label={`+${event.tags.length - 3}`}
                        size="small"
                        variant="outlined"
                      />
                    )}
                  </Box>
                </CardContent>
                
                <CardActions sx={{ justifyContent: 'space-between', px: 2, pb: 2 }}>
                  <Box>
                    <IconButton
                      onClick={() => navigate(`/event/${event.id}`)}
                      color="primary"
                      title="Ver evento"
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => navigate(`/organizer/events/edit/${event.id}`)}
                      color="primary"
                      title="Editar evento"
                    >
                      <EditIcon />
                    </IconButton>
                  </Box>
                  <IconButton
                    onClick={() => handleDeleteEvent(event.id)}
                    color="error"
                    title="Eliminar evento"
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Dialog de confirmación de eliminación */}
      <Dialog
        open={deleteDialog.open}
        onClose={() => setDeleteDialog({ open: false, eventId: null })}
      >
        <DialogTitle>Confirmar Eliminación</DialogTitle>
        <DialogContent>
          <Typography>
            ¿Estás seguro de que quieres eliminar este evento? Esta acción no se puede deshacer.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteDialog({ open: false, eventId: null })}>
            Cancelar
          </Button>
          <Button onClick={confirmDelete} color="error" variant="contained">
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default OrganizerEventsView;