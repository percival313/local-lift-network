
import React from 'react';
import ResourceMap from '@/components/ResourceMap';
import PremiumResourcesCard from '@/components/Monetization/PremiumResourcesCard';
import { ClickbankAffiliate } from '@/components/Monetization/ClickbankAffiliate';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';

interface ResourceSidebarProps {
  distanceRange: number;
  onDistanceChange: (value: number) => void;
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
}

const ResourceSidebar: React.FC<ResourceSidebarProps> = ({
  distanceRange,
  onDistanceChange,
  selectedTypes,
  onTypeToggle
}) => {
  const resourceTypes = [
    { id: 'food-bank', name: 'Food Banks', count: 12 },
    { id: 'job-center', name: 'Job Centers', count: 8 },
    { id: 'housing', name: 'Housing Support', count: 15 },
    { id: 'training', name: 'Training Programs', count: 10 },
    { id: 'financial', name: 'Financial Assistance', count: 6 }
  ];

  return (
    <div className="sticky top-24 space-y-6">
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <ResourceMap distanceRange={distanceRange} />
      </div>
      
      <div className="bg-card rounded-lg border shadow-sm p-4">
        <h3 className="font-medium mb-4">Distance Filter</h3>
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm">Distance: <span className="font-medium">{distanceRange} miles</span></span>
            <Input 
              type="number" 
              value={distanceRange}
              onChange={(e) => onDistanceChange(Number(e.target.value))}
              className="w-16 h-8 text-sm"
              min={1}
              max={50}
            />
          </div>
          <Slider 
            value={[distanceRange]} 
            onValueChange={(value) => onDistanceChange(value[0])}
            max={50}
            step={1}
            className="mb-6"
          />
          <p className="text-xs text-muted-foreground">
            Adjust the slider to find resources within {distanceRange} miles of your location
          </p>
        </div>
      </div>
      
      <PremiumResourcesCard />
      
      <ClickbankAffiliate 
        contextKeywords={['career', 'resources', 'employment']}
        layout="compact"
        className="mb-4"
      />
      
      <div className="bg-card rounded-lg border shadow-sm p-4">
        <h3 className="font-medium mb-3">Resource Types</h3>
        <div className="space-y-2">
          {resourceTypes.map(type => (
            <Button 
              key={type.id}
              variant={selectedTypes.includes(type.id) ? "default" : "outline"} 
              className="w-full justify-start" 
              size="sm"
              onClick={() => onTypeToggle(type.id)}
            >
              {type.name} ({type.count})
            </Button>
          ))}
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
