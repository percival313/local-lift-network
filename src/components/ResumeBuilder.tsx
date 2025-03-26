
import React from 'react';
import { FileText, Lock } from 'lucide-react';

const ResumeBuilder = () => {
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
          <button className="flex-1 py-2.5 px-4 rounded-md bg-secondary hover:bg-secondary/80 transition-colors text-sm font-medium">
            Try Free
          </button>
          <button className="flex-1 py-2.5 px-4 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium">
            Upgrade (£5/month)
          </button>
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
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
          <polyline points="20 6 9 17 4 12" />
        </svg>
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
