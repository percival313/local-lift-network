
import React from 'react';
import Layout from '@/components/Layout';
import Hero from '@/components/Hero';
import Container from '@/components/ui/container';
import ResourceMap from '@/components/ResourceMap';
import ServiceCard from '@/components/ServiceCard';
import ResumeBuilder from '@/components/ResumeBuilder';
import { ArrowRight, ArrowUpRight, BarChart3, Users, Star, Briefcase } from 'lucide-react';

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
  }
];

const Index = () => {
  return (
    <Layout className="bg-background">
      <Hero />
      
      <section className="py-16 md:py-24">
        <Container>
          <div className="text-center max-w-3xl mx-auto mb-16 stagger-children">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
              How LocalLift Helps
            </h2>
            <p className="text-lg text-muted-foreground">
              We connect you with the resources, tools and support you need to navigate challenging times.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 stagger-children">
            <FeatureCard 
              icon={<BarChart3 className="h-6 w-6" />}
              title="Resource Finder"
              description="Find food banks, job centers, and support services based on your postcode"
            />
            <FeatureCard 
              icon={<Users className="h-6 w-6" />}
              title="Community Insights"
              description="Real feedback from community members helps you find the right services"
            />
            <FeatureCard 
              icon={<FileText className="h-6 w-6" />}
              title="Resume Builder"
              description="Create professional resumes with our AI-powered tools to stand out to employers"
            />
            <FeatureCard 
              icon={<Briefcase className="h-6 w-6" />}
              title="Job Connections"
              description="Connect with local employers and training programs to boost your prospects"
            />
          </div>
        </Container>
      </section>
      
      <section className="py-16 bg-muted/30">
        <Container>
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-2/3 lg:w-3/4">
              <div className="bg-card rounded-lg border shadow-sm overflow-hidden h-full">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
                  {services.map(service => (
                    <ServiceCard 
                      key={service.id}
                      {...service}
                    />
                  ))}
                </div>
                
                <div className="p-4 border-t flex justify-center">
                  <button className="inline-flex items-center justify-center text-sm text-primary hover:underline">
                    View all resources
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 lg:w-1/4">
              <div className="space-y-6">
                <ResumeBuilder />
                
                <div className="bg-card rounded-lg border shadow-sm p-5">
                  <div className="flex items-center mb-4">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Star className="h-4 w-4 text-primary" />
                    </div>
                    <h3 className="font-medium">Success Stories</h3>
                  </div>
                  
                  <div className="space-y-3">
                    <p className="text-sm">
                      "LocalLift helped me find a food bank and job center near me when I lost my job. Now I'm back on my feet with a new position."
                    </p>
                    <p className="text-sm font-medium">— Sarah T.</p>
                  </div>
                  
                  <button className="mt-4 inline-flex items-center text-xs text-primary hover:underline">
                    Read more stories
                    <ArrowUpRight className="ml-1 h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
      
      <section className="py-16 md:py-24">
        <Container>
          <div className="bg-primary/5 rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            <div className="md:w-2/3">
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-4">
                Join our community of helpers
              </h2>
              <p className="text-muted-foreground mb-6">
                Know of a local resource that could help others? Submit it to our database and help your community.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition-colors hover:bg-primary/90">
                  Add a Resource
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80">
                  Become a Partner
                </button>
              </div>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <div className="relative w-48 h-48 md:w-full max-w-xs">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-primary/20 animate-pulse-light" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-primary/10 animate-pulse-light animation-delay-500" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                  <Users className="h-16 w-16 text-primary" />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </Layout>
  );
};

const FeatureCard = ({ 
  icon, 
  title, 
  description 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string 
}) => (
  <div className="bg-card rounded-lg border shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:translate-y-[-2px]">
    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
      <div className="text-primary">{icon}</div>
    </div>
    <h3 className="text-lg font-medium mb-2">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
  </div>
);

export default Index;
