
import React, { useEffect, useState } from 'react';
import { ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AffiliateLink } from './AffiliateLink';

// Affiliate ID - replace with your actual Clickbank ID
const AFFILIATE_ID = 'youraffiliateid';

interface ClickbankProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  category: string[];
  imageUrl: string;
  clickbankLink: string;
}

// Mock Clickbank products - in a real app, this would come from an API
const clickbankProducts: ClickbankProduct[] = [
  {
    id: 'cb001',
    title: 'Resume Pro Builder',
    description: 'Professional resume templates that get you hired faster',
    price: '$27',
    category: ['resume', 'career', 'employment'],
    imageUrl: 'https://placehold.co/600x400/5271ff/ffffff?text=Resume+Pro',
    clickbankLink: 'https://hop.clickbank.net/?vendor=resumepro',
  },
  {
    id: 'cb002',
    title: 'Job Interview Mastery',
    description: 'Ace any job interview with our proven techniques',
    price: '$37',
    category: ['interview', 'career', 'employment'],
    imageUrl: 'https://placehold.co/600x400/27ca80/ffffff?text=Interview+Course',
    clickbankLink: 'https://hop.clickbank.net/?vendor=interviewmaster',
  },
  {
    id: 'cb003',
    title: 'Financial Freedom Guide',
    description: 'Learn how to manage finances during career transitions',
    price: '$19',
    category: ['finance', 'budgeting', 'resources'],
    imageUrl: 'https://placehold.co/600x400/f759ab/ffffff?text=Finance+Guide',
    clickbankLink: 'https://hop.clickbank.net/?vendor=financefreedom',
  },
  {
    id: 'cb004',
    title: 'Business Skills Masterclass',
    description: 'Essential skills for advancing your career or business',
    price: '$47',
    category: ['business', 'skills', 'career'],
    imageUrl: 'https://placehold.co/600x400/ffc658/ffffff?text=Business+Skills',
    clickbankLink: 'https://hop.clickbank.net/?vendor=bizskills',
  }
];

interface ClickbankAffiliateProps {
  contextKeywords?: string[];
  maxProducts?: number;
  layout?: 'grid' | 'list' | 'compact';
  showPrice?: boolean;
  className?: string;
}

export const ClickbankAffiliate: React.FC<ClickbankAffiliateProps> = ({ 
  contextKeywords = [],
  maxProducts = 2, 
  layout = 'grid',
  showPrice = true,
  className = ''
}) => {
  const [relevantProducts, setRelevantProducts] = useState<ClickbankProduct[]>([]);
  
  useEffect(() => {
    // Simple relevance algorithm - match products by category
    // In a real app, this would be more sophisticated
    let products: ClickbankProduct[];
    
    if (contextKeywords.length > 0) {
      products = clickbankProducts.filter(product => 
        product.category.some(cat => 
          contextKeywords.some(keyword => 
            cat.toLowerCase().includes(keyword.toLowerCase())
          )
        )
      );
    } else {
      // If no context keywords, return random products
      products = [...clickbankProducts].sort(() => 0.5 - Math.random());
    }
    
    // Limit to max number of products
    setRelevantProducts(products.slice(0, maxProducts));
    
    // Log impression for analytics
    console.log(`Showing Clickbank products for context: ${contextKeywords.join(', ')}`);
  }, [contextKeywords, maxProducts]);
  
  if (relevantProducts.length === 0) return null;
  
  if (layout === 'compact') {
    return (
      <div className={`bg-card rounded-lg border p-3 ${className}`}>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium text-sm">Recommended Products</h3>
          <span className="text-xs text-muted-foreground hover:underline cursor-pointer">Sponsored</span>
        </div>
        {relevantProducts.map(product => (
          <div key={product.id} className="mb-2 last:mb-0">
            <AffiliateLink 
              href={product.clickbankLink} 
              partnerId={AFFILIATE_ID} 
              title={product.title}
              className="font-medium text-sm hover:text-primary"
            >
              {product.title} {showPrice && <span className="text-xs text-muted-foreground">({product.price})</span>}
            </AffiliateLink>
          </div>
        ))}
      </div>
    );
  }
  
  if (layout === 'list') {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex justify-between items-center">
          <h3 className="font-medium">Recommended For You</h3>
          <span className="text-xs text-muted-foreground hover:underline cursor-pointer">Sponsored Content</span>
        </div>
        {relevantProducts.map(product => (
          <div key={product.id} className="flex border rounded-lg overflow-hidden">
            <div className="w-1/4 max-w-[120px] bg-muted">
              <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <div className="p-3 flex-1">
              <h4 className="font-medium mb-1">{product.title}</h4>
              <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
              <div className="flex justify-between items-center">
                {showPrice && <span className="text-sm font-semibold">{product.price}</span>}
                <AffiliateLink 
                  href={product.clickbankLink} 
                  partnerId={AFFILIATE_ID} 
                  title={product.title}
                  className="text-sm text-primary hover:underline"
                >
                  Learn More
                </AffiliateLink>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  
  // Default grid layout
  return (
    <div className={className}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-medium">Recommended Products</h3>
        <span className="text-xs text-muted-foreground hover:underline cursor-pointer">Sponsored Content</span>
      </div>
      <div className={`grid grid-cols-1 md:grid-cols-${maxProducts} gap-4`}>
        {relevantProducts.map(product => (
          <Card key={product.id}>
            <div className="aspect-video bg-muted overflow-hidden">
              <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">{product.title}</CardTitle>
              <CardDescription>{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              {showPrice && <p className="font-semibold">{product.price}</p>}
            </CardContent>
            <CardFooter>
              <AffiliateLink 
                href={product.clickbankLink} 
                partnerId={AFFILIATE_ID} 
                title={product.title}
                className="w-full"
              >
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </AffiliateLink>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};
