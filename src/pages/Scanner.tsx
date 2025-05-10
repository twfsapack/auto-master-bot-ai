
import { useAuth } from '@/contexts/AuthContext';
import Layout from '@/components/common/Layout';
import { OBDScanner } from '@/components/scanner/OBDScanner';
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Scanner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [showUpgrade, setShowUpgrade] = useState(!user?.isPremium);
  
  if (showUpgrade && !user?.isPremium) {
    return (
      <Layout>
        <div className="container max-w-md mx-auto mt-4">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5" />
                Función Premium
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <p>
                  El diagnóstico OBD-II es una característica premium.
                </p>
                <p className="text-sm text-muted-foreground">
                  Actualiza tu cuenta para acceder a todas las funcionalidades de diagnóstico avanzado.
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <Button onClick={() => navigate('/settings')}>
                  Actualizar a Premium
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowUpgrade(false)}
                >
                  Ver demostración
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold">Diagnóstico OBD-II</h1>
        <p className="text-muted-foreground mb-4">
          Conecta un escáner OBD-II a tu vehículo para realizar un diagnóstico completo
        </p>
        
        <OBDScanner />
        
        {!user?.isPremium && (
          <div className="mt-4 p-4 bg-yellow-100 dark:bg-yellow-900/20 rounded-md">
            <p className="text-sm text-yellow-800 dark:text-yellow-300">
              Estás utilizando una versión de demostración. Algunas funcionalidades pueden estar limitadas.
            </p>
            <Button 
              variant="link" 
              onClick={() => navigate('/settings')}
              className="p-0 h-auto text-yellow-800 dark:text-yellow-300 underline"
            >
              Actualizar a Premium
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Scanner;
