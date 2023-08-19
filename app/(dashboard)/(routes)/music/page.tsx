'use client';
import Heading from '@/components/shared/Heading';
import React from 'react';
import { Music } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { MusicSchema } from '@/schemas';
import axios from 'axios';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

import Empty from '@/components/shared/Empty';

import Loader from '@/components/shared/Loader';

const MusicPage = () => {
  const router = useRouter();

  const [music, setMusic] = React.useState<string>();
  const form = useForm<z.infer<typeof MusicSchema>>({
    resolver: zodResolver(MusicSchema),
    defaultValues: {
      prompt: '',
    },
  });

  const isLoading = form.formState.isSubmitting;

  const onSubmit = async (data: z.infer<typeof MusicSchema>) => {
    try {
      setMusic(undefined);
      const response = await axios.post('/api/music', data);

      setMusic(response.data.audio);

      form.reset();
    } catch (error: any) {
      //TODO: Open Pro-modal with error message
      console.log(error);
    } finally {
      router.refresh();
    }
  };
  return (
    <div>
      <Heading
        title='Music Generation'
        description='Turn your prompt into a song.'
        icon={Music}
        iconColor='text-emerald-500'
        bgColor='bg-emerald-500/10'
      />

      <div className='px-4 lg:px-8'>
        <div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className='
                rounded-lg 
                border 
                w-full 
                p-4 
                px-3 
                md:px-6 
                focus-within:shadow-sm
                grid
                grid-cols-12
                gap-2
              '
            >
              <FormField
                name='prompt'
                render={({ field }) => (
                  <FormItem className='col-span-12 lg:col-span-10'>
                    <FormControl className='m-0 p-0'>
                      <Input
                        className='border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent'
                        disabled={isLoading}
                        placeholder='Piano solo '
                        {...field}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button
                className='col-span-12 lg:col-span-2 w-full'
                type='submit'
                disabled={isLoading}
                size='icon'
              >
                {isLoading ? 'Generating...' : 'Generate'}
              </Button>
            </form>
          </Form>
        </div>

        <div className='space-y-4 mt-4'>
          {isLoading && (
            <div className='p-8 rounded-lg w-full flex items-center justify-center bg-muted'>
              <Loader />
            </div>
          )}
          {music?.length === 0 && !isLoading && (
            <Empty label='No music generated.' />
          )}

          {music && (
            <audio controls className='w-full mt-8'>
              <source src={music} />
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
