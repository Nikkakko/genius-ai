import LandingContent from '@/components/shared/LandingContent';
import LandingHero from '@/components/shared/LandingHero';
import LandingNavbar from '@/components/shared/LandingNavbar';

const LandingPage = () => {
  return (
    <div className='h-full '>
      <LandingNavbar />
      <LandingHero />
      <LandingContent />
    </div>
  );
};

export default LandingPage;
