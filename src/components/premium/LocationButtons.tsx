
import React from 'react';
import { Store, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const LocationButtons = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const handleFindWorkshops = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        window.open(`https://www.google.com/maps/search/talleres+mecanicos/@${latitude},${longitude},14z`, '_blank');
      });
    }
  };

  const handleFindParts = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        window.open(`https://www.google.com/maps/search/autopartes/@${latitude},${longitude},14z`, '_blank');
      });
    }
  };

  if (!user?.isPremium) {
    return (
      <div className="space-y-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full opacity-50 cursor-not-allowed"
                disabled
              >
                <Wrench className="mr-2 h-4 w-4" />
                {t('findWorkshops')}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('premiumFeature')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                variant="outline" 
                className="w-full opacity-50 cursor-not-allowed"
                disabled
              >
                <Store className="mr-2 h-4 w-4" />
                {t('findParts')}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>{t('premiumFeature')}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Button 
        variant="outline" 
        className="w-full" 
        onClick={handleFindWorkshops}
      >
        <Wrench className="mr-2 h-4 w-4" />
        {t('findWorkshops')}
      </Button>

      <Button 
        variant="outline" 
        className="w-full" 
        onClick={handleFindParts}
      >
        <Store className="mr-2 h-4 w-4" />
        {t('findParts')}
      </Button>
    </div>
  );
};
