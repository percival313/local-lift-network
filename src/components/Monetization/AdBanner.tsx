import React, { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';
import { useAuth } from '../Auth/AuthContext';
import { adsenseConfig, adSlots, adFormats } from '@/config/adsConfig';

interface AdBannerProps {
  type: 'sidebar' | 'banner' | 'inline';
  className?: string;
}

// Mock ad data - used when AdSense is disabled or in test mode
const mockAds = [
  {
    id: 1,
    title: 'Hiring Now: Digital Marketing Roles',
    description: 'Local agency seeking junior marketers. No experience needed.',
    imageUrl: 'https://placehold.co/600x200/5271ff/ffffff?text=Marketing+Jobs',
    linkUrl: '#',
    advertiser: 'Digital Growth Agency'
  },
  {
    id: 2,
    title: 'Free CV Workshop This Saturday',
    description: 'Learn how to craft the perfect CV. Online session available.',
    imageUrl: 'https://placehold.co/600x200/27ca80/ffffff?text=CV+Workshop',
    linkUrl: '#',
    advertiser: 'Career Connect'
  },
  {
    id: 3,
    title: 'Discounted Training Courses',
    description: '50% off web development and data analysis courses.',
    imageUrl: 'https://placehold.co/600x200/f759ab/ffffff?text=Training+Courses',
    linkUrl: '#',
    advertiser: 'TechSkills Academy'
  }
];

export const AdBanner: React.FC<AdBannerProps> = ({ type, className = '' }) => {
  const { user } = useAuth();
  
  // Don't show ads for premium users
  if (user?.isPremium) {
    return null;
  }

  // Determine if we should use real or mock ads
  const useRealAds = adsenseConfig.enabled && 
                     adsenseConfig.clientId !== 'ADSENSE_CLIENT_ID' && 
                     !adsenseConfig.testMode;
  
  useEffect(() => {
    // Initialize AdSense if real ads are enabled
    if (useRealAds && typeof window !== 'undefined') {
      try {
        // Create AdSense script
        const adScript = document.createElement('script');
        adScript.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsenseConfig.clientId}`;
        adScript.async = true;
        adScript.crossOrigin = 'anonymous';
        
        // Check if script already exists
        if (!document.querySelector(`script[src*="adsbygoogle.js?client=${adsenseConfig.clientId}"]`)) {
          document.head.appendChild(adScript);
          console.log('AdSense script added to page');
        }
      } catch (error) {
        console.error('Error initializing AdSense:', error);
      }
    }
  }, [useRealAds]);

  // If using real ads, return the appropriate AdSense container
  if (useRealAds) {
    const adFormat = adFormats[type];
    
    return (
      <div className={`ad-container ${className}`}>
        <ins className="adsbygoogle"
             style={{ display: 'block', width: `${adFormat.width}px`, height: `${adFormat.height}px` }}
             data-ad-client={adsenseConfig.clientId}
             data-ad-slot={adSlots[type]}
             data-ad-format="auto"
             data-full-width-responsive="true"></ins>
        <script>
          {`(adsbygoogle = window.adsbygoogle || []).push({});`}
        </script>
      </div>
    );
  }
  
  // Otherwise, show mock ads
  // Pick a random ad from our mock data
  const randomIndex = Math.floor(Math.random() * mockAds.length);
  const ad = mockAds[randomIndex];
  
  // Log the impression (would be an API call in a real app)
  React.useEffect(() => {
    console.log(`Ad impression: ${ad.id} (${ad.title})`);
  }, [ad.id, ad.title]);
  
  const handleClick = () => {
    // Log the click (would be an API call in a real app)
    console.log(`Ad clicked: ${ad.id} (${ad.title})`);
  };
  
  if (type === 'sidebar') {
    return (
      <div className={`bg-background border border-border/40 rounded-lg p-4 ${className}`}>
        <div className="space-y-2">
          <div className="aspect-video bg-muted/50 rounded-md overflow-hidden">
            <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
          </div>
          <h4 className="font-medium text-sm">{ad.title}</h4>
          <p className="text-xs text-muted-foreground">{ad.description}</p>
          <a 
            href={ad.linkUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-xs text-primary hover:underline mt-1"
            onClick={handleClick}
          >
            Learn More
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
        <div className="mt-2 text-xs text-muted-foreground/60 text-right">
          Suggested by {ad.advertiser}
        </div>
      </div>
    );
  }
  
  if (type === 'banner') {
    return (
      <div className={`bg-background border-border/40 border-b pb-4 mb-6 ${className}`}>
        <div className="flex justify-between">
          <div className="flex-1 pr-4">
            <h3 className="font-medium mb-1">{ad.title}</h3>
            <p className="text-sm text-muted-foreground mb-2">{ad.description}</p>
            <a 
              href={ad.linkUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center text-sm text-primary hover:underline"
              onClick={handleClick}
            >
              Learn More
              <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          </div>
          <div className="w-1/3 max-w-[200px]">
            <div className="aspect-video bg-muted/50 rounded-md overflow-hidden">
              <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground/60 text-right">
          Suggested by {ad.advertiser}
        </div>
      </div>
    );
  }
  
  // Inline ad (smallest)
  return (
    <div className={`border-t border-b border-border/40 py-3 my-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="font-medium text-xs">{ad.title}</p>
          <a 
            href={ad.linkUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-xs text-primary hover:underline inline-flex items-center"
            onClick={handleClick}
          >
            Learn More
            <ExternalLink className="h-2 w-2 ml-1" />
          </a>
        </div>
        <div className="text-[10px] text-muted-foreground/60">
          Suggested by {ad.advertiser}
        </div>
      </div>
    </div>
  );
};
