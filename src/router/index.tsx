import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingView from "../views/Landing/LandingView";
import EventDetailView from "../views/Event/EventDetailView";
import LoginView from "../views/Authentication/LoginView";
import DashboardView from "../views/Dashboard/DashboardView";
import AnalyticsView from "../views/Analytics/AnalyticsView";
import SettingsView from "../views/Settings/SettingsView";
import FontTester from "../views/FontTester";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: <DashboardView />
      },
      {
        path: 'analytics',
        element: <AnalyticsView />
      },
      {
        path: 'settings',
        element: <SettingsView />
      },
      {
        path: 'font-test',
        element: <FontTester />
      },
      {
        path: 'event/:id',
        element: <EventDetailView />
      },
      {
        index: true,
        element: <LandingView />
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginView />
      }
    ]
  }
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;