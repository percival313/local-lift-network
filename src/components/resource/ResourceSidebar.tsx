
import React from 'react';
import ResourceMap from '@/components/ResourceMap';
import PremiumResourcesCard from '@/components/Monetization/PremiumResourcesCard';
import { ClickbankAffiliate } from '@/components/Monetization/ClickbankAffiliate';
import { Button } from '@/components/ui/button';

const ResourceSidebar: React.FC = () => {
  return (
    <div className="sticky top-24 space-y-6">
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <ResourceMap />
      </div>
      
      <PremiumResourcesCard />
      
      <ClickbankAffiliate 
        contextKeywords={['career', 'resources', 'employment']}
        layout="compact"
        className="mb-4"
      />
      
      <div className="bg-card rounded-lg border shadow-sm p-4">
        <h3 className="font-medium mb-2">Popular Resource Types</h3>
        <div className="space-y-2">
          <Button variant="outline" className="w-full justify-start" size="sm">
            Food Banks (12)
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            Job Centers (8)
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            Housing Support (15)
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            Training Programs (10)
          </Button>
          <Button variant="outline" className="w-full justify-start" size="sm">
            Financial Assistance (6)
          </Button>
        </div>
      </div>
      
      <div className="bg-card rounded-lg border shadow-sm p-4">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Sponsored</h3>
            <span className="text-xs text-muted-foreground hover:underline cursor-pointer">Ad</span>
          </div>
          <div className="bg-muted/50 rounded-md p-3 text-sm">
            <p className="font-medium mb-1">Local Hiring Event - Tech Jobs</p>
            <p className="text-muted-foreground mb-2">This Friday at Shoreditch Community Center. Entry-level positions available.</p>
            <Button variant="secondary" size="sm" className="w-full">Learn More</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceSidebar;
