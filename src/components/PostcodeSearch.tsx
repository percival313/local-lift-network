
import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PostcodeSearch = () => {
  const [postcode, setPostcode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!postcode.trim()) {
      setError('Please enter a postcode');
      return;
    }
    
    // Basic validation
    const postcodeRegex = /^[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2}$/i;
    if (!postcodeRegex.test(postcode)) {
      setError('Please enter a valid UK postcode');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // This would normally check the postcode validity against an API
    // For demo purposes, we'll just simulate a delay and redirect
    setTimeout(() => {
      setIsLoading(false);
      navigate(`/resources?postcode=${encodeURIComponent(postcode)}`);
    }, 800);
  };

  return (
    <div className="w-full">
      <form 
        onSubmit={handleSearch}
        className="relative flex items-center transition-all duration-300 focus-within:shadow-md"
      >
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Enter your postcode..."
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className={`block w-full rounded-l-md border-0 py-3.5 pl-10 pr-4 text-foreground bg-card shadow-sm ring-1 ring-inset ${error ? 'ring-destructive' : 'ring-input'} focus:ring-2 focus:ring-inset focus:ring-primary focus:outline-none transition-all`}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex items-center justify-center rounded-r-md bg-primary px-4 py-3.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary disabled:opacity-80"
        >
          {isLoading ? (
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
          ) : (
            <>
              Find Resources
              <ArrowRight className="ml-2 h-4 w-4" />
            </>
          )}
        </button>
      </form>
      {error && (
        <p className="mt-2 text-sm text-destructive">{error}</p>
      )}
    </div>
  );
};

export default PostcodeSearch;
