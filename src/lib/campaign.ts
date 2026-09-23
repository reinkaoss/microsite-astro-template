import { z } from 'astro/zod'

/**
 * Everything that changes between campaigns lives in `campaign.config.ts`.
 * This schema is checked at build time, so a missing date or a malformed
 * form ID fails the build instead of breaking the live page.
 */

const typeform = z.object({
  type: z.literal('typeform'),
  id: z.string().min(4),
  /** `eu` for RMP's Typeform account (form.typeform.eu), `com` otherwise. */
  region: z.enum(['eu', 'com']).default('eu'),
})
const connect = z.object({
  type: z.literal('connect'),
  /** Full share URL from RMP Connect (includes the signed urlHash). */
  url: z.url(),
  form: z.string().optional(),
})
const hubspot = z.object({
  type: z.literal('hubspot'),
  portalId: z.string(),
  formId: z.string(),
  region: z.string().default('na1'),
})
export const formSchema = z.discriminatedUnion('type', [typeform, connect, hubspot])
export type CampaignForm = z.infer<typeof formSchema>

const navItem = z.object({ label: z.string(), href: z.string() })

export const campaignSchema = z.object({
  client: z.string(),
  name: z.string(),
  tagline: z.string(),
  description: z.string().max(170),
  /** ISO dates with an explicit offset, e.g. 2027-02-01T09:00:00+00:00 */
  opensAt: z.iso.datetime({ offset: true }),
  closesAt: z.iso.datetime({ offset: true }),
  /** Leave empty until the client's real container ID is known. */
  gtmId: z.string().regex(/^GTM-[A-Z0-9]+$/).optional(),
  cookiebotId: z.uuid().optional(),
  nav: z.array(navItem),
  footerNav: z.array(navItem),
  cta: navItem,
  forms: z.record(z.string(), formSchema),
  links: z.record(z.string(), z.url()).default({}),
  closed: z.object({
    heading: z.string(),
    body: z.string(),
    link: navItem.optional(),
  }),
})
export type Campaign = z.infer<typeof campaignSchema>

export function defineCampaign(config: z.input<typeof campaignSchema>): Campaign {
  return campaignSchema.parse(config)
}

export type Phase = 'coming-soon' | 'open' | 'closed'

/** Which state the campaign is in at `now` (build time for static pages). */
export function getPhase(c: Pick<Campaign, 'opensAt' | 'closesAt'>, now = new Date()): Phase {
  if (now < new Date(c.opensAt)) return 'coming-soon'
  if (now >= new Date(c.closesAt)) return 'closed'
  return 'open'
}

/** The CSP hosts each form provider needs; mirrored in vercel.json. */
export const formHosts: Record<CampaignForm['type'], string[]> = {
  typeform: ['https://form.typeform.eu', 'https://form.typeform.com'],
  connect: ['https://forms.rmp-connect.com'],
  hubspot: ['https://js.hsforms.net', 'https://forms.hsforms.com', 'https://*.hsforms.com'],
}

/** Content collections don't guarantee order; sort by the `order` field. */
export const byOrder = <T extends { data: { order: number } }>(a: T, b: T) => a.data.order - b.data.order
