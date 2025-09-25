import React, { useState, useMemo } from 'react';
import {
  Box,
  Container,
  Typography,
  Stack,
  Card,
  CardContent,
  Chip,
  Alert,
  CircularProgress
} from '@mui/material';
import { Security, LocationOn, Event as EventIcon } from '@mui/icons-material';
import EventMap from '../../components/Map/EventMap';
import EventFiltersComponent from '../../components/Filters/EventFilters';
import { mockEvents } from '../../data/mockEvents';
import type { CyberEvent, EventFilters } from '../../types/event';
import { useNavigate } from 'react-router-dom';

const LandingView: React.FC = () => {
  const navigate = useNavigate();
  const [events] = useState<CyberEvent[]>(mockEvents);
  const [isLoading] = useState(false);
  const [filters, setFilters] = useState<EventFilters>({
    regions: [],
    dateRange: { start: null, end: null },
    tags: []
  });

  // Get unique values for filters
  const availableRegions = useMemo(() => {
    const regions = events.map(event => event.location.region);
    return Array.from(new Set(regions)).sort();
  }, [events]);

  const availableTags = useMemo(() => {
    const tags = events.flatMap(event => event.tags);
    return Array.from(new Set(tags)).sort();
  }, [events]);

  // Filter events based on current filters
  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      // Region filter
      if (filters.regions.length > 0) {
        if (!filters.regions.includes(event.location.region)) {
          return false;
        }
      }

      // Date range filter
      if (filters.dateRange.start || filters.dateRange.end) {
        const eventStart = new Date(event.startDate);
        const eventEnd = new Date(event.endDate);
        
        if (filters.dateRange.start && eventEnd < filters.dateRange.start) {
          return false;
        }
        if (filters.dateRange.end && eventStart > filters.dateRange.end) {
          return false;
        }
      }

      // Tags filter
      if (filters.tags.length > 0) {
        const hasMatchingTag = filters.tags.some(tag => event.tags.includes(tag));
        if (!hasMatchingTag) {
          return false;
        }
      }

      return true;
    });
  }, [events, filters]);

  const handleEventClick = (event: CyberEvent) => {
    // Navigate to event detail page
    navigate(`/event/${event.id}`);
  };

  if (isLoading) {
    return (
      <Box 
        display="flex" 
        justifyContent="center" 
        alignItems="center" 
        minHeight="80vh"
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: 'background.default' }}>
      {/* Header */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #00bcd4 0%, #0097a7 100%)',
          color: 'white',
          py: 6
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3} alignItems="center" textAlign="center">
            <Security sx={{ fontSize: 60 }} />
            <Typography variant="h2" component="h1" fontWeight="bold">
              CibESphere
            </Typography>
            <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: '600px' }}>
              La comunidad de ciberseguridad más activa de España
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: '700px' }}>
              Descubre eventos, conferencias, talleres y meetups de ciberseguridad 
              en toda España. Conecta con profesionales y mantente actualizado.
            </Typography>
          </Stack>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ py: 4 }}>
        {/* Stats Cards */}
        <Stack 
          direction={{ xs: 'column', md: 'row' }} 
          spacing={3} 
          sx={{ mb: 4 }}
        >
          <Card sx={{ flex: 1 }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <EventIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" color="primary" fontWeight="bold">
                {filteredEvents.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Eventos próximos
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <LocationOn color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" color="primary" fontWeight="bold">
                {availableRegions.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Comunidades autónomas
              </Typography>
            </CardContent>
          </Card>

          <Card sx={{ flex: 1 }}>
            <CardContent sx={{ textAlign: 'center', py: 3 }}>
              <Security color="primary" sx={{ fontSize: 40, mb: 1 }} />
              <Typography variant="h4" color="primary" fontWeight="bold">
                {availableTags.length}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Categorías diferentes
              </Typography>
            </CardContent>
          </Card>
        </Stack>

        {/* Filters */}
        <EventFiltersComponent
          filters={filters}
          onFiltersChange={setFilters}
          availableRegions={availableRegions}
          availableTags={availableTags}
        />

        {/* Results Info */}
        {filteredEvents.length !== events.length && (
          <Alert 
            severity="info" 
            sx={{ mb: 2 }}
            action={
              <Stack direction="row" spacing={1}>
                {filters.regions.map(region => (
                  <Chip 
                    key={region} 
                    label={region} 
                    size="small" 
                    onDelete={() => setFilters(prev => ({
                      ...prev,
                      regions: prev.regions.filter(r => r !== region)
                    }))}
                  />
                ))}
                {filters.tags.map(tag => (
                  <Chip 
                    key={tag} 
                    label={tag} 
                    size="small" 
                    onDelete={() => setFilters(prev => ({
                      ...prev,
                      tags: prev.tags.filter(t => t !== tag)
                    }))}
                  />
                ))}
              </Stack>
            }
          >
            Mostrando {filteredEvents.length} de {events.length} eventos
          </Alert>
        )}

        {/* Map */}
        <Card elevation={3}>
          <Box sx={{ height: '70vh', minHeight: '500px' }}>
            <EventMap 
              events={filteredEvents}
              onEventClick={handleEventClick}
            />
          </Box>
        </Card>

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <Box textAlign="center" py={8}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No hay eventos que coincidan con los filtros seleccionados
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Prueba a ajustar los filtros para ver más eventos
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default LandingView;