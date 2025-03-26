
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
  
  const [searchQuery, setSearchQuery] = useState('');
  const [postcode, setPostcode] = useState(initialPostcode);
  const [filteredServices, setFilteredServices] = useState(services);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    setPostcode(initialPostcode);
  }, [initialPostcode]);
  
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query) {
      setFilteredServices(services);
      return;
    }
    
    const filtered = services.filter(service => 
      service.name.toLowerCase().includes(query.toLowerCase()) ||
      service.description.toLowerCase().includes(query.toLowerCase()) ||
      service.type.toLowerCase().includes(query.toLowerCase())
    );
    
    setFilteredServices(filtered);
  };
  
  const handlePostcodeSubmit = (code: string) => {
    setPostcode(code);
    setSearchParams({ postcode: code });
    toast({
      title: "Postcode Updated",
      description: `Showing resources near ${code}`,
    });
    console.log(`Searching for resources near ${code}`);
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
              <ResourceSidebar />
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
