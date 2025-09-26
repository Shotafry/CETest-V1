import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

// Tipos para el usuario y autenticación
export interface User {
  email: string;
  role: 'admin' | 'organizer' | 'attendee';
  name?: string;
}

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  hasRole: (role: string) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Usuarios seed para desarrollo (mock)
const SEED_USERS = [
  { email: 'admin@cybesphere.local', password: 'Admin123!', role: 'admin' as const, name: 'Admin User' },
  { email: 'organizer@cybesphere.local', password: 'Organizer123!', role: 'organizer' as const, name: 'Organizer User' },
  { email: 'attendee@cybesphere.local', password: 'Attendee123!', role: 'attendee' as const, name: 'Attendee User' }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar estado de autenticación al inicializar
  useEffect(() => {
    const savedToken = localStorage.getItem('auth_token');
    const savedUser = localStorage.getItem('auth_user');
    
    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error loading saved auth:', error);
        localStorage.removeItem('auth_token');
        localStorage.removeItem('auth_user');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Buscar usuario en seeds y usuarios registrados
      const registeredUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const allUsers = [...SEED_USERS, ...registeredUsers];
      const foundUser = allUsers.find(u => u.email === email && u.password === password);
      
      if (foundUser) {
        // Mock de token JWT
        const mockToken = `mock-jwt-token-${Date.now()}`;
        const userData: User = {
          email: foundUser.email,
          role: foundUser.role,
          name: foundUser.name
        };

        setUser(userData);
        setToken(mockToken);
        
        // Guardar en localStorage
        localStorage.setItem('auth_token', mockToken);
        localStorage.setItem('auth_user', JSON.stringify(userData));
        
        return true;
      }

      // TODO: Aquí se integraría con el endpoint real del backend
      // const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/login`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password })
      // });
      
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, role = 'attendee'): Promise<boolean> => {
    try {
      setIsLoading(true);
      
      // Verificar si el usuario ya existe
      const existingUsers = JSON.parse(localStorage.getItem('registered_users') || '[]');
      const userExists = [...SEED_USERS, ...existingUsers].some(u => u.email === email);
      
      if (userExists) {
        console.error('User already exists');
        return false;
      }
      
      // Crear nuevo usuario
      const newUser = {
        email,
        password,
        role: role as 'admin' | 'organizer' | 'attendee',
        name: `${role.charAt(0).toUpperCase() + role.slice(1)} User`
      };
      
      // Guardarlo en localStorage para persistencia
      const updatedUsers = [...existingUsers, newUser];
      localStorage.setItem('registered_users', JSON.stringify(updatedUsers));
      
      console.log('User registered successfully:', { email, role });
      
      // TODO: Aquí se integraría con el endpoint real del backend
      // const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/auth/register`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password, role })
      // });
      
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
  };

  const hasRole = (role: string): boolean => {
    return user?.role === role;
  };

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    login,
    register,
    logout,
    isAuthenticated: !!user && !!token,
    hasRole
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};