
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '@/components/Layout';
import Container from '@/components/ui/container';
import ResourceMap from '@/components/ResourceMap';
import ServiceCard from '@/components/ServiceCard';
import PostcodeSearch from '@/components/PostcodeSearch';
import PremiumResourcesCard from '@/components/Monetization/PremiumResourcesCard';
import { AdBanner } from '@/components/Monetization/AdBanner';
import { Button } from '@/components/ui/button';
import { Filter, MapPin, Search, ArrowUpDown } from 'lucide-react';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/Auth/AuthContext';

// Mock data for services - would come from your API
const services = [
  {
    id: '1',
    name: 'Hackney Food Bank',
    type: 'Food Bank',
    address: '25 Hackney Road, London E2 8GG',
    distance: '0.8 miles away',
    openingHours: 'Mon-Fri: 10am-4pm, Sat: 10am-1pm',
    description: 'Provides emergency food supplies to individuals and families in crisis. Referral may be required.',
    lastUpdated: '2 days ago',
    upvotes: 32,
    downvotes: 2
  },
  {
    id: '2',
    name: 'East London Job Centre Plus',
    type: 'Job Center',
    address: '14-18 Commercial Street, E1 6LP',
    distance: '1.2 miles away',
    openingHours: 'Mon-Fri: 9am-5pm',
    description: 'Government job center offering employment services, benefit claims and career advice.',
    lastUpdated: '1 week ago',
    upvotes: 18,
    downvotes: 5
  },
  {
    id: '3',
    name: 'Digital Skills Training Hub',
    type: 'Training Program',
    address: '36 Bethnal Green Road, E1 6GH',
    distance: '1.5 miles away',
    openingHours: 'Mon-Thu: 9am-7pm, Fri: 9am-5pm',
    description: 'Free digital skills courses for job seekers including web development, design and data analysis.',
    lastUpdated: '3 days ago',
    upvotes: 45,
    downvotes: 1
  },
  {
    id: '4',
    name: 'Tower Hamlets Housing Support',
    type: 'Housing Support',
    address: '45 Whitechapel Road, E1 1DU',
    distance: '1.8 miles away',
    openingHours: 'Mon-Fri: 9am-5pm',
    description: 'Provides housing advice, homelessness prevention services and temporary accommodation assistance.',
    lastUpdated: '5 days ago',
    upvotes: 29,
    downvotes: 3
  },
  {
    id: '5',
    name: 'East End Financial Advice Centre',
    type: 'Financial Aid',
    address: '12 Brick Lane, London E1 6RF',
    distance: '1.3 miles away',
    openingHours: 'Mon, Wed, Fri: 10am-4pm',
    description: 'Free financial advice, debt management support and benefits guidance for local residents.',
    lastUpdated: '1 day ago',
    upvotes: 37,
    downvotes: 2
  },
  {
    id: '6',
    name: 'Bethnal Green Community Health Centre',
    type: 'Healthcare',
    address: '27 Old Ford Road, E2 9PL',
    distance: '1.6 miles away',
    openingHours: 'Mon-Fri: 8am-6:30pm',
    description: 'Provides free healthcare services including mental health support and wellbeing programs.',
    lastUpdated: '4 days ago',
    upvotes: 51,
    downvotes: 4
  }
];

const Resources = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialPostcode = searchParams.get('postcode') || 'E1 6LP';
  
  const [searchQuery, setSearchQuery] = useState('');
  const [postcode, setPostcode] = useState(initialPostcode);
  const [filteredServices, setFilteredServices] = useState(services);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    // When component mounts, set the postcode from URL params
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
    // In a real app, this would trigger a new search for resources
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
                    onSubmit={handlePostcodeSubmit} 
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
                  onChange={(e) => handleSearch(e.target.value)}
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
      
      <section className="py-8">
        <Container>
          <AdBanner 
            position="top"
            format="banner"
            className="mb-8 hidden md:block"
          />
          
          <div className="grid gap-8 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-medium">Available Resources</h2>
                </div>
                
                {filteredServices.length === 0 ? (
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
                    {filteredServices.map(service => (
                      <ServiceCard key={service.id} {...service} />
                    ))}
                  </div>
                )}
                
                {filteredServices.length > 0 && (
                  <div className="p-4 border-t">
                    <Button variant="outline" className="w-full">
                      Load more resources
                    </Button>
                  </div>
                )}
              </div>
              
              <AdBanner 
                position="middle"
                format="rectangle"
                className="my-6"
              />
              
              <div className="mt-6 bg-primary/5 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h3 className="font-medium">Know of a local resource?</h3>
                  <p className="text-sm text-muted-foreground">Help your community by adding it to our database</p>
                </div>
                <Button onClick={handleAddResource}>Add a Resource</Button>
              </div>
            </div>
            
            <div>
              <div className="sticky top-24 space-y-6">
                <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
                  <ResourceMap />
                </div>
                
                <PremiumResourcesCard />
                
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
            </div>
          </div>
          
          <AdBanner 
            position="bottom"
            format="leaderboard"
            className="mt-8"
          />
        </Container>
      </section>
    </Layout>
  );
};

export default Resources;
