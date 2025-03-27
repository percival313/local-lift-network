
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import Container from '@/components/ui/container';
import { AdBanner } from '@/components/Monetization/AdBanner';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/Auth/AuthContext';
import { services } from '@/data/resourcesData';
import ResourceHeader from '@/components/resource/ResourceHeader';
import ResourceList from '@/components/resource/ResourceList';
import ResourceSidebar from '@/components/resource/ResourceSidebar';

const Resources = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPostcode = searchParams.get('postcode') || 'E1 6LP';
  const initialDistance = searchParams.get('distance') ? parseInt(searchParams.get('distance') || '5') : 5;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [postcode, setPostcode] = useState(initialPostcode);
  const [distanceRange, setDistanceRange] = useState(initialDistance);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [filteredServices, setFilteredServices] = useState(services);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    setPostcode(initialPostcode);
  }, [initialPostcode]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    applyFilters(query, selectedTypes, distanceRange);
  };
  
  const handlePostcodeSubmit = (code: string) => {
    setPostcode(code);
    setSearchParams(params => {
      params.set('postcode', code);
      return params;
    });
    toast({
      title: "Postcode Updated",
      description: `Showing resources near ${code}`,
    });
    applyFilters(searchQuery, selectedTypes, distanceRange);
  };

  const handleDistanceChange = (distance: number) => {
    setDistanceRange(distance);
    setSearchParams(params => {
      params.set('distance', distance.toString());
      return params;
    });
    applyFilters(searchQuery, selectedTypes, distance);
  };

  const handleTypeToggle = (type: string) => {
    const updated = selectedTypes.includes(type)
      ? selectedTypes.filter(t => t !== type)
      : [...selectedTypes, type];
    
    setSelectedTypes(updated);
    applyFilters(searchQuery, updated, distanceRange);
  };

  const applyFilters = (query: string, types: string[], distance: number) => {
    // Start with all services
    let filtered = services;
    
    // Apply search query filter
    if (query) {
      filtered = filtered.filter(service => 
        service.name.toLowerCase().includes(query.toLowerCase()) ||
        service.description.toLowerCase().includes(query.toLowerCase()) ||
        service.type.toLowerCase().includes(query.toLowerCase())
      );
    }
    
    // Apply type filter
    if (types.length > 0) {
      filtered = filtered.filter(service => 
        types.some(type => service.type.toLowerCase().includes(type.toLowerCase()))
      );
    }
    
    // In a real app, we would apply distance filtering here
    // For now, we'll simulate it by showing fewer resources as distance decreases
    if (distance < 10) {
      filtered = filtered.filter((_, index) => index < filtered.length * (distance / 10));
    }
    
    setFilteredServices(filtered);
    
    toast({
      title: "Filters Applied",
      description: `Showing ${filtered.length} resources within ${distance} miles`,
      variant: filtered.length === 0 ? "destructive" : "default",
    });
  };

  const handleAddResource = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to add resources",
        variant: "destructive",
      });
      return;
    }
    
    toast({
      title: "Add Resource",
      description: "Coming soon! We're working on this feature.",
    });
  };

  return (
    <Layout className="bg-background">
      <ResourceHeader
        postcode={postcode}
        searchQuery={searchQuery}
        onPostcodeSubmit={handlePostcodeSubmit}
        onSearchChange={handleSearch}
      />
      
      <section className="py-8">
        <Container>
          <AdBanner 
            type="banner"
            className="mb-8 hidden md:block"
          />
          
          <div className="grid gap-8 lg:grid-cols-3">
            <ResourceList 
              services={filteredServices} 
              onAddResource={handleAddResource} 
            />
            
            <div>
              <ResourceSidebar 
                distanceRange={distanceRange}
                onDistanceChange={handleDistanceChange}
                selectedTypes={selectedTypes}
                onTypeToggle={handleTypeToggle}
              />
            </div>
          </div>
          
          <AdBanner 
            type="sidebar"
            className="mt-8"
          />
        </Container>
      </section>
    </Layout>
  );
};

export default Resources;
