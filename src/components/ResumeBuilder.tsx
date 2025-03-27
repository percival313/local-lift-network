
import React from 'react';
import { FileText, Lock, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { ClickbankAffiliate } from '@/components/Monetization/ClickbankAffiliate';

const ResumeBuilder = () => {
  const navigate = useNavigate();
  
  const handleTryFree = () => {
    navigate('/resume');
  };
  
  const handleUpgrade = () => {
    // This would typically open a premium modal
    navigate('/resume?showUpgrade=true');
  };

  return (
    <div className="bg-card rounded-lg border shadow-sm overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">AI Resume Builder</h3>
              <p className="text-sm text-muted-foreground">Create professional resumes in minutes</p>
            </div>
          </div>
          
          <div className="rounded-full px-3 py-1 text-xs font-medium bg-primary/10 text-primary">
            Free Preview
          </div>
        </div>
        
        <div className="space-y-4 mb-6">
          <FeatureItem 
            title="Personalized Resume Templates" 
            description="Choose from multiple professionally designed templates"
            isLocked={false} 
          />
          <FeatureItem 
            title="AI-Powered Content Suggestions" 
            description="Get help writing compelling descriptions and achievements"
            isLocked={false} 
          />
          <FeatureItem 
            title="Keyword Optimization" 
            description="Automatically match your resume to job descriptions"
            isLocked={true} 
          />
          <FeatureItem 
            title="Unlimited Downloads" 
            description="Download in multiple formats with no monthly limits"
            isLocked={true} 
          />
        </div>
        
        <div className="flex items-center justify-between gap-4">
          <Button 
            variant="secondary"
            className="flex-1" 
            onClick={handleTryFree}
          >
            Try Free
          </Button>
          <Button 
            variant="default"
            className="flex-1" 
            onClick={handleUpgrade}
          >
            Upgrade (£5/month)
          </Button>
        </div>
        
        <div className="mt-6 pt-6 border-t">
          <ClickbankAffiliate 
            contextKeywords={['resume', 'career', 'employment']}
            layout="list"
            maxProducts={1}
          />
        </div>
      </div>
    </div>
  );
};

const FeatureItem = ({ 
  title, 
  description, 
  isLocked 
}: { 
  title: string; 
  description: string; 
  isLocked: boolean 
}) => (
  <div className="flex items-start">
    <div className={`h-5 w-5 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
      isLocked ? 'bg-muted' : 'bg-primary/20'
    }`}>
      {isLocked ? (
        <Lock className="h-3 w-3 text-muted-foreground" />
      ) : (
        <Check className="h-3 w-3 text-primary" />
      )}
    </div>
    <div>
      <h4 className={`text-sm font-medium ${isLocked ? 'text-muted-foreground' : ''}`}>
        {title}
      </h4>
      <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
    </div>
  </div>
);

export default ResumeBuilder;
