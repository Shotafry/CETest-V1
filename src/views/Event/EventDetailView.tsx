import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Paper,
  Stack,
  Chip,
  Button,
  Avatar,
  Divider,
  Card,
  Alert,
  CircularProgress,
  IconButton
} from '@mui/material';
import {
  ArrowBack,
  LocationOn,
  Event as EventIcon,
  People,
  Share,
  Bookmark,
  Person,
  Email,
  Business
} from '@mui/icons-material';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { mockEvents } from '../../data/mockEvents';
import EventLocationMap from '../../components/Map/EventLocationMap';
import SubscriptionForm from '../../components/Forms/SubscriptionForm';
import type { CyberEvent } from '../../types/event';

const EventDetailView: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<CyberEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadEvent = async () => {
      try {
        setLoading(true);
        setError(null);

        // Try to fetch from API first
        const apiUrl = import.meta.env.VITE_API_BASE_URL;
        if (apiUrl && id) {
          try {
            const response = await fetch(`${apiUrl}/api/events/${id}`);
            if (response.ok) {
              const eventData = await response.json();
              setEvent(eventData);
              setLoading(false);
              return;
            }
          } catch (apiError) {
            console.log('API not available, using mock data');
          }
        }

        // Fallback to mock data
        const mockEvent = mockEvents.find(e => e.id === id);
        if (mockEvent) {
          setEvent(mockEvent);
        } else {
          setError('Evento no encontrado');
        }
      } catch (err) {
        setError('Error al cargar el evento');
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  const formatEventDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
      return {
        date: format(start, "d 'de' MMMM 'de' yyyy", { locale: es }),
        time: `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`
      };
    } else {
      return {
        date: `${format(start, "d 'de' MMM", { locale: es })} - ${format(end, "d 'de' MMM 'de' yyyy", { locale: es })}`,
        time: `${format(start, 'HH:mm')} - ${format(end, 'HH:mm')}`
      };
    }
  };

  const handleShare = async () => {
    const shareData = {
      title: event?.title,
      text: event?.description,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error || !event) {
    return (
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error || 'Evento no encontrado'}
        </Alert>
        <Button
          variant="outlined"
          startIcon={<ArrowBack />}
          onClick={() => navigate('/')}
        >
          Volver al mapa
        </Button>
      </Container>
    );
  }

  const eventDate = formatEventDate(event.startDate, event.endDate);

  return (
    <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)',
          color: 'white',
          py: 3
        }}
      >
        <Container maxWidth="lg">
          <Stack direction="row" alignItems="center" spacing={2}>
            <IconButton
              onClick={() => navigate('/')}
              sx={{ color: 'white' }}
            >
              <ArrowBack />
            </IconButton>
            <Typography variant="h4" component="h1" sx={{ flex: 1 }}>
              Detalle del evento
            </Typography>
            <IconButton onClick={handleShare} sx={{ color: 'white' }}>
              <Share />
            </IconButton>
            <IconButton sx={{ color: 'white' }}>
              <Bookmark />
            </IconButton>
          </Stack>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={4}>
          {/* Main Content */}
          <Box sx={{ flex: { xs: 1, md: 2 } }}>
            {/* Event Header */}
            <Paper elevation={2} sx={{ p: 4, mb: 3 }}>
              <Stack direction="row" spacing={3} alignItems="flex-start" mb={3}>
                <Avatar
                  src={event.logoUrl}
                  alt={event.title}
                  sx={{ width: 80, height: 80 }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    {event.title}
                  </Typography>
                  
                  <Stack direction="row" spacing={3} mb={2}>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <EventIcon color="primary" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {eventDate.date}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {eventDate.time}
                        </Typography>
                      </Box>
                    </Stack>
                    
                    <Stack direction="row" spacing={1} alignItems="center">
                      <LocationOn color="primary" />
                      <Box>
                        <Typography variant="body2" color="text.secondary">
                          {event.location.city}, {event.location.region}
                        </Typography>
                        {event.location.address && (
                          <Typography variant="body2" color="text.secondary">
                            {event.location.address}
                          </Typography>
                        )}
                      </Box>
                    </Stack>

                    {event.attendeesCount && (
                      <Stack direction="row" spacing={1} alignItems="center">
                        <People color="primary" />
                        <Typography variant="body2" color="text.secondary">
                          {event.attendeesCount} participantes
                          {event.maxAttendees && ` / ${event.maxAttendees} max`}
                        </Typography>
                      </Stack>
                    )}
                  </Stack>

                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {event.tags.map((tag) => (
                      <Chip
                        key={tag}
                        label={tag}
                        color="primary"
                        variant="outlined"
                        size="small"
                      />
                    ))}
                  </Stack>
                </Box>
              </Stack>

              <Divider sx={{ my: 3 }} />

              {/* Description */}
              <Typography variant="h6" gutterBottom>
                Descripción
              </Typography>
              <Typography
                variant="body1"
                sx={{ lineHeight: 1.7, whiteSpace: 'pre-line', mb: 3 }}
              >
                {event.description}
              </Typography>

              {/* Organizer */}
              <Divider sx={{ my: 3 }} />
              <Typography variant="h6" gutterBottom>
                Organizador
              </Typography>
              <Card variant="outlined" sx={{ p: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: 'primary.main' }}>
                    <Person />
                  </Avatar>
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="subtitle1" fontWeight="medium">
                      {event.organizer.name}
                    </Typography>
                    <Stack direction="row" spacing={2} mt={1}>
                      <Stack direction="row" spacing={0.5} alignItems="center">
                        <Email fontSize="small" color="action" />
                        <Typography variant="body2" color="text.secondary">
                          {event.organizer.email}
                        </Typography>
                      </Stack>
                      {event.organizer.organization && (
                        <Stack direction="row" spacing={0.5} alignItems="center">
                          <Business fontSize="small" color="action" />
                          <Typography variant="body2" color="text.secondary">
                            {event.organizer.organization}
                          </Typography>
                        </Stack>
                      )}
                    </Stack>
                  </Box>
                </Stack>
              </Card>
            </Paper>

            {/* Location Map */}
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                Ubicación
              </Typography>
              <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden' }}>
                <EventLocationMap event={event} />
              </Box>
            </Paper>
          </Box>

          {/* Sidebar */}
          <Box sx={{ flex: { xs: 1, md: 1 }, minWidth: { md: '300px' } }}>
            {/* Subscription Form */}
            <Paper elevation={2} sx={{ p: 3, position: 'sticky', top: 24 }}>
              <Typography variant="h6" gutterBottom color="primary">
                🔔 Suscríbete a este evento
              </Typography>
              <Typography variant="body2" color="text.secondary" mb={3}>
                Recibe recordatorios y actualizaciones importantes sobre este evento.
              </Typography>
              <SubscriptionForm eventId={event.id} eventTitle={event.title} />
            </Paper>
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default EventDetailView;