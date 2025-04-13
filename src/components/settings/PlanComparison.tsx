
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export const PlanComparison = () => {
  const { user, upgradeAccount } = useAuth();

  const plans = [
    {
      name: 'Free',
      price: '$0',
      description: 'Basic vehicle diagnostics',
      features: [
        { name: 'Single vehicle', included: true },
        { name: 'Basic chat diagnostics', included: true },
        { name: 'Simple maintenance calendar', included: true },
        { name: 'Knowledge base access', included: true },
        { name: 'OBD-II scanner', included: false },
        { name: 'Advanced diagnostics', included: false },
        { name: 'Multiple vehicles', included: false },
        { name: 'Export/import data', included: false },
        { name: 'Ad-free experience', included: false },
      ],
      current: user ? !user.isPremium : false,
    },
    {
      name: 'Premium',
      price: '$4.99/month',
      description: 'Advanced vehicle management',
      features: [
        { name: 'Unlimited vehicles', included: true },
        { name: 'Advanced AI diagnostics', included: true },
        { name: 'Detailed maintenance calendar', included: true },
        { name: 'Full knowledge base access', included: true },
        { name: 'OBD-II scanner', included: true },
        { name: 'Advanced diagnostics', included: true },
        { name: 'Multiple vehicles', included: true },
        { name: 'Export/import data', included: true },
        { name: 'Ad-free experience', included: true },
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
        <h2 className="text-2xl font-bold">Choose Your Plan</h2>
        <p className="text-muted-foreground">
          Select the plan that best fits your vehicle maintenance needs
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
                    Current
                  </span>
                )}
              </CardTitle>
              <div className="flex items-end gap-1">
                <span className="text-3xl font-bold">{plan.price}</span>
                {plan.name === 'Premium' && (
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
              {plan.name === 'Premium' && !plan.current ? (
                <Button className="w-full" onClick={handleUpgrade}>
                  Upgrade to Premium
                </Button>
              ) : plan.current ? (
                <Button className="w-full" variant="outline" disabled>
                  Current Plan
                </Button>
              ) : (
                <Button className="w-full" variant="outline" disabled>
                  Free Plan
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
