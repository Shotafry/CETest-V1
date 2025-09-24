# Cyber Project - React Application

## Overview
This is a React + TypeScript + Vite application with Material-UI components. The project includes a dashboard interface with authentication views, analytics, settings, and font testing capabilities.

## Project Structure
- **Frontend**: React 19 with TypeScript, using Vite as the build tool
- **UI Framework**: Material-UI (MUI) v7 with custom theming
- **Routing**: React Router v7 with browser-based routing
- **Styling**: CSS modules with global styles and custom fonts (Satoshi font family)

## Recent Changes (September 24, 2025)
- Configured Vite for Replit environment with host 0.0.0.0:5000 and allowedHosts: true
- Installed all dependencies successfully
- Set up Frontend workflow for development server
- Configured deployment settings for autoscale deployment target
- Verified application runs correctly with navigation working

## Architecture
- **Main Components**: AuthLayout, MainLayout, various view components
- **Routing Structure**: 
  - `/` → MainLayout with Dashboard as default
  - `/dashboard` → DashboardView
  - `/analytics` → AnalyticsView  
  - `/settings` → SettingsView
  - `/font-test` → FontTester
  - `/auth/login` → LoginView in AuthLayout
- **Custom Theme**: Material-UI custom theme configuration
- **Fonts**: Custom Satoshi font family included in public/fonts

## Development Setup
- **Port**: 5000 (configured for Replit environment)
- **Host**: 0.0.0.0 with allowedHosts: true for proxy compatibility
- **Dev Command**: `npm run dev`
- **Build Command**: `npm run build`
- **Preview Command**: `npm run preview`

## Known Issues
- Minor MUI Grid deprecation warnings (item, xs, md, lg props) - non-critical
- These warnings indicate the codebase uses older MUI Grid API patterns but functionality is not affected