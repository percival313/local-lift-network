
import React from 'react';
import ServiceCard from '@/components/ServiceCard';
import { AdBanner } from '@/components/Monetization/AdBanner';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

interface Service {
  id: string;
  name: string;
  type: string;
  address: string;
  distance: string;
  openingHours: string;
  description: string;
  lastUpdated: string;
  upvotes: number;
  downvotes: number;
}

interface ResourceListProps {
  services: Service[];
  onAddResource: () => void;
}

const ResourceList: React.FC<ResourceListProps> = ({ services, onAddResource }) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 border-b">
          <h2 className="text-lg font-medium">Available Resources</h2>
        </div>
        
        {services.length === 0 ? (
          <div className="p-8 text-center">
            <Alert>
              <AlertTitle>No resources found</AlertTitle>
              <AlertDescription>
                No resources match your search criteria. Try adjusting your filters or search terms.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4 p-4">
            {services.map(service => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        )}
        
        {services.length > 0 && (
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full">
              Load more resources
            </Button>
          </div>
        )}
      </div>
      
      <AdBanner 
        type="inline"
        className="my-6"
      />
      
      <div className="mt-6 bg-primary/5 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-medium">Know of a local resource?</h3>
          <p className="text-sm text-muted-foreground">Help your community by adding it to our database</p>
        </div>
        <Button onClick={onAddResource}>Add a Resource</Button>
      </div>
    </div>
  );
};

export default ResourceList;
