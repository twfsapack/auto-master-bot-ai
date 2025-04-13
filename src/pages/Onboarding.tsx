
import { VehicleForm } from '@/components/onboarding/VehicleForm';

const Onboarding = () => {
  return (
    <div className="min-h-screen gradient-bg flex flex-col items-center justify-center p-6">
      <h1 className="text-3xl font-bold text-white mb-8 text-center">
        Let's Set Up Your Vehicle
      </h1>
      <VehicleForm />
    </div>
  );
};

export default Onboarding;
