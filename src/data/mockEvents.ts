import type { CyberEvent } from '../types/event';

// Mock data de eventos de ciberseguridad en España
export const mockEvents: CyberEvent[] = [
  {
    id: '1',
    title: 'Cybersecurity Summit Madrid 2024',
    description: 'El evento de ciberseguridad más importante de España. Conferencias magistrales, talleres prácticos y networking con los mejores profesionales del sector.',
    startDate: '2024-12-15T09:00:00Z',
    endDate: '2024-12-15T18:00:00Z',
    location: {
      lat: 40.4168,
      lng: -3.7038,
      city: 'Madrid',
      region: 'Comunidad de Madrid',
      address: 'Palacio de Congresos, Paseo de la Castellana 99'
    },
    logoUrl: 'https://via.placeholder.com/100x100/00bcd4/ffffff?text=CSM',
    organizer: {
      name: 'CyberSec Spain',
      email: 'info@cybersecspain.com'
    },
    tags: ['Conference', 'Networking', 'Enterprise'],
    attendeesCount: 250,
    maxAttendees: 300,
    isActive: true
  },
  {
    id: '2',
    title: 'Ethical Hacking Workshop Barcelona',
    description: 'Taller práctico de hacking ético con certificación. Aprende las últimas técnicas de pentesting y análisis de vulnerabilidades.',
    startDate: '2024-11-20T10:00:00Z',
    endDate: '2024-11-22T17:00:00Z',
    location: {
      lat: 41.3851,
      lng: 2.1734,
      city: 'Barcelona',
      region: 'Cataluña',
      address: 'Centro de Innovación Tecnológica, Carrer de Tanger 122'
    },
    logoUrl: 'https://via.placeholder.com/100x100/00bcd4/ffffff?text=EHW',
    organizer: {
      name: 'HackerSpace BCN',
      email: 'workshop@hackerspacebcn.org'
    },
    tags: ['Workshop', 'Hands-on', 'Pentesting'],
    attendeesCount: 45,
    maxAttendees: 50,
    isActive: true
  },
  {
    id: '3',
    title: 'Incident Response Meetup Valencia',
    description: 'Meetup mensual sobre respuesta a incidentes de seguridad. Casos reales, herramientas y mejores prácticas del sector.',
    startDate: '2024-11-30T19:00:00Z',
    endDate: '2024-11-30T21:30:00Z',
    location: {
      lat: 39.4699,
      lng: -0.3763,
      city: 'Valencia',
      region: 'Comunidad Valenciana',
      address: 'Impact Hub Valencia, Carrer de la Sangre 9'
    },
    logoUrl: 'https://via.placeholder.com/100x100/00bcd4/ffffff?text=IRM',
    organizer: {
      name: 'Valencia CyberSec Community',
      email: 'meetup@valenciacybersec.es'
    },
    tags: ['Meetup', 'Incident Response', 'Community'],
    attendeesCount: 35,
    maxAttendees: 40,
    isActive: true
  },
  {
    id: '4',
    title: 'OWASP Sevilla Chapter Meeting',
    description: 'Reunión mensual del capítulo OWASP Sevilla. Presentaciones sobre seguridad en aplicaciones web y mobile.',
    startDate: '2024-12-05T18:30:00Z',
    endDate: '2024-12-05T20:30:00Z',
    location: {
      lat: 37.3886,
      lng: -5.9823,
      city: 'Sevilla',
      region: 'Andalucía',
      address: 'Universidad de Sevilla, Escuela Técnica Superior de Ingeniería Informática'
    },
    logoUrl: 'https://via.placeholder.com/100x100/00bcd4/ffffff?text=OWASP',
    organizer: {
      name: 'OWASP Sevilla',
      email: 'sevilla@owasp.org'
    },
    tags: ['OWASP', 'Web Security', 'Mobile Security'],
    attendeesCount: 28,
    maxAttendees: 50,
    isActive: true
  },
  {
    id: '5',
    title: 'Cloud Security Conference Bilbao',
    description: 'Conferencia especializada en seguridad en la nube. AWS, Azure, GCP y estrategias de zero trust.',
    startDate: '2024-12-10T09:30:00Z',
    endDate: '2024-12-10T16:30:00Z',
    location: {
      lat: 43.2627,
      lng: -2.9253,
      city: 'Bilbao',
      region: 'País Vasco',
      address: 'Palacio Euskalduna, Abandoibarra Et. 4'
    },
    logoUrl: 'https://via.placeholder.com/100x100/00bcd4/ffffff?text=CSC',
    organizer: {
      name: 'CloudSec Euskadi',
      email: 'info@cloudsec.eus'
    },
    tags: ['Cloud Security', 'Conference', 'Zero Trust'],
    attendeesCount: 120,
    maxAttendees: 150,
    isActive: true
  },
  {
    id: '6',
    title: 'Cybersecurity Bootcamp Zaragoza',
    description: 'Bootcamp intensivo de 3 días sobre fundamentos de ciberseguridad para principiantes y profesionales IT.',
    startDate: '2024-11-25T09:00:00Z',
    endDate: '2024-11-27T17:00:00Z',
    location: {
      lat: 41.6488,
      lng: -0.8891,
      city: 'Zaragoza',
      region: 'Aragón',
      address: 'Centro de Emprendimiento, Paseo de Sagasta 107'
    },
    logoUrl: 'https://via.placeholder.com/100x100/00bcd4/ffffff?text=CBZ',
    organizer: {
      name: 'TechAragón Security',
      email: 'bootcamp@techaragon.es'
    },
    tags: ['Bootcamp', 'Training', 'Beginner'],
    attendeesCount: 60,
    maxAttendees: 80,
    isActive: true
  }
];