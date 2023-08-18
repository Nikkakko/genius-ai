import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const LandingPage = () => {
  return (
    <div
      className='flex flex-col items-center 
        gap-4 
      justify-center w-full h-screen bg-gray-100
    dark:bg-gray-900 dark:text-gray-100
     
    '
    >
      <div>
        <Link href='/sign-in'>
          <Button>Login</Button>
        </Link>
      </div>
      <div>
        <Link href='/sign-uo'>
          <Button>Register</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
