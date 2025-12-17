import { z, defineCollection } from 'astro:content';

const blogCollection = defineCollection({
  type: 'content',
  schema: ({ image }) => z.object({
    title: z.string(),
    excerpt: z.string(),
    author: z.string(),
    date: z.date(),
    image: image().optional(),
    metaTitle: z.string().optional(),
    metaDescription: z.string().optional(),
    tags: z.array(z.string()).optional(),
    lang: z.enum(['en', 'zh']).default('en'),
  }),
});

export const collections = {
  'blog': blogCollection,
};
