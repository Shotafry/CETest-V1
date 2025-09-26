import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import LandingView from "../views/Landing/LandingView";
import EventDetailView from "../views/Event/EventDetailView";
import LoginView from "../views/Authentication/LoginView";
import RegisterView from "../views/Authentication/RegisterView";
import DashboardView from "../views/Dashboard/DashboardView";
import AnalyticsView from "../views/Analytics/AnalyticsView";
import SettingsView from "../views/Settings/SettingsView";
import FontTester from "../views/FontTester";
import MainLayout from "../layouts/MainLayout";
import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: 'dashboard',
        element: (
          <ProtectedRoute>
            <DashboardView />
          </ProtectedRoute>
        )
      },
      {
        path: 'analytics',
        element: (
          <ProtectedRoute requiredRole="organizer">
            <AnalyticsView />
          </ProtectedRoute>
        )
      },
      {
        path: 'settings',
        element: (
          <ProtectedRoute>
            <SettingsView />
          </ProtectedRoute>
        )
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
      },
      {
        path: 'register',
        element: <RegisterView />
      }
    ]
  }
]);

function AppRouter() {
  return <RouterProvider router={router} />;
}

export default AppRouter;