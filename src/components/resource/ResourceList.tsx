
import React, { useState } from 'react';
import ServiceCard from '@/components/ServiceCard';
import { AdBanner } from '@/components/Monetization/AdBanner';
import { ClickbankAffiliate } from '@/components/Monetization/ClickbankAffiliate';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Flag, PlusCircle, X, AlertCircle, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  const [isReportFormOpen, setIsReportFormOpen] = useState(false);
  const [reportForm, setReportForm] = useState({
    resourceName: '',
    issue: '',
    suggestion: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const { toast } = useToast();

  const handleReportSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      toast({
        title: "Report Submitted",
        description: "Thank you for helping us improve our resource listings",
      });
      
      // Reset form after 2 seconds
      setTimeout(() => {
        setIsReportFormOpen(false);
        setSubmitSuccess(false);
        setReportForm({
          resourceName: '',
          issue: '',
          suggestion: '',
          email: ''
        });
      }, 2000);
    }, 1500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReportForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="lg:col-span-2">
      <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">Available Resources</h2>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setIsReportFormOpen(!isReportFormOpen)}
            className="text-muted-foreground"
          >
            <Flag className="h-4 w-4 mr-1.5" />
            Report Inaccuracy
          </Button>
        </div>
        
        {isReportFormOpen && (
          <div className="border-b p-4 bg-muted/30 animate-in fade-in">
            {submitSuccess ? (
              <div className="flex flex-col items-center justify-center p-4 text-center">
                <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  <Check className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-1">Thank You!</h3>
                <p className="text-muted-foreground text-sm mb-4">Your report has been submitted successfully.</p>
              </div>
            ) : (
              <form onSubmit={handleReportSubmit} className="space-y-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Report an Inaccurate Resource</h3>
                  <Button variant="ghost" size="sm" onClick={() => setIsReportFormOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid gap-3">
                  <div>
                    <label htmlFor="resourceName" className="block text-sm font-medium mb-1">Resource Name</label>
                    <Input 
                      id="resourceName"
                      name="resourceName"
                      value={reportForm.resourceName}
                      onChange={handleInputChange}
                      placeholder="Name of the resource with inaccurate information"
                      required
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="issue" className="block text-sm font-medium mb-1">What's Incorrect?</label>
                    <Textarea 
                      id="issue"
                      name="issue"
                      value={reportForm.issue}
                      onChange={handleInputChange}
                      placeholder="Please describe what information is incorrect"
                      required
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="suggestion" className="block text-sm font-medium mb-1">Suggested Correction</label>
                    <Textarea 
                      id="suggestion"
                      name="suggestion"
                      value={reportForm.suggestion}
                      onChange={handleInputChange}
                      placeholder="Please provide the correct information if you know it"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-1">Your Email (optional)</label>
                    <Input 
                      id="email"
                      name="email"
                      type="email"
                      value={reportForm.email}
                      onChange={handleInputChange}
                      placeholder="We'll contact you if we need more information"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsReportFormOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
                        Submitting...
                      </>
                    ) : (
                      'Submit Report'
                    )}
                  </Button>
                </div>
              </form>
            )}
          </div>
        )}
        
        {services.length === 0 ? (
          <div className="p-8 text-center">
            <Alert>
              <AlertCircle className="h-4 w-4 mr-2" />
              <AlertTitle>No resources found</AlertTitle>
              <AlertDescription>
                No resources match your search criteria. Try adjusting your filters or search terms.
              </AlertDescription>
            </Alert>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 gap-4 p-4">
              {services.slice(0, 4).map(service => (
                <ServiceCard key={service.id} {...service} />
              ))}
            </div>
            
            {services.length > 4 && (
              <>
                <AdBanner 
                  type="inline"
                  className="mx-4"
                />
                
                <div className="grid md:grid-cols-2 gap-4 p-4">
                  {services.slice(4).map(service => (
                    <ServiceCard key={service.id} {...service} />
                  ))}
                </div>
              </>
            )}
          </>
        )}
        
        {services.length > 0 && (
          <div className="p-4 border-t">
            <Button variant="outline" className="w-full">
              Load more resources
            </Button>
          </div>
        )}
      </div>
      
      <div className="mt-6">
        <ClickbankAffiliate 
          contextKeywords={['career', 'employment', 'training']}
          layout="list"
          maxProducts={1}
          className="bg-background rounded-lg border shadow-sm mb-6 p-4"
        />
      </div>
      
      <div className="mt-6 bg-primary/5 rounded-lg p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <h3 className="font-medium">Know of a local resource?</h3>
          <p className="text-sm text-muted-foreground">Help your community by adding it to our database</p>
        </div>
        <Button onClick={onAddResource} className="sm:flex-shrink-0">
          <PlusCircle className="h-4 w-4 mr-1.5" />
          Add a Resource
        </Button>
      </div>
    </div>
  );
};

export default ResourceList;
