
import { VehicleCard } from '@/components/dashboard/VehicleCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { MaintenanceReminders } from '@/components/dashboard/MaintenanceReminders';
import { LocationButtons } from '@/components/premium/LocationButtons';
import Layout from '@/components/common/Layout';
import { useLanguage } from '@/contexts/LanguageContext';

const Dashboard = () => {
  const { t } = useLanguage();
  
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-white animate-glow-pulse">{t('dashboard')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <VehicleCard />
          <div className="space-y-6">
            <QuickActions />
            <LocationButtons />
          </div>
        </div>
        <MaintenanceReminders />
      </div>
    </Layout>
  );
};

export default Dashboard;
