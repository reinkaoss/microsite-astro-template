import { defineCampaign } from './src/lib/campaign'

/**
 * The one file to edit for a new campaign: dates, forms, nav, links.
 * Everything below is sample data for the template's demo site.
 */
export default defineCampaign({
  client: 'acme',
  name: 'Acme Future Talent Awards 2027',
  tagline: 'Show us what you can do. Win a place on the Acme graduate programme.',
  description: 'Take on four short challenges, meet the people behind the work, and win a place on the Acme graduate programme.',

  opensAt: '2026-09-01T09:00:00+01:00',
  closesAt: '2027-05-02T00:00:00+01:00',

  // gtmId: 'GTM-XXXXXXX',
  // cookiebotId: '00000000-0000-0000-0000-000000000000',

  nav: [
    { label: 'How it works', href: '/#how' },
    { label: 'Prizes', href: '/#prizes' },
    { label: 'FAQs', href: '/faqs' },
    { label: 'Kit', href: '/kit' },
  ],
  footerNav: [
    { label: 'FAQs', href: '/faqs' },
    { label: 'Terms', href: '/terms' },
    { label: 'Privacy', href: '/privacy' },
  ],
  cta: { label: 'Enter now', href: '/#enter' },

  forms: {
    enter: { type: 'typeform', id: 'DvDtygj7', region: 'eu' },
    // register: { type: 'connect', url: 'https://forms.rmp-connect.com/f/...' },
    // contact: { type: 'hubspot', portalId: '4044433', formId: '...' },
  },

  links: {
    gallery: 'https://www.flickr.com/photos/apprenticeships/albums/72177720329146634/',
  },

  closed: {
    heading: 'This promotion is now closed.',
    body: 'Thank you to everyone who took part. Winners have been contacted by email.',
    link: { label: 'Find out more', href: 'https://example.com' },
  },
})
