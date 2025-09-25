import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Icon, divIcon } from 'leaflet';
import MarkerClusterGroup from 'react-leaflet-cluster';
import { 
  Box, 
  Paper, 
  Typography, 
  Button, 
  Chip,
  Avatar,
  Stack
} from '@mui/material';
import { 
  LocationOn, 
  Event as EventIcon,
  People
} from '@mui/icons-material';
import type { CyberEvent } from '../../types/event';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import 'leaflet/dist/leaflet.css';

interface EventMapProps {
  events: CyberEvent[];
  onEventClick: (event: CyberEvent) => void;
}

// Custom marker icon
const createCustomIcon = (logoUrl: string) => new Icon({
  iconUrl: logoUrl,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -40],
  className: 'custom-marker-icon'
});


// Create cluster icon
const createClusterCustomIcon = (cluster: any) => {
  const count = cluster.getChildCount();
  return divIcon({
    html: `<span class="cluster-icon">${count}</span>`,
    className: 'custom-marker-cluster',
    iconSize: [40, 40],
    iconAnchor: [20, 20]
  });
};

const EventMap: React.FC<EventMapProps> = ({ events, onEventClick }) => {
  const [mapCenter] = useState<[number, number]>([40.4165, -3.70256]); // Centro de España
  const [mapZoom] = useState(6);

  useEffect(() => {
    // Add custom styles for markers and clusters
    const style = document.createElement('style');
    style.textContent = `
      .custom-marker-icon {
        border-radius: 50%;
        border: 2px solid #00bcd4;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      }
      
      .custom-marker-cluster {
        background-color: #00bcd4;
        border: 2px solid #ffffff;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 2px 5px rgba(0,0,0,0.3);
      }
      
      .cluster-icon {
        color: white;
        font-weight: bold;
        font-size: 14px;
      }
      
      .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
      
      .leaflet-popup-content {
        margin: 0;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const formatEventDate = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (start.toDateString() === end.toDateString()) {
      return format(start, "d 'de' MMMM 'de' yyyy", { locale: es });
    } else {
      return `${format(start, "d 'de' MMM", { locale: es })} - ${format(end, "d 'de' MMM 'de' yyyy", { locale: es })}`;
    }
  };

  return (
    <Box sx={{ height: '100%', width: '100%', position: 'relative' }}>
      <MapContainer
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: '100%', width: '100%' }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MarkerClusterGroup
          iconCreateFunction={createClusterCustomIcon}
          maxClusterRadius={50}
        >
          {events.map((event) => (
            <Marker
              key={event.id}
              position={[event.location.lat, event.location.lng]}
              icon={createCustomIcon(event.logoUrl)}
              eventHandlers={{
                click: () => {
                  // Optional: handle marker click if needed
                }
              }}
            >
              <Popup maxWidth={350} minWidth={300}>
                <Paper elevation={0} sx={{ p: 0 }}>
                  <Box sx={{ p: 2 }}>
                    {/* Header */}
                    <Stack direction="row" spacing={2} alignItems="flex-start" mb={2}>
                      <Avatar 
                        src={event.logoUrl} 
                        alt={event.title}
                        sx={{ width: 50, height: 50 }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                          {event.title}
                        </Typography>
                        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                          <EventIcon fontSize="small" color="primary" />
                          <Typography variant="body2" color="text.secondary">
                            {formatEventDate(event.startDate, event.endDate)}
                          </Typography>
                        </Stack>
                        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
                          <LocationOn fontSize="small" color="primary" />
                          <Typography variant="body2" color="text.secondary">
                            {event.location.city}, {event.location.region}
                          </Typography>
                        </Stack>
                        {event.attendeesCount && (
                          <Stack direction="row" spacing={1} alignItems="center">
                            <People fontSize="small" color="primary" />
                            <Typography variant="body2" color="text.secondary">
                              {event.attendeesCount} participantes
                            </Typography>
                          </Stack>
                        )}
                      </Box>
                    </Stack>

                    {/* Description */}
                    <Typography variant="body2" sx={{ mb: 2, lineHeight: 1.5 }}>
                      {event.description.length > 120 
                        ? `${event.description.substring(0, 120)}...` 
                        : event.description
                      }
                    </Typography>

                    {/* Tags */}
                    <Box sx={{ mb: 2 }}>
                      <Stack direction="row" spacing={0.5} flexWrap="wrap" gap={0.5}>
                        {event.tags.slice(0, 3).map((tag) => (
                          <Chip 
                            key={tag} 
                            label={tag} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                        ))}
                        {event.tags.length > 3 && (
                          <Chip 
                            label={`+${event.tags.length - 3}`} 
                            size="small" 
                            variant="outlined"
                          />
                        )}
                      </Stack>
                    </Box>

                    {/* Action Button */}
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => onEventClick(event)}
                      sx={{ borderRadius: 2 }}
                    >
                      Ver evento
                    </Button>
                  </Box>
                </Paper>
              </Popup>
            </Marker>
          ))}
        </MarkerClusterGroup>
      </MapContainer>
    </Box>
  );
};

export default EventMap;