
import React from 'react';
import PostcodeSearch from './PostcodeSearch';
import Container from './ui/container';

const Hero = () => {
  return (
    <div className="relative overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background to-background/60 z-0" />
      
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03] pattern-grid-lg z-0" />
      
      {/* Floating elements */}
      <div className="absolute hidden lg:block w-64 h-64 rounded-full bg-primary/10 -top-10 -right-10 animate-float z-0" />
      <div className="absolute hidden lg:block w-48 h-48 rounded-full bg-primary/5 bottom-20 -left-10 animate-float animation-delay-1000 z-0" />
      
      <Container className="relative z-10 pt-16 pb-16 md:pt-24 md:pb-20 lg:pt-32 lg:pb-24">
        <div className="flex flex-col items-center text-center max-w-4xl mx-auto stagger-children">
          <span className="inline-flex items-center rounded-full px-3 py-1 text-sm font-medium bg-primary/10 text-primary mb-6">
            Local resources for challenging times
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6">
            Find local support services <span className="text-primary">when you need them most</span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl">
            LocalLift connects you with food banks, job centers, training programs and other 
            resources near you - plus tools to help you get back on your feet.
          </p>
          
          <div className="w-full max-w-xl">
            <PostcodeSearch />
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 w-full max-w-3xl">
            <StatItem count="1,200+" label="Local Resources" />
            <StatItem count="96%" label="User Satisfaction" />
            <StatItem count="250+" label="Communities" />
            <StatItem count="15K+" label="People Helped" />
          </div>
        </div>
      </Container>
    </div>
  );
};

const StatItem = ({ count, label }: { count: string; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-2xl md:text-3xl font-bold text-primary mb-1">{count}</span>
    <span className="text-sm text-muted-foreground">{label}</span>
  </div>
);

export default Hero;
