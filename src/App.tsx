
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { VehicleProvider } from './contexts/VehicleContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { MobileOptimizations } from './components/common/MobileOptimizations';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { Toaster } from '@/components/ui/toaster';

import Index from './pages/Index';
import Welcome from './pages/Welcome';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Chat from './pages/Chat';
import Vehicle from './pages/Vehicle';
import Maintenance from './pages/Maintenance';
import Database from './pages/Database';
import Settings from './pages/Settings';
import Onboarding from './pages/Onboarding';
import NotFound from './pages/NotFound';
import Scanner from './pages/Scanner';
import Files from './pages/Files';

import './App.css';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <VehicleProvider>
          <LanguageProvider>
            <MobileOptimizations />
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/auth/*" element={<Auth />} />
                <Route 
                  path="/welcome" 
                  element={
                    <ProtectedRoute>
                      <Welcome />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/chat" 
                  element={
                    <ProtectedRoute>
                      <Chat />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/vehicle" 
                  element={
                    <ProtectedRoute>
                      <Vehicle />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/maintenance" 
                  element={
                    <ProtectedRoute>
                      <Maintenance />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/database" 
                  element={
                    <ProtectedRoute>
                      <Database />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/settings" 
                  element={
                    <ProtectedRoute>
                      <Settings />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/onboarding" 
                  element={
                    <ProtectedRoute>
                      <Onboarding />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/scanner" 
                  element={
                    <ProtectedRoute>
                      <Scanner />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/files" 
                  element={
                    <ProtectedRoute>
                      <Files />
                    </ProtectedRoute>
                  } 
                />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Router>
            <Toaster />
          </LanguageProvider>
        </VehicleProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
