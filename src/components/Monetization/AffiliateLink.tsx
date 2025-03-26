
import React, { useEffect } from 'react';
import { ExternalLink } from 'lucide-react';

interface AffiliateLinkProps {
  href: string;
  partnerId: string;
  title: string;
  className?: string;
  children: React.ReactNode;
}

export const AffiliateLink: React.FC<AffiliateLinkProps> = ({
  href,
  partnerId,
  title,
  className = '',
  children
}) => {
  // Construct the actual affiliate URL
  const affiliateUrl = `${href}${href.includes('?') ? '&' : '?'}ref=${partnerId}&utm_source=locallift&utm_medium=affiliate`;
  
  // Track impressions
  useEffect(() => {
    // In a real app, this would be an API call to track that this link was viewed
    console.log(`Affiliate link impression: ${partnerId} - ${title}`);
  }, [partnerId, title]);
  
  const handleClick = () => {
    // In a real app, this would be an API call to track the click
    console.log(`Affiliate link clicked: ${partnerId} - ${title}`);
  };
  
  return (
    <a 
      href={affiliateUrl}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className={`inline-flex items-center ${className}`}
      title={title}
      onClick={handleClick}
      data-affiliate-id={partnerId}
    >
      {children}
      <ExternalLink className="ml-1 h-3 w-3" />
    </a>
  );
};
