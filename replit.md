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

✅ **PR2 Completado**: Página detalle + suscripción
- Vista completa de eventos con mapa de ubicación
- Formulario de suscripción con validación
- Integración con mock/API para suscripciones
- Navegación desde marcadores del mapa

✅ **PR3 Completado**: Auth completa con roles
- Login/Register con usuarios seed
- AuthContext y AuthProvider global
- Protección de rutas por autenticación y roles
- Integración con localStorage para persistencia
- Navegación automática post-login

## Recent Changes
**Fecha: 2025-09-26 - PR3 Auth System**
- ✅ Implementado AuthContext con gestión global de estado
- ✅ LoginView funcional con usuarios seed integrados
- ✅ RegisterView con validación y selección de roles
- ✅ ProtectedRoute component para rutas privadas
- ✅ Integración router con protección por roles
- ✅ Persistencia auth en localStorage
- ✅ Navegación automática post-login/logout

**Fecha: 2024-09-25 - PR2 Event Details**
- ✅ EventDetailView con información completa
- ✅ SubscriptionForm con validación email
- ✅ Integración mapa ubicación en detalle evento
- ✅ Mock/API fallback para suscripciones
- ✅ Navegación desde landing a detalle

**Fecha: 2024-09-25 - PR1 Landing**
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
│   ├── auth/
│   │   └── ProtectedRoute.tsx    # HOC para protección de rutas
│   ├── common/
│   │   └── CustomCard.tsx        # Componente card reutilizable
│   ├── Forms/
│   │   └── SubscriptionForm.tsx  # Formulario suscripción eventos
│   ├── Map/
│   │   ├── EventMap.tsx          # Mapa principal con marcadores
│   │   └── EventLocationMap.tsx  # Mapa ubicación específica
│   └── Filters/
│       └── EventFilters.tsx      # Filtros de eventos
├── contexts/
│   └── AuthContext.tsx           # Context global de autenticación
├── views/
│   ├── Authentication/
│   │   ├── LoginView.tsx         # Vista de login
│   │   └── RegisterView.tsx      # Vista de registro
│   ├── Event/
│   │   └── EventDetailView.tsx   # Detalle completo de evento
│   ├── Landing/
│   │   └── LandingView.tsx       # Página principal con mapa
│   ├── Dashboard/
│   │   └── DashboardView.tsx     # Panel usuario autenticado
│   ├── Analytics/
│   │   └── AnalyticsView.tsx     # Panel organizador (protegido)
│   └── Settings/
│       └── SettingsView.tsx      # Configuración usuario
├── layouts/
│   ├── MainLayout.tsx            # Layout principal con navegación
│   └── AuthLayout.tsx            # Layout para auth (login/register)
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
**PR4 NEXT**: Panel organizador (crear/editar eventos)
- Formulario crear evento con mapa selector ubicación
- Upload logos con fallback base64
- Gestión eventos propios del organizador
- Validación roles y permisos

**PR5**: Documentación completa + .env.example
- README con setup e instrucciones backend
- .env.example con todas las variables
- Screenshots y demos de funcionalidades

## User Preferences
- Priorizar rendimiento (clustering, lazy-loading)
- Estética minimalista: base blanca + acentos cyan
- Usar VITE_API_BASE_URL para APIs
- Implementar mocks si backend no existe
- Auth con usuarios seed para desarrollo
- Protección rutas por roles (admin > organizer > attendee)
- Persistencia estado en localStorage
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
### PR1 - Landing & Map
- 🗺️ Mapa interactivo centrado en España
- 📍 Marcadores de eventos con clustering
- 🔍 Filtros por región, fechas y categorías
- 🎨 Tema ciber con colores cyan
- 📱 Diseño responsive

### PR2 - Event Details
- 📄 Vista detalle completa de eventos
- 📧 Formulario suscripción con validación
- 🗺️ Mapa ubicación específica del evento
- 🔄 Mock/API fallback para suscripciones

### PR3 - Authentication
- 🔐 Login/Register funcional con seeds
- 👤 AuthContext global y persistencia
- 🛡️ Protección rutas por autenticación
- 🏷️ Control acceso por roles (admin/organizer/attendee)
- 🔄 Navegación automática post-login
- ⚡ Hot reload configurado para Replit