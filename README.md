# 🛡️ CibESphere - Comunidad de Ciberseguridad España

<p align="center">
  <img src="public/cyberLogo.png" alt="CibESphere Logo" width="200"/>
</p>

**CibESphere** es una plataforma web para la comunidad de ciberseguridad en España. Permite a los usuarios descubrir eventos, conferencias, talleres y meetups de ciberseguridad en todo el país mediante un mapa interactivo.

## 🚀 Características Principales

### 📍 **Mapa Interactivo**
- Mapa centrado en España con marcadores de eventos
- Sistema de clustering para rendimiento optimizado
- Filtros avanzados por región, fechas y categorías
- Navegación intuitiva y responsive

### 🔐 **Sistema de Autenticación**
- Login/Registro con usuarios seed para desarrollo
- Control de acceso por roles (Admin, Organizador, Asistente)
- Persistencia de sesiones con localStorage
- Navegación inteligente post-autenticación

### 👥 **Panel Organizador**
- Crear y editar eventos de ciberseguridad
- Selector interactivo de ubicación en mapa
- Sistema de upload de logos con fallback base64
- Gestión completa de eventos propios

### 📧 **Sistema de Suscripciones**
- Suscribirse a eventos específicos
- Notificaciones por email
- Mock/API integration con fallback automático

## 🛠️ Stack Tecnológico

### Frontend
- **React 19** + **TypeScript** - Framework principal
- **Material-UI (MUI) v7** - Componentes de interfaz
- **React Router DOM** - Navegación
- **React Leaflet** - Mapas interactivos
- **@mui/x-date-pickers** - Selectores de fecha
- **date-fns** - Manejo de fechas

### Herramientas de Desarrollo
- **Vite** - Build tool y dev server
- **ESLint** + **TypeScript ESLint** - Linting
- **Leaflet** - Librería de mapas base

### Backend (Opcional)
- **Go** - API backend
- **PostgreSQL** - Base de datos
- **Redis** - Cache/Sesiones

## 🏃‍♂️ Inicio Rápido

### Prerrequisitos
- Node.js 18+ 
- npm 9+

### 1. Clonación e Instalación
```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/cibesphere-frontend.git
cd cibesphere-frontend

# Instalar dependencias
npm install --legacy-peer-deps

# Configurar variables de entorno
cp .env.example .env
# Editar .env según tus necesidades
```

### 2. Ejecutar en Desarrollo
```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5000`

### 3. Build para Producción
```bash
npm run build
npm run preview
```

## 🌍 Variables de Entorno

### Básicas (Requeridas)
```env
# URL del backend (opcional para desarrollo)
VITE_API_BASE_URL=http://localhost:8080

# Configuración del mapa (centrado en España)
VITE_MAP_DEFAULT_LAT=40.4165
VITE_MAP_DEFAULT_LNG=-3.70256
VITE_MAP_DEFAULT_ZOOM=6
```

### Avanzadas (Opcionales)
Ver `.env.example` para la lista completa de variables de configuración del backend.

## 🔑 Usuarios de Prueba

Durante el desarrollo, puedes usar estos usuarios predefinidos:

| Email | Contraseña | Rol | Permisos |
|-------|------------|-----|----------|
| `admin@cybesphere.local` | `Admin123!` | Admin | Acceso total |
| `organizer@cybesphere.local` | `Organizer123!` | Organizador | Crear/editar eventos, analytics |
| `attendee@cybesphere.local` | `Attendee123!` | Asistente | Ver eventos, suscribirse |

## 🏗️ Arquitectura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── auth/            # Componentes de autenticación
│   ├── common/          # Componentes generales
│   ├── Forms/           # Formularios
│   ├── Map/             # Componentes de mapa
│   └── Filters/         # Filtros de eventos
├── contexts/            # Context API
│   └── AuthContext.tsx  # Gestión global de autenticación
├── views/               # Páginas principales
│   ├── Authentication/ # Login/Register
│   ├── Event/          # Detalle de eventos
│   ├── Landing/        # Página principal
│   ├── Organizer/      # Panel del organizador
│   ├── Dashboard/      # Dashboard usuario
│   ├── Analytics/      # Panel analytics
│   └── Settings/       # Configuración
├── layouts/            # Layouts de página
├── router/             # Configuración de rutas
├── types/              # Tipos TypeScript
├── data/               # Datos mock
└── theme/              # Tema MUI personalizado
```

## 🎨 Tema y Diseño

### Paleta de Colores
- **Primario**: Cyan (#00bcd4) - Color cyber característico
- **Base**: Fondo blanco con acentos cyan
- **Estilo**: Minimalista y moderno

### Responsividad
- **Móvil**: xs (0-600px)
- **Tablet**: sm/md (600-1200px) 
- **Desktop**: lg/xl (1200px+)

## 🚀 Despliegue

### Replit (Recomendado para desarrollo)
1. Importa el repositorio en Replit
2. Las dependencias se instalan automáticamente
3. El servidor se ejecuta en puerto 5000

### Vercel/Netlify
```bash
npm run build
# Subir carpeta dist/ o conectar con Git
```

### Docker (con backend)
```bash
# Si tienes el backend configurado
docker-compose up -d
```

## 🔧 Configuración del Backend (Opcional)

Si quieres conectar con el backend Go:

### 1. Backend Setup
```bash
# En el directorio del backend
make setup      # Instalar dependencias
make docker-up  # Levantar PostgreSQL + Redis
make db-seed    # Poblar con datos de prueba
make dev        # Ejecutar servidor en desarrollo
```

### 2. Endpoints Disponibles
- `GET /api/events` - Lista de eventos
- `GET /api/events/:id` - Detalle de evento
- `POST /api/events` - Crear evento (organizer)
- `POST /api/auth/login` - Autenticación
- `POST /api/auth/register` - Registro
- `POST /api/subscriptions` - Suscribirse a eventos
- `POST /api/uploads` - Subir logos

### 3. Puertos de Desarrollo
- **Frontend**: 5000
- **Backend**: 8080
- **PostgreSQL**: 5432
- **Redis**: 6379
- **pgAdmin**: 5050

## 🧪 Testing

### Smoke Tests
Criterios de aceptación para verificar funcionamiento:

1. **✅ Landing**: Mapa carga y muestra marcadores
2. **✅ Navegación**: Click en marcador → popup → detalle evento
3. **✅ Autenticación**: Login con `organizer@cybesphere.local`
4. **✅ Creación**: Organizador puede crear evento → aparece en mapa
5. **✅ Suscripción**: Formulario de suscripción confirma registro

### Manual Testing
```bash
# 1. Probar registro de nuevo usuario
# 2. Login con usuario creado
# 3. Crear evento como organizador
# 4. Verificar evento en mapa principal
# 5. Suscribirse a evento
```

## 🤝 Contribución

### Desarrollo
1. Fork del repositorio
2. Crear rama feature: `git checkout -b feature/nueva-funcionalidad`
3. Commit cambios: `git commit -m 'Add: nueva funcionalidad'`
4. Push rama: `git push origin feature/nueva-funcionalidad`
5. Crear Pull Request

### Convenciones
- **Commits**: Usar prefijos (Add:, Fix:, Update:, Refactor:)
- **Naming**: camelCase para archivos, PascalCase para componentes
- **Styling**: Seguir configuración ESLint

## 🐛 Troubleshooting

### Error de dependencias
```bash
# Si hay conflictos con react-leaflet
npm install --legacy-peer-deps
```

### Problemas de mapa
```bash
# Verificar que Leaflet CSS esté importado
# Comprobar permisos de geolocalización
```

### Error de autenticación
```bash
# Limpiar localStorage
localStorage.clear()
# O desde DevTools: Application → Storage → Clear
```

### Puerto en uso
```bash
# Cambiar puerto en vite.config.ts si es necesario
# Para Replit, debe ser siempre 5000
```

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

## 🌐 Enlaces

- **Frontend Demo**: [En vivo en Replit]
- **Backend Repo**: [Repositorio Go Backend]
- **Documentación API**: [Swagger/OpenAPI]
- **Figma Design**: [Diseños UI/UX]

## 📞 Contacto

**Equipo CibESphere**
- Email: info@cibesphere.local
- Twitter: [@CibESphere](https://twitter.com/cibesphere)
- LinkedIn: [CibESphere](https://linkedin.com/company/cibesphere)

---

<p align="center">
  Hecho con ❤️ para la comunidad de ciberseguridad española
</p>
<p align="center">
  <strong>🛡️ Seguridad • 🤝 Comunidad • 🚀 Innovación</strong>
</p>