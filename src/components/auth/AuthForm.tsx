import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const AuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const { login, register, googleSignIn, appleSignIn, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Invalid input",
        description: "Please enter both email and password.",
      });
      return;
    }
    
    await login(email, password);
    navigate('/onboarding');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || !name) {
      toast({
        variant: "destructive",
        title: "Invalid input",
        description: "Please fill in all fields.",
      });
      return;
    }
    
    await register(email, password, name);
    navigate('/onboarding');
  };

  const handleGoogleSignIn = async () => {
    await googleSignIn();
    navigate('/onboarding');
  };

  const handleAppleSignIn = async () => {
    await appleSignIn();
    navigate('/onboarding');
  };

  return (
    <Card className="w-full max-w-md mx-auto glass-card animate-fade-in">
      <Tabs defaultValue="login" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Register</TabsTrigger>
        </TabsList>
        
        <TabsContent value="login">
          <form onSubmit={handleLogin}>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Welcome Back</CardTitle>
              <CardDescription className="text-center">
                Sign in to your Auto Master Bot account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="youremail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-purple hover:bg-purple/90 text-white" 
                disabled={isLoading}
              >
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="hover:bg-purple/10 border-purple/50 text-purple" 
                  onClick={handleGoogleSignIn} 
                  disabled={isLoading}
                >
                  Google
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="hover:bg-purple/10 border-purple/50 text-purple" 
                  onClick={handleAppleSignIn} 
                  disabled={isLoading}
                >
                  Apple
                </Button>
              </div>
            </CardFooter>
          </form>
        </TabsContent>
        
        <TabsContent value="register">
          <form onSubmit={handleRegister}>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Create Account</CardTitle>
              <CardDescription className="text-center">
                Join Auto Master Bot to manage your vehicles
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-email">Email</Label>
                <Input
                  id="reg-email"
                  type="email"
                  placeholder="youremail@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="reg-password">Password</Label>
                <Input
                  id="reg-password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <Button 
                type="submit" 
                className="w-full bg-purple hover:bg-purple/90 text-white" 
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or register with
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 w-full">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="hover:bg-purple/10 border-purple/50 text-purple" 
                  onClick={handleGoogleSignIn} 
                  disabled={isLoading}
                >
                  Google
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="hover:bg-purple/10 border-purple/50 text-purple" 
                  onClick={handleAppleSignIn} 
                  disabled={isLoading}
                >
                  Apple
                </Button>
              </div>
            </CardFooter>
          </form>
        </TabsContent>
      </Tabs>
    </Card>
  );
};
