# CibESphere - Comunidad de Ciberseguridad España

## Overview
CibESphere es una plataforma web para la comunidad de ciberseguridad en España. Permite a los usuarios descubrir eventos, conferencias, talleres y meetups de ciberseguridad en todo el país.

**Tech Stack:**
- Frontend: React + TypeScript + Vite
- UI Library: Material-UI (MUI) 
- Maps: React Leaflet + Leaflet
- Date Handling: date-fns
- Routing: React Router DOM

## Current State
✅ **PR1 Completado**: Landing con mapa, marcadores y filtros
- Mapa centrado en España con eventos de ciberseguridad
- Marcadores con clustering para rendimiento
- Filtros por comunidad autónoma, fechas y categorías
- Tema ciber con colores cyan
- Datos mock de eventos reales

## Recent Changes
**Fecha: 2024-09-25**
- Configurado Vite para entorno Replit (puerto 5000, hosts permitidos)
- Implementada landing page con mapa de España
- Agregados componentes de mapa y filtros
- Creados tipos TypeScript para eventos
- Implementado tema ciber con colores cyan (#00bcd4)
- Datos mock de 6 eventos de ciberseguridad en España

## Architecture
```
src/
├── components/
│   ├── Map/
│   │   └── EventMap.tsx          # Componente del mapa con marcadores
│   └── Filters/
│       └── EventFilters.tsx      # Filtros de eventos
├── views/
│   └── Landing/
│       └── LandingView.tsx       # Página principal
├── types/
│   └── event.ts                  # Tipos de eventos
├── data/
│   └── mockEvents.ts             # Datos mock de eventos
└── theme/
    └── customTheme.ts            # Tema personalizado con colores cyan
```

## Environment Variables
```
VITE_API_BASE_URL=http://localhost:8080  # URL del backend Go
VITE_MAP_DEFAULT_LAT=40.4165            # Centro del mapa (Madrid)
VITE_MAP_DEFAULT_LNG=-3.70256
VITE_MAP_DEFAULT_ZOOM=6
```

## Próximos Pasos (Roadmap)
**PR2**: Página de detalle de evento + suscripción
**PR3**: Autenticación (login/register) + AuthProvider  
**PR4**: Panel organizador (crear/editar eventos)
**PR5**: Documentación completa + README

## User Preferences
- Priorizar rendimiento (clustering, lazy-loading)
- Estética minimalista: base blanca + acentos cyan
- Usar VITE_API_BASE_URL para APIs
- Implementar mocks si backend no existe
- Documentar cambios en PRs

## Development Setup
```bash
npm install
npm run dev  # Ejecuta en puerto 5000 para Replit
```

## API Contract (Expected)
- `GET /api/events` → Lista de eventos
- `GET /api/events/:id` → Detalle de evento  
- `POST /api/subscriptions` → Suscribirse a evento
- `POST /api/auth/login` → Autenticación
- `POST /api/uploads` → Subir logos

## Key Features Implemented
- 🗺️ Mapa interactivo centrado en España
- 📍 Marcadores de eventos con clustering
- 🔍 Filtros por región, fechas y categorías  
- 🎨 Tema ciber con colores cyan
- 📱 Diseño responsive
- ⚡ Hot reload configurado para Replit