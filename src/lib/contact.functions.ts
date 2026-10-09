import { createServerFn } from '@tanstack/react-start';
import { z } from 'zod';

const inquiry = z.object({
  name: z.string().trim().min(2).max(120),
  email: z.string().trim().email().max(254),
  service: z.enum(['Ecosystem research', 'Go to market strategy', 'Community building', 'Content strategy', 'Education and workshops', 'Advisory']),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0),
});

export const submitInquiry = createServerFn({ method: 'POST' })
  .inputValidator((data: unknown) => inquiry.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import('@/integrations/supabase/client.server');
    const { error } = await supabaseAdmin.from('contact_submissions').insert({
      name: data.name, email: data.email, service: data.service, message: data.message,
      recipient: 'sonimwangi6@gmail.com',
    });
    if (error) { console.error('Inquiry storage failed', error.code); throw new Error('Your message could not be saved. Please try again.'); }
    return { saved: true };
  });