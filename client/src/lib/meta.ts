// Dynamic meta tag management for social sharing
export interface MetaConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
}

export function updateMetaTags(config: MetaConfig) {
  // Update title
  document.title = config.title;
  
  // Update meta description
  updateMetaTag('description', config.description);
  
  // Update Open Graph tags
  updateMetaProperty('og:title', config.title);
  updateMetaProperty('og:description', config.description);
  if (config.url) updateMetaProperty('og:url', config.url);
  if (config.image) updateMetaProperty('og:image', config.image);
  
  // Update Twitter Card tags
  updateMetaTag('twitter:title', config.title);
  updateMetaTag('twitter:description', config.description);
  if (config.image) updateMetaTag('twitter:image', config.image);
  
  // Update Discord tags
  updateMetaProperty('discord:title', config.title);
  updateMetaProperty('discord:description', config.description);
  if (config.image) updateMetaProperty('discord:image', config.image);
}

function updateMetaTag(name: string, content: string) {
  let meta = document.querySelector(`meta[name="${name}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', name);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function updateMetaProperty(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

// Page-specific meta configurations
export const pageMetaConfigs = {
  home: {
    title: "Workplace Janitorial Services | Professional Office Cleaning Winnipeg",
    description: "Professional office cleaning services in Winnipeg. 30-minute guarantee, WCB coverage, criminal background checks. Free quotes for commercial cleaning.",
    image: "/social-preview.svg",
    url: "https://workplacejanitorial.ca"
  },
  privacy: {
    title: "Privacy Policy | Workplace Janitorial Services",
    description: "Privacy policy for Workplace Janitorial Services. Learn how we protect your personal information and data privacy.",
    image: "/social-preview.svg",
    url: "https://workplacejanitorial.ca/privacy-policy"
  },
  terms: {
    title: "Terms of Service | Workplace Janitorial Services",
    description: "Terms of service and conditions for using Workplace Janitorial Services cleaning solutions in Winnipeg.",
    image: "/social-preview.svg",
    url: "https://workplacejanitorial.ca/terms-of-service"
  },
  sitemap: {
    title: "Sitemap | Workplace Janitorial Services",
    description: "Complete sitemap for Workplace Janitorial Services website. Find all our cleaning services and information pages.",
    image: "/social-preview.svg",
    url: "https://workplacejanitorial.ca/sitemap"
  }
};