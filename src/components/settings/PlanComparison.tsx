
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export const PlanComparison = () => {
  const { user, upgradeAccount } = useAuth();
  const { t } = useLanguage();

  const plans = [
    {
      name: t('freePlan'),
      price: '$0',
      description: t('basicDiagnostics'),
      features: [
        { name: t('singleVehicle'), included: true },
        { name: t('basicChatDiagnostics'), included: true },
        { name: t('simpleMaintenanceCalendar'), included: true },
        { name: t('knowledgeBaseAccess'), included: true },
        { name: t('obdScanner'), included: false },
        { name: t('advancedDiagnostics'), included: false },
        { name: t('multipleVehicles'), included: false },
        { name: t('exportImportData'), included: false },
        { name: t('adFreeExperience'), included: false },
      ],
      current: user ? !user.isPremium : false,
    },
    {
      name: t('premiumPlan'),
      price: '$4.99/month',
      description: t('advancedVehicleManagement'),
      features: [
        { name: t('unlimitedVehicles'), included: true },
        { name: t('advancedAIDiagnostics'), included: true },
        { name: t('detailedMaintenanceCalendar'), included: true },
        { name: t('fullKnowledgeBaseAccess'), included: true },
        { name: t('obdScanner'), included: true },
        { name: t('advancedDiagnostics'), included: true },
        { name: t('multipleVehicles'), included: true },
        { name: t('exportImportData'), included: true },
        { name: t('adFreeExperience'), included: true },
      ],
      current: user ? user.isPremium : false,
    },
  ];

  const handleUpgrade = () => {
    upgradeAccount();
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">{t('choosePlan')}</h2>
        <p className="text-muted-foreground">
          {t('selectPlan')}
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {plans.map((plan) => (
          <Card
            key={plan.name}
            className={`glass-card ${
              plan.current ? 'border-2 border-primary' : ''
            }`}
          >
            <CardHeader>
              <CardTitle>
                {plan.name}
                {plan.current && (
                  <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                    {t('currentPlan')}
                  </span>
                )}
              </CardTitle>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.name === t('premiumPlan') && (
                  <span className="text-muted-foreground text-sm mb-1">
                    /month
                  </span>
                )}
              </div>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    {feature.included ? (
                      <Check className="h-4 w-4 text-green-500" />
                    ) : (
                      <X className="h-4 w-4 text-gray-300" />
                    )}
                    <span
                      className={
                        feature.included ? '' : 'text-muted-foreground'
                      }
                    >
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              {plan.name === t('premiumPlan') && !plan.current ? (
                <Button className="w-full" onClick={handleUpgrade}>
                  {t('upgradeToPremium')}
                </Button>
              ) : plan.current ? (
                <Button className="w-full" variant="outline" disabled>
                  {t('currentPlan')}
                </Button>
              ) : (
                <Button className="w-full" variant="outline" disabled>
                  {t('freePlan')}
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
