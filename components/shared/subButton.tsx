'use client';
import React from 'react';
import { Button } from '../ui/button';
import { Zap } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

interface Props {
  isPro: boolean;
}

const SubButton = ({ isPro = false }: Props) => {
  const [loading, setLoading] = React.useState(false);
  const onClick = async () => {
    try {
      setLoading(true);
      const res = await axios.get('/api/stripe');

      window.location.href = res.data.url;
    } catch (error) {
      toast.error('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };
  return (
    <Button variant={isPro ? 'default' : 'premium'} onClick={onClick}>
      {isPro ? 'Manage Subscription' : 'Upgrade to Pro'}
      {!isPro && <Zap className='ml-2 w-4 h-4 fill-white' />}
    </Button>
  );
};

export default SubButton;
