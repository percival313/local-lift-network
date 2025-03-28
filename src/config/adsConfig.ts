
/**
 * Google AdSense Configuration
 * 
 * Replace the placeholder ADSENSE_CLIENT_ID with your actual AdSense client ID
 * Example format: 'ca-pub-1234567890123456'
 */
export const adsenseConfig = {
  clientId: 'ADSENSE_CLIENT_ID', // Replace with your AdSense client ID
  enabled: true,                 // Set to false to disable all ads
  testMode: true                 // Set to false for production
};

// Ad slot IDs for different ad units
export const adSlots = {
  sidebar: '1234567890',         // Replace with your actual ad slot ID for sidebar ads
  banner: '0987654321',          // Replace with your actual ad slot ID for banner ads
  inline: '5678901234'           // Replace with your actual ad slot ID for inline ads
};

// Default ad formats by ad type
export const adFormats = {
  sidebar: { width: 300, height: 250 },
  banner: { width: 728, height: 90 },
  inline: { width: 468, height: 60 }
};
