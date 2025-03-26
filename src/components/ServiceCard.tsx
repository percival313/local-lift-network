
import React from 'react';
import { MapPin, Clock, ExternalLink, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Link } from 'react-router-dom';

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
  return (
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
            <button className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ThumbsUp className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">{upvotes}</span>
            </button>
            <button className="flex items-center text-sm text-muted-foreground hover:text-foreground">
              <ThumbsDown className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">{downvotes}</span>
            </button>
            <span className="text-xs text-muted-foreground">
              Updated {lastUpdated}
            </span>
          </div>
          
          <Link
            to={`/service/${id}`}
            className="inline-flex items-center text-xs text-primary hover:underline"
          >
            View details
            <ExternalLink className="h-3 w-3 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
