export type FooterLink = {
  title: string;
  url: string;
};

// Rendered by components/Footer.astro, in this order.
export const links: FooterLink[] = [
  { title: 'Privacy', url: 'https://octopus.com/legal/privacy' },
  { title: 'GDPR', url: 'https://octopus.com/legal/gdpr' },
  { title: 'Terms', url: 'https://octopus.com/legal/customer-agreement' },
  { title: 'Status', url: 'https://status.octopus.com/' },
  { title: 'Support', url: 'https://octopus.com/support' },
  { title: 'Community Slack', url: 'https://oc.to/CommunitySlack' },
];
