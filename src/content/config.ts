import { defineCollection, z } from 'astro:content';

const people = defineCollection({
  type: 'content',
  // Relax schema to avoid required fields in dev since we moved content elsewhere
  schema: z.object({
    name: z.string().optional(),
    role: z.string().optional(),
    email: z.string().optional(),
    avatar: z.string().optional(),
  }),
});

export const collections = { people };
