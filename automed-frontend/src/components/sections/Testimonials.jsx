import React, { useState, useEffect, useRef } from 'react';
import { Card } from '../ui/card';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'Dr. Sarah Johnson',
      role: 'Chief Quality Officer, PharmaCare Inc.',
      content: 'AutoMed has revolutionized our quality control process. The AI-powered analysis provides unprecedented accuracy in detecting quality issues. We\'ve seen a 40% reduction in quality-related incidents since implementation.'
    },
    {
      id: 2,
      name: 'Dr. David Chen',
      role: 'Research Director, MedTech Solutions',
      content: 'The comprehensive parameter monitoring system has transformed our quality assurance workflow. Real-time analysis and detailed reports have significantly improved our batch quality control process.'
    },
    {
      id: 3,
      name: 'Dr. Emily Rodriguez',
      role: 'Quality Assurance Manager, Global Pharmaceuticals',
      content: 'AutoMed\'s AI analysis has been instrumental in maintaining our high quality standards. The system\'s ability to detect subtle quality variations has helped us prevent potential issues before they affect our products.'
    },
    {
      id: 4,
      name: 'Michael Taylor',
      role: 'Production Manager, HealthCare Labs',
      content: 'The automated quality checks have streamlined our production process while ensuring compliance with pharmaceutical standards. The detailed analysis reports have become essential for our quality documentation.'
    },
    {
      id: 5,
      name: 'Dr. Sophia Williams',
      role: 'Quality Control Specialist, BioPharma Solutions',
      content: 'AutoMed\'s precision in analyzing medicine quality parameters is exceptional. The system has helped us maintain consistent quality across all our production batches while reducing testing time significantly.'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = useRef(null);

  // Auto-rotate testimonials
  useEffect(() => {
    if (!isDragging) {
      const interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
      }, 6000);
      
      return () => clearInterval(interval);
    }
  }, [testimonials.length, isDragging]);

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  // Mouse drag functionality
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(activeIndex);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) / sliderRef.current.offsetWidth;
    const newIndex = Math.round(scrollLeft - walk);
    
    if (newIndex >= 0 && newIndex < testimonials.length) {
      setActiveIndex(newIndex);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-b from-indigo-900 to-slate-900 text-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Trusted by Pharmaceutical Leaders
          </h2>
          <p className="text-lg text-indigo-200">
            See how leading pharmaceutical companies are transforming their quality assurance with our AI-powered platform.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <div 
            ref={sliderRef}
            className="overflow-hidden cursor-grab"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          >
            <div 
              className="flex transition-transform duration-500 ease-in-out" 
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-slate-800 border-slate-700 p-8 backdrop-blur-sm bg-opacity-70 shadow-xl">
                    <div className="flex flex-col items-center text-center">
                      <div className="text-2xl text-indigo-300 mb-4">
                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor" className="inline-block mb-1">
                          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                        </svg>
                      </div>
                      <p className="text-slate-300 mb-6">{testimonial.content}</p>
                      <h4 className="font-semibold text-white text-lg">{testimonial.name}</h4>
                      <p className="text-indigo-300 text-sm">{testimonial.role}</p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation arrows */}
          <button 
            className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-indigo-600 rounded-full p-2 text-black opacity-75 hover:opacity-100 transition-opacity"
            onClick={() => setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))}
            aria-label="Previous testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button 
            className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-indigo-600 rounded-full p-2 text-black opacity-75 hover:opacity-100 transition-opacity"
            onClick={() => setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1))}
            aria-label="Next testimonial"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>

          <div className="flex justify-center mt-8 space-x-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => handleDotClick(index)}
                className={`h-3 w-3 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? 'bg-indigo-400' : 'bg-slate-600'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;