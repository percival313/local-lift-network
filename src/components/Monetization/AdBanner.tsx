
import React from 'react';
import { ExternalLink } from 'lucide-react';
import { useAuth } from '../Auth/AuthContext';

interface AdBannerProps {
  type: 'sidebar' | 'banner' | 'inline';
  className?: string;
}

// Mock ad data - in a real app, this would come from an ad service or backend
const ads = [
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
  
  // Pick a random ad from our mock data
  const randomIndex = Math.floor(Math.random() * ads.length);
  const ad = ads[randomIndex];
  
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
      <div className={`bg-card rounded-lg border p-4 ${className}`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-sm">Sponsored</h3>
          <span className="text-xs text-muted-foreground hover:underline cursor-pointer">Ad</span>
        </div>
        <div className="space-y-2">
          <div className="aspect-video bg-muted rounded-md overflow-hidden">
            <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
          </div>
          <h4 className="font-medium text-sm">{ad.title}</h4>
          <p className="text-xs text-muted-foreground">{ad.description}</p>
          <a 
            href={ad.linkUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center text-xs text-primary hover:underline mt-2"
            onClick={handleClick}
          >
            Learn More
            <ExternalLink className="h-3 w-3 ml-1" />
          </a>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Ad by {ad.advertiser}
        </div>
      </div>
    );
  }
  
  if (type === 'banner') {
    return (
      <div className={`bg-card rounded-lg border p-4 ${className}`}>
        <div className="flex justify-between">
          <div className="flex-1 pr-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium">{ad.title}</h3>
              <span className="text-xs text-muted-foreground hover:underline cursor-pointer">Ad</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{ad.description}</p>
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
            <div className="aspect-video bg-muted rounded-md overflow-hidden">
              <img src={ad.imageUrl} alt={ad.title} className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
        <div className="mt-2 text-xs text-muted-foreground">
          Ad by {ad.advertiser}
        </div>
      </div>
    );
  }
  
  // Inline ad (smallest)
  return (
    <div className={`bg-muted/30 rounded-lg p-3 text-sm ${className}`}>
      <div className="flex justify-between items-center mb-1">
        <p className="font-medium text-xs">{ad.title}</p>
        <span className="text-[10px] text-muted-foreground hover:underline cursor-pointer">Ad</span>
      </div>
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
  );
};
