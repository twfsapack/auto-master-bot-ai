
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Chrome, Apple } from 'lucide-react';

export const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login, register, googleSignIn, appleSignIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Datos incompletos",
        description: "Por favor ingresa tu email y contraseña.",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        variant: "destructive",
        title: "Email inválido",
        description: "Por favor ingresa un email válido.",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await login(email, password);
      const welcomeCompleted = localStorage.getItem('welcomeCompleted');
      if (!welcomeCompleted) {
        navigate('/welcome');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password || !name) {
      toast({
        variant: "destructive",
        title: "Datos incompletos",
        description: "Por favor completa todos los campos.",
      });
      return;
    }

    if (!validateEmail(email)) {
      toast({
        variant: "destructive",
        title: "Email inválido",
        description: "Por favor ingresa un email válido.",
      });
      return;
    }

    if (!validatePassword(password)) {
      toast({
        variant: "destructive",
        title: "Contraseña muy corta",
        description: "La contraseña debe tener al menos 6 caracteres.",
      });
      return;
    }
    
    setIsLoading(true);
    try {
      await register(email, password, name);
      navigate('/welcome');
    } catch (error) {
      console.error('Register error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    try {
      await googleSignIn();
    } catch (error) {
      console.error('Google sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setIsLoading(true);
    try {
      await appleSignIn();
    } catch (error) {
      console.error('Apple sign in error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-0">
      <Card className="w-full max-w-md mx-4 glass-card animate-fade-in">
        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Iniciar Sesión</TabsTrigger>
            <TabsTrigger value="register">Registrarse</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <form onSubmit={handleLogin}>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Bienvenido</CardTitle>
                <CardDescription className="text-center">
                  Inicia sesión en tu cuenta de Auto Master Bot
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tuemail@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="text-base"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-secondary to-blue-light hover:from-blue-light hover:to-blue-secondary text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
                </Button>
                
                <div className="w-full space-y-2">
                  <Button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
                    disabled={isLoading}
                  >
                    <Chrome className="w-4 h-4 mr-2" />
                    Continuar con Google
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={handleAppleSignIn}
                    className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
                    disabled={isLoading}
                  >
                    <Apple className="w-4 h-4 mr-2" />
                    Continuar con Apple
                  </Button>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
          
          <TabsContent value="register">
            <form onSubmit={handleRegister}>
              <CardHeader>
                <CardTitle className="text-2xl text-center">Crear Cuenta</CardTitle>
                <CardDescription className="text-center">
                  Únete a Auto Master Bot para gestionar tus vehículos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="tuemail@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="text-base"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password">Contraseña</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="text-base"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-accent-orange to-accent-green hover:from-accent-green hover:to-accent-orange text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? "Creando cuenta..." : "Crear Cuenta"}
                </Button>
                
                <div className="w-full space-y-2">
                  <Button
                    type="button"
                    onClick={handleGoogleSignIn}
                    className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
                    disabled={isLoading}
                  >
                    <Chrome className="w-4 h-4 mr-2" />
                    Registrarse con Google
                  </Button>
                  
                  <Button
                    type="button"
                    onClick={handleAppleSignIn}
                    className="w-full bg-white/10 border border-white/20 text-white hover:bg-white/20"
                    disabled={isLoading}
                  >
                    <Apple className="w-4 h-4 mr-2" />
                    Registrarse con Apple
                  </Button>
                </div>
              </CardFooter>
            </form>
          </TabsContent>
        </Tabs>
      </Card>
    </div>
  );
};
