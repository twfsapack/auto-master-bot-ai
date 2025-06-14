
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { VehicleProvider } from './contexts/VehicleContext';
import { LanguageProvider } from './contexts/LanguageContext';
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
            <Router>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/welcome" element={<Welcome />} />
                <Route path="/auth/*" element={<Auth />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/chat" element={<Chat />} />
                <Route path="/vehicle" element={<Vehicle />} />
                <Route path="/maintenance" element={<Maintenance />} />
                <Route path="/database" element={<Database />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/onboarding" element={<Onboarding />} />
                <Route path="/scanner" element={<Scanner />} />
                <Route path="/files" element={<Files />} />
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
