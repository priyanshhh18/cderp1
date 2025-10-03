"use client";
import React, { useState, useEffect, useCallback } from 'react';
import CareerHeroSlide from './HeaderCarousel1';
import HeaderCarousel3 from "./HeaderCarousel3";
import QuizComponent from "./HeaderCarousel4";
 
// Sample components - replace these with your actual components
const Component1 = () => (
<div>
<CareerHeroSlide/>
</div>
);
 
 
const Component2 = () => (
<div >
<HeaderCarousel3/>
</div>
);
 
const Component3 = ({ onReady }) => (
<div >
<QuizComponent onReady={onReady} />
</div>
);
 
const HeaderCarousel = () => {
  const components = [Component2, Component1,  Component3];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [quizReady, setQuizReady] = useState(false);
 
  // Define custom timing for each slide (in milliseconds)
  const getSlideTiming = (slideIndex) => {
    // 4th slide (index 3) gets 15 seconds, others get 5 seconds
    return slideIndex === 2 ? 10000 : 5000;
  };
 
  // Auto-rotate functionality with custom timing
  useEffect(() => {
    const currentTiming = getSlideTiming(currentSlide);
 
    // Gate auto-rotation for quiz slide until it signals ready
    if (currentSlide === 2 && !quizReady) {
      return; // Do not start interval yet
    }
 
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % components.length);
    }, currentTiming);
 
    return () => clearInterval(interval);
  }, [components.length, currentSlide, quizReady]);
 
  // Reset quiz readiness each time we enter the quiz slide
  useEffect(() => {
    if (currentSlide === 3) {
      setQuizReady(false);
    }
  }, [currentSlide]);
 
  const goToSlide = (index) => {
    setCurrentSlide(index);
  };
 
  const CurrentComponent = components[currentSlide];
 
  return (
<div className="w-full mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      {/* Main carousel container */}
<div className="relative">
        {/* Slide content */}
<div >
          {currentSlide === 3 ? (
<CurrentComponent onReady={() => setQuizReady(true)} />
          ) : (
<CurrentComponent />
          )}
</div>
</div>
 
      {/* Dots indicator */}
<div className="flex justify-center space-x-2 p-4 bg-gray-100">
        {components.map((_, index) => (
<button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              currentSlide === index
                ? 'bg-blue-500 scale-110'
                : 'bg-gray-400 hover:bg-gray-600'
            }`}
          />
        ))}
</div>
 
      {/* Slide counter */}
</div>
  );
};
 
export default HeaderCarousel;