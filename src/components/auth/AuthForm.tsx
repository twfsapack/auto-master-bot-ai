
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Mail, Chrome, Apple, Loader2 } from 'lucide-react';

export const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [isAppleLoading, setIsAppleLoading] = useState(false);
  const { login, register, googleSignIn, appleSignIn } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
      navigate('/dashboard');
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

    if (password.length < 6) {
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
    setIsGoogleLoading(true);
    try {
      await googleSignIn();
      navigate('/welcome');
    } catch (error) {
      console.error('Google sign in error:', error);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const handleAppleSignIn = async () => {
    setIsAppleLoading(true);
    try {
      await appleSignIn();
      navigate('/welcome');
    } catch (error) {
      console.error('Apple sign in error:', error);
    } finally {
      setIsAppleLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-0 safe-area-top safe-area-bottom">
      <div className="w-full h-full flex flex-col justify-center px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
        <Card className="w-full glass-card animate-fade-in border-0 bg-transparent shadow-none">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6 bg-white/10 border border-white/20">
              <TabsTrigger value="login" className="text-white data-[state=active]:bg-purple-500/50 data-[state=active]:text-white">
                Iniciar Sesión
              </TabsTrigger>
              <TabsTrigger value="register" className="text-white data-[state=active]:bg-purple-500/50 data-[state=active]:text-white">
                Registrarse
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="login" className="space-y-6">
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl text-white">Bienvenido</CardTitle>
                <CardDescription className="text-white/70">
                  Inicia sesión en tu cuenta de Auto Master Bot
                </CardDescription>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="tuemail@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-purple-400 h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">Contraseña</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-purple-400 h-12"
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full futuristic-btn h-12 text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Iniciando sesión...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Iniciar Sesión
                    </>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-white/60">O continúa con</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  className="w-full h-12 bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                >
                  {isGoogleLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Chrome className="mr-2 h-4 w-4" />
                  )}
                  Continuar con Google
                </Button>
                
                <Button
                  onClick={handleAppleSignIn}
                  disabled={isAppleLoading}
                  className="w-full h-12 bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                >
                  {isAppleLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Apple className="mr-2 h-4 w-4" />
                  )}
                  Continuar con Apple
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="register" className="space-y-6">
              <div className="text-center space-y-2">
                <CardTitle className="text-2xl text-white">Crear Cuenta</CardTitle>
                <CardDescription className="text-white/70">
                  Únete a Auto Master Bot para gestionar tus vehículos
                </CardDescription>
              </div>

              <form onSubmit={handleRegister} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-white">Nombre</Label>
                  <Input
                    id="name"
                    placeholder="Tu nombre"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-purple-400 h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-email" className="text-white">Email</Label>
                  <Input
                    id="reg-email"
                    type="email"
                    placeholder="tuemail@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-purple-400 h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="reg-password" className="text-white">Contraseña</Label>
                  <Input
                    id="reg-password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-purple-400 h-12"
                  />
                  <p className="text-xs text-white/60">Mínimo 6 caracteres</p>
                </div>
                <Button 
                  type="submit" 
                  className="w-full futuristic-btn h-12 text-white" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creando cuenta...
                    </>
                  ) : (
                    <>
                      <Mail className="mr-2 h-4 w-4" />
                      Crear Cuenta
                    </>
                  )}
                </Button>
              </form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/20" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-transparent px-2 text-white/60">O regístrate con</span>
                </div>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                  className="w-full h-12 bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                >
                  {isGoogleLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Chrome className="mr-2 h-4 w-4" />
                  )}
                  Registrarse con Google
                </Button>
                
                <Button
                  onClick={handleAppleSignIn}
                  disabled={isAppleLoading}
                  className="w-full h-12 bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
                >
                  {isAppleLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <Apple className="mr-2 h-4 w-4" />
                  )}
                  Registrarse con Apple
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
};
