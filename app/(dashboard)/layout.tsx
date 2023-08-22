import Navbar from '@/components/shared/Navbar';
import Sidebar from '@/components/shared/Sidebar';
import { getApiLimitCount } from '@/lib/api-limit';
import { checkSubscription } from '@/lib/subscription';

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApiLimitCount();
  const isPro = await checkSubscription();

  return (
    <div className='h-full relative'>
      <div className='hidden h-full md:flex md:w-72 md:flex-col md:fixed md:inset-y-0 z-80 bg-gray-900'>
        <Sidebar apiLimitCount={apiLimitCount as number} isPro={isPro} />
      </div>
      <main className='md:pl-72 pb-10'>
        <Navbar />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
