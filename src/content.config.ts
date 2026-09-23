import { defineCollection } from 'astro:content'
import { file } from 'astro/loaders'
import { z } from 'astro/zod'

/**
 * Site copy lives here as JSON (structured) or MDX (prose), typed so a
 * missing field fails the build. Replaces Storyblok.
 */
const faqs = defineCollection({
  loader: file('src/content/faqs.json'),
  schema: z.object({ order: z.number(), question: z.string(), answer: z.string(), featured: z.boolean().default(false) }),
})

const steps = defineCollection({
  loader: file('src/content/steps.json'),
  schema: z.object({ order: z.number(), title: z.string(), body: z.string() }),
})

const prizes = defineCollection({
  loader: file('src/content/prizes.json'),
  schema: z.object({ order: z.number(), title: z.string(), body: z.string(), tag: z.string() }),
})

export const collections = { faqs, steps, prizes }
