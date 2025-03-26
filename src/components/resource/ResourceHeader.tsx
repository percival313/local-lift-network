
import React from 'react';
import { MapPin } from 'lucide-react';
import Container from '@/components/ui/container';
import PostcodeSearch from '@/components/PostcodeSearch';
import { Button } from '@/components/ui/button';
import { Filter, ArrowUpDown, Search } from 'lucide-react';

interface ResourceHeaderProps {
  postcode: string;
  searchQuery: string;
  onPostcodeSubmit: (code: string) => void;
  onSearchChange: (query: string) => void;
}

const ResourceHeader: React.FC<ResourceHeaderProps> = ({
  postcode,
  searchQuery,
  onPostcodeSubmit,
  onSearchChange,
}) => {
  return (
    <div className="pt-24 pb-8 md:pt-32 md:pb-12 bg-muted/30">
      <Container>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Local Resources</h1>
            <p className="text-muted-foreground">
              Find support services, training programs, and assistance in your area
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="flex items-center gap-2">
              <div className="flex-1">
                <PostcodeSearch 
                  onSubmit={onPostcodeSubmit} 
                  initialValue={postcode} 
                />
              </div>
              <Button variant="outline" size="icon" className="shrink-0">
                <Filter className="h-4 w-4" />
                <span className="sr-only">Filter resources</span>
              </Button>
              <Button variant="outline" size="icon" className="shrink-0">
                <ArrowUpDown className="h-4 w-4" />
                <span className="sr-only">Sort resources</span>
              </Button>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search for resources..."
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-9 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4" />
            <span>Showing resources near <strong>{postcode}</strong></span>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ResourceHeader;
