import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Chip,
  Stack,
  IconButton,
  Collapse,
  Button
} from '@mui/material';
import {
  FilterList,
  Clear,
  ExpandMore,
  ExpandLess
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { es } from 'date-fns/locale';
import type { EventFilters } from '../../types/event';

interface EventFiltersProps {
  filters: EventFilters;
  onFiltersChange: (filters: EventFilters) => void;
  availableRegions: string[];
  availableTags: string[];
}

const EventFiltersComponent: React.FC<EventFiltersProps> = ({
  filters,
  onFiltersChange,
  availableRegions,
  availableTags
}) => {
  const [isExpanded, setIsExpanded] = React.useState(false);

  const handleRegionChange = (region: string) => {
    const newRegions = filters.regions.includes(region)
      ? filters.regions.filter(r => r !== region)
      : [...filters.regions, region];
    
    onFiltersChange({
      ...filters,
      regions: newRegions
    });
  };

  const handleTagChange = (tag: string) => {
    const newTags = filters.tags.includes(tag)
      ? filters.tags.filter(t => t !== tag)
      : [...filters.tags, tag];
    
    onFiltersChange({
      ...filters,
      tags: newTags
    });
  };

  const handleDateChange = (field: 'start' | 'end') => (date: Date | null) => {
    onFiltersChange({
      ...filters,
      dateRange: {
        ...filters.dateRange,
        [field]: date
      }
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      regions: [],
      dateRange: { start: null, end: null },
      tags: []
    });
  };

  const hasActiveFilters = filters.regions.length > 0 || 
                          filters.tags.length > 0 || 
                          filters.dateRange.start !== null || 
                          filters.dateRange.end !== null;

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={es}>
      <Paper elevation={2} sx={{ p: 2, mb: 2 }}>
        {/* Header */}
        <Stack 
          direction="row" 
          alignItems="center" 
          justifyContent="space-between"
          onClick={() => setIsExpanded(!isExpanded)}
          sx={{ cursor: 'pointer', userSelect: 'none' }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <FilterList color="primary" />
            <Typography variant="h6" color="primary">
              Filtros
            </Typography>
            {hasActiveFilters && (
              <Chip 
                size="small" 
                label={
                  filters.regions.length + filters.tags.length + 
                  (filters.dateRange.start ? 1 : 0) + 
                  (filters.dateRange.end ? 1 : 0)
                }
                color="primary" 
              />
            )}
          </Stack>
          <Stack direction="row" alignItems="center" spacing={1}>
            {hasActiveFilters && (
              <IconButton 
                size="small" 
                onClick={(e) => {
                  e.stopPropagation();
                  clearAllFilters();
                }}
              >
                <Clear />
              </IconButton>
            )}
            <IconButton size="small">
              {isExpanded ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          </Stack>
        </Stack>

        {/* Filters Content */}
        <Collapse in={isExpanded}>
          <Box sx={{ mt: 2 }}>
            <Stack spacing={3}>
              {/* Date Range */}
              <Box>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  Rango de fechas
                </Typography>
                <Stack direction="row" spacing={2}>
                  <DatePicker
                    label="Fecha inicio"
                    value={filters.dateRange.start}
                    onChange={handleDateChange('start')}
                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  />
                  <DatePicker
                    label="Fecha fin"
                    value={filters.dateRange.end}
                    onChange={handleDateChange('end')}
                    slotProps={{ textField: { size: 'small', fullWidth: true } }}
                  />
                </Stack>
              </Box>

              {/* Regions */}
              <Box>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  Comunidades autónomas
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {availableRegions.map((region) => (
                    <Chip
                      key={region}
                      label={region}
                      onClick={() => handleRegionChange(region)}
                      color={filters.regions.includes(region) ? "primary" : "default"}
                      variant={filters.regions.includes(region) ? "filled" : "outlined"}
                      size="small"
                    />
                  ))}
                </Stack>
              </Box>

              {/* Tags */}
              <Box>
                <Typography variant="subtitle2" gutterBottom color="text.secondary">
                  Categorías
                </Typography>
                <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                  {availableTags.map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onClick={() => handleTagChange(tag)}
                      color={filters.tags.includes(tag) ? "primary" : "default"}
                      variant={filters.tags.includes(tag) ? "filled" : "outlined"}
                      size="small"
                    />
                  ))}
                </Stack>
              </Box>

              {/* Clear button */}
              {hasActiveFilters && (
                <Button 
                  onClick={clearAllFilters}
                  startIcon={<Clear />}
                  size="small"
                  color="primary"
                  variant="outlined"
                  sx={{ alignSelf: 'flex-start' }}
                >
                  Limpiar filtros
                </Button>
              )}
            </Stack>
          </Box>
        </Collapse>
      </Paper>
    </LocalizationProvider>
  );
};

export default EventFiltersComponent;