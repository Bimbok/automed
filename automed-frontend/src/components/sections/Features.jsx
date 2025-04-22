import React from 'react';
import { Card, CardContent } from '../ui/card';

const Features = () => {
  const features = [
    {
      id: 1,
      title: 'AI-Powered Quality Analysis',
      description: 'Leverage advanced AI algorithms to analyze medicine quality parameters with unprecedented accuracy and speed.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 8V4H8" />
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-8" />
          <path d="M9 19h6" />
          <path d="M12 15V9" />
          <path d="M9 12l3 3 3-3" />
        </svg>
      )
    },
    {
      id: 2,
      title: 'Comprehensive Parameter Monitoring',
      description: 'Monitor critical quality parameters including chemical stability, contamination levels, pH, sterility, and more.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 21H3" />
          <path d="M21 9H3" />
          <path d="M8 17V13" />
          <path d="M16 17V13" />
          <path d="M12 17V13" />
          <path d="M12 9V3" />
          <path d="M16 9V3" />
          <path d="M8 9V3" />
        </svg>
      )
    },
    {
      id: 3,
      title: 'Real-time Quality Assessment',
      description: 'Get instant quality assessments with detailed reports and confidence scores for each analysis.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <path d="M12 8v4l3 3" />
        </svg>
      )
    },
    {
      id: 4,
      title: 'Batch Tracking & History',
      description: 'Maintain comprehensive records of all medicine batches with detailed quality analysis history.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
        </svg>
      )
    },
    {
      id: 5,
      title: 'Regulatory Compliance',
      description: 'Ensure compliance with pharmaceutical standards and regulations through automated quality checks.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        </svg>
      )
    },
    {
      id: 6,
      title: 'Data Security & Privacy',
      description: 'Enterprise-grade security with encrypted data storage and secure access controls for sensitive medical information.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      )
    }
  ];

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Advanced Medicine Quality Assurance
          </h2>
          <p className="text-lg text-slate-600">
            Our AI-powered platform provides comprehensive quality analysis tools to ensure 
            pharmaceutical excellence and patient safety.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card 
              key={feature.id} 
              hover={true}
              className="border border-slate-200 transition-all duration-300 hover:border-indigo-200"
            >
              <CardContent className="p-6">
                <div className="rounded-full bg-indigo-50 w-16 h-16 flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;