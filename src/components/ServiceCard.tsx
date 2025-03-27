
import React, { useState } from 'react';
import { MapPin, Clock, ExternalLink, ThumbsUp, ThumbsDown, Bookmark, Share2, StickyNote } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/components/Auth/AuthContext';
import ResourceNotes from './Notes/ResourceNotes';

interface ServiceCardProps {
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

const ServiceCard = ({
  id,
  name,
  type,
  address,
  distance,
  openingHours,
  description,
  lastUpdated,
  upvotes,
  downvotes
}: ServiceCardProps) => {
  const [isSaved, setIsSaved] = useState(false);
  const [localUpvotes, setLocalUpvotes] = useState(upvotes);
  const [localDownvotes, setLocalDownvotes] = useState(downvotes);
  const [userVote, setUserVote] = useState<'up' | 'down' | null>(null);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();

  const handleSave = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to save resources",
        variant: "destructive",
      });
      return;
    }

    setIsSaved(!isSaved);
    toast({
      title: isSaved ? "Resource Removed" : "Resource Saved",
      description: isSaved ? `${name} has been removed from your saved resources` : `${name} has been saved for later`,
    });
  };

  const handleVote = (voteType: 'up' | 'down') => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to vote on resources",
        variant: "destructive",
      });
      return;
    }

    // If user already voted this way, remove their vote
    if (userVote === voteType) {
      if (voteType === 'up') {
        setLocalUpvotes(prev => prev - 1);
      } else {
        setLocalDownvotes(prev => prev - 1);
      }
      setUserVote(null);
    } 
    // If user voted the other way, switch their vote
    else if (userVote !== null) {
      if (voteType === 'up') {
        setLocalUpvotes(prev => prev + 1);
        setLocalDownvotes(prev => prev - 1);
      } else {
        setLocalUpvotes(prev => prev - 1);
        setLocalDownvotes(prev => prev + 1);
      }
      setUserVote(voteType);
    } 
    // If user hasn't voted yet, add their vote
    else {
      if (voteType === 'up') {
        setLocalUpvotes(prev => prev + 1);
      } else {
        setLocalDownvotes(prev => prev + 1);
      }
      setUserVote(voteType);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: name,
        text: `Check out this resource: ${name}`,
        url: window.location.href.split('?')[0] + `/service/${id}`,
      }).then(() => {
        toast({
          title: "Shared Successfully",
          description: "Thank you for sharing this resource",
        });
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support navigator.share
      navigator.clipboard.writeText(window.location.href.split('?')[0] + `/service/${id}`).then(() => {
        toast({
          title: "Link Copied",
          description: "Resource link copied to clipboard",
        });
      });
    }
  };

  const handleOpenNotes = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to add notes and tasks",
        variant: "destructive",
      });
      return;
    }
    setIsNotesOpen(true);
  };

  return (
    <>
      <div className="bg-card rounded-lg border shadow-sm transition-all duration-300 hover:shadow-md overflow-hidden">
        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary/10 text-primary mb-2`}>
                {type}
              </span>
              <h3 className="text-lg font-medium">{name}</h3>
            </div>
            <span className="text-xs text-muted-foreground">{distance}</span>
          </div>
          
          <p className="text-sm text-muted-foreground mb-4">{description}</p>
          
          <div className="space-y-2 mb-4">
            <div className="flex items-start text-sm">
              <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">{address}</span>
            </div>
            <div className="flex items-start text-sm">
              <Clock className="h-4 w-4 text-muted-foreground mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm">{openingHours}</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between pt-3 border-t">
            <div className="flex items-center space-x-3">
              <button 
                className={`flex items-center text-sm ${userVote === 'up' ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => handleVote('up')}
                aria-label="Upvote"
              >
                <ThumbsUp className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs">{localUpvotes}</span>
              </button>
              <button 
                className={`flex items-center text-sm ${userVote === 'down' ? 'text-destructive' : 'text-muted-foreground hover:text-foreground'}`}
                onClick={() => handleVote('down')}
                aria-label="Downvote"
              >
                <ThumbsDown className="h-3.5 w-3.5 mr-1" />
                <span className="text-xs">{localDownvotes}</span>
              </button>
              <span className="text-xs text-muted-foreground">
                Updated {lastUpdated}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <button 
                onClick={handleOpenNotes}
                className="p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Add notes or tasks"
              >
                <StickyNote className="h-4 w-4" />
              </button>
              <button 
                onClick={handleSave}
                className={`p-1 rounded-full transition-colors ${isSaved ? 'text-primary bg-primary/5' : 'text-muted-foreground hover:text-foreground'}`}
                aria-label={isSaved ? "Remove from saved" : "Save for later"}
              >
                <Bookmark className="h-4 w-4" fill={isSaved ? "currentColor" : "none"} />
              </button>
              <button 
                onClick={handleShare}
                className="p-1 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Share this resource"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <Link
                to={`/service/${id}`}
                className="p-1 rounded-full text-primary hover:text-primary/80 transition-colors"
                aria-label="View details"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <ResourceNotes 
        resourceId={id} 
        resourceName={name} 
        isOpen={isNotesOpen} 
        onClose={() => setIsNotesOpen(false)} 
      />
    </>
  );
};

export default ServiceCard;
