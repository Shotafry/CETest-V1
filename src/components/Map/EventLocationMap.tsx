import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Icon } from 'leaflet';
import { Typography, Box, Stack } from '@mui/material';
import { LocationOn } from '@mui/icons-material';
import type { CyberEvent } from '../../types/event';
import 'leaflet/dist/leaflet.css';

interface EventLocationMapProps {
  event: CyberEvent;
  onMapClick?: (lat: number, lng: number) => void;
  allowClick?: boolean;
}

// Custom marker icon for event location
const createLocationIcon = (logoUrl: string) => new Icon({
  iconUrl: logoUrl,
  iconSize: [50, 50],
  iconAnchor: [25, 50],
  popupAnchor: [0, -50],
  className: 'location-marker-icon'
});

function MapClickHandler({ onMapClick }: { onMapClick?: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      if (onMapClick) {
        onMapClick(e.latlng.lat, e.latlng.lng);
      }
    },
  });
  return null;
}

const EventLocationMap: React.FC<EventLocationMapProps> = ({ event, onMapClick, allowClick = false }) => {
  useEffect(() => {
    // Add custom styles for the location marker
    const style = document.createElement('style');
    style.textContent = `
      .location-marker-icon {
        border-radius: 50%;
        border: 3px solid #00bcd4;
        box-shadow: 0 4px 8px rgba(0,0,0,0.3);
        animation: pulse 2s infinite;
      }
      
      @keyframes pulse {
        0% {
          box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 0 rgba(0, 188, 212, 0.7);
        }
        70% {
          box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 20px rgba(0, 188, 212, 0);
        }
        100% {
          box-shadow: 0 4px 8px rgba(0,0,0,0.3), 0 0 0 0 rgba(0, 188, 212, 0);
        }
      }
      
      .leaflet-popup-content-wrapper {
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <MapContainer
      center={[event.location.lat, event.location.lng]}
      zoom={15}
      style={{ 
        height: '100%', 
        width: '100%',
        cursor: allowClick ? 'crosshair' : 'grab'
      }}
      zoomControl={true}
    >
      {allowClick && <MapClickHandler onMapClick={onMapClick} />}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      <Marker
        position={[event.location.lat, event.location.lng]}
        icon={createLocationIcon(event.logoUrl)}
      >
        <Popup maxWidth={300} minWidth={250}>
          <Box sx={{ p: 1 }}>
            <Stack spacing={2}>
              <Typography variant="h6" color="primary" fontWeight="bold">
                {event.title}
              </Typography>
              
              <Stack direction="row" spacing={1} alignItems="flex-start">
                <LocationOn color="primary" fontSize="small" />
                <Box>
                  <Typography variant="body2" fontWeight="medium">
                    {event.location.city}, {event.location.region}
                  </Typography>
                  {event.location.address && (
                    <Typography variant="body2" color="text.secondary">
                      {event.location.address}
                    </Typography>
                  )}
                </Box>
              </Stack>
              
              <Typography variant="body2" color="text.secondary">
                📍 Lat: {event.location.lat.toFixed(4)}, Lng: {event.location.lng.toFixed(4)}
              </Typography>
            </Stack>
          </Box>
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default EventLocationMap;