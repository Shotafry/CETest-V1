import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
  Typography,
  Stack,
  Divider,
  MenuItem,
  Select,
  InputLabel,
  InputAdornment
} from '@mui/material';
import {
  Email,
  Notifications,
  Schedule,
  CheckCircle
} from '@mui/icons-material';

interface SubscriptionFormProps {
  eventId: string;
  eventTitle: string;
}

interface SubscriptionData {
  email: string;
  eventId: string;
  reminderDays: number[];
  notifications: {
    email: boolean;
    updates: boolean;
    reminders: boolean;
  };
}

const SubscriptionForm: React.FC<SubscriptionFormProps> = ({ eventId, eventTitle }) => {
  const [formData, setFormData] = useState<SubscriptionData>({
    email: '',
    eventId,
    reminderDays: [7, 1],
    notifications: {
      email: true,
      updates: true,
      reminders: true
    }
  });
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      email: e.target.value
    }));
    // Clear previous states
    setSuccess(false);
    setError(null);
  };

  const handleNotificationChange = (type: keyof typeof formData.notifications) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [type]: e.target.checked
      }
    }));
  };

  const handleReminderDaysChange = (e: any) => {
    setFormData(prev => ({
      ...prev,
      reminderDays: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email) {
      setError('Por favor, introduce tu email');
      return;
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Por favor, introduce un email válido');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      
      // Try API first
      if (apiUrl) {
        try {
          const response = await fetch(`${apiUrl}/api/subscriptions`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });

          if (response.ok) {
            setSuccess(true);
            setFormData(prev => ({ ...prev, email: '' }));
            setLoading(false);
            return;
          }
        } catch (apiError) {
          console.log('API not available, using mock implementation');
        }
      }

      // Mock implementation - simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Store in localStorage as mock database
      const existingSubscriptions = JSON.parse(
        localStorage.getItem('cybesphere_subscriptions') || '[]'
      );
      
      // Check if already subscribed
      const alreadySubscribed = existingSubscriptions.some(
        (sub: any) => sub.email === formData.email && sub.eventId === eventId
      );
      
      if (alreadySubscribed) {
        setError('Ya estás suscrito a este evento');
        setLoading(false);
        return;
      }

      // Add new subscription
      const newSubscription = {
        ...formData,
        subscribedAt: new Date().toISOString(),
        id: Math.random().toString(36).substr(2, 9)
      };
      
      existingSubscriptions.push(newSubscription);
      localStorage.setItem('cybesphere_subscriptions', JSON.stringify(existingSubscriptions));
      
      setSuccess(true);
      setFormData(prev => ({ ...prev, email: '' }));
      
    } catch (err) {
      setError('Error al procesar la suscripción. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Box sx={{ textAlign: 'center', py: 2 }}>
        <CheckCircle color="success" sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h6" color="success.main" gutterBottom>
          ¡Suscripción exitosa!
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={1}>
          Te enviaremos recordatorios y actualizaciones sobre:
        </Typography>
        <Typography variant="body2" color="primary" fontWeight="medium" mb={3}>
          "{eventTitle}"
        </Typography>
        <Button
          variant="outlined"
          onClick={() => setSuccess(false)}
          size="small"
        >
          Suscribir otro email
        </Button>
      </Box>
    );
  }

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack spacing={3}>
        {/* Email Input */}
        <TextField
          fullWidth
          type="email"
          label="Email"
          value={formData.email}
          onChange={handleEmailChange}
          required
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Email color="action" />
              </InputAdornment>
            )
          }}
          helperText="Usaremos tu email solo para notificaciones de este evento"
        />

        <Divider />

        {/* Reminder Settings */}
        <Box>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            <Schedule sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
            Recordatorios
          </Typography>
          <FormControl fullWidth size="small">
            <InputLabel>Días antes del evento</InputLabel>
            <Select
              multiple
              value={formData.reminderDays}
              onChange={handleReminderDaysChange}
              label="Días antes del evento"
            >
              <MenuItem value={30}>30 días</MenuItem>
              <MenuItem value={14}>14 días</MenuItem>
              <MenuItem value={7}>7 días</MenuItem>
              <MenuItem value={3}>3 días</MenuItem>
              <MenuItem value={1}>1 día</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Notification Preferences */}
        <Box>
          <Typography variant="subtitle2" gutterBottom color="text.secondary">
            <Notifications sx={{ fontSize: 16, mr: 0.5, verticalAlign: 'middle' }} />
            Preferencias de notificación
          </Typography>
          <FormControl component="fieldset">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.notifications.email}
                    onChange={handleNotificationChange('email')}
                    color="primary"
                  />
                }
                label="Confirmación por email"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.notifications.updates}
                    onChange={handleNotificationChange('updates')}
                    color="primary"
                  />
                }
                label="Actualizaciones del evento"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.notifications.reminders}
                    onChange={handleNotificationChange('reminders')}
                    color="primary"
                  />
                }
                label="Recordatorios automáticos"
              />
            </FormGroup>
          </FormControl>
        </Box>

        {/* Error/Success Messages */}
        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          variant="contained"
          fullWidth
          size="large"
          disabled={loading || !formData.email}
          sx={{ py: 1.5 }}
        >
          {loading ? 'Suscribiendo...' : '🔔 Suscribirme al evento'}
        </Button>

        <Typography variant="caption" color="text.secondary" textAlign="center">
          Podrás cancelar tu suscripción en cualquier momento
        </Typography>
      </Stack>
    </Box>
  );
};

export default SubscriptionForm;