"use client";
import React, { useState, useEffect, memo } from 'react';
import LogoCarousel from './LogoCarousel';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

// Memoized company logo component
const CompanyLogos = memo(() => (
  <div className="mt-6 sm:mt-8 flex justify-center">
    <div className="bg-white rounded-lg shadow-md p-2 sm:p-3 md:p-4 max-w-full overflow-hidden">
      <div className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-6 lg:space-x-8">
        {/* Company Logo Placeholders */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-600 rounded-full"></div>
          <span className="text-blue-600 font-bold text-xs sm:text-sm hidden sm:inline">cognizant</span>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-red-500 rounded-full"></div>
          <span className="text-red-500 font-bold text-xs sm:text-sm hidden sm:inline">TCS</span>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-blue-700 rounded-full"></div>
          <span className="text-blue-700 font-bold text-xs sm:text-sm hidden sm:inline">Infosys</span>
        </div>
        <div className="flex items-center space-x-1 sm:space-x-2">
          <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-red-600 rounded-full"></div>
          <span className="text-red-600 font-bold text-xs sm:text-sm hidden sm:inline">ZenSar</span>
        </div>
      </div>
    </div>
  </div>
));

CompanyLogos.displayName = "CompanyLogos";

const CareerHeroSlide = ({ onOpenForm }) => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleButtonClick = () => {
    if (onOpenForm) onOpenForm();
  };

  return (
    <BackgroundBeamsWithCollision className="min-h-[520px] md:min-h-screen relative overflow-hidden">
      
      {/* Main Container */}
      <div className="container mx-auto px-4 sm:px-2 md:px-8 lg:px-12 py-4 sm:py-8 md:py-16 min-h-[520px] md:min-h-[80vh] flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 sm:gap-4 md:gap-12 lg:gap-20 items-center md:min-h-[80vh]">
          
          {/* Left Content */}
          <div className={`space-y-3 sm:space-y-4 md:space-y-6 transition-all duration-1000 ease-\[cubic-bezier\(0.4\,0\,0.2\,1\)\] ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'} order-1`}>
            
            {/* Main Heading */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl xl:text-7xl font-bold leading-tight text-gray-900">
              <span className="block sm:inline">
                Unlock your{" "}
                <span className="text-blue-500 relative inline-block">
                  Career
                  <span className="absolute -bottom-1 sm:-bottom-2 left-0 w-full h-0.5 sm:h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full transform scale-x-0 animate-[scaleX_1s_ease-out_0.5s_forwards]"></span>
                </span>
              </span>{" "}
              <span className="block sm:inline">potential</span>
            </h1>

            {/* Subheading */}
            <div className="flex items-center space-x-1 sm:space-x-2 flex-wrap">
              <span className="text-blue-600 font-bold text-sm sm:text-base md:text-lg lg:text-xl">No.1 Training &</span>
              <span className="text-gray-900 font-normal text-sm sm:text-base md:text-lg lg:text-xl">Placement Center</span>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm sm:text-base lg:text-lg leading-relaxed max-w-full sm:max-w-lg justify">
              For more than 10 years, we&apos;ve been passionate about providing engaging, 
              instructor - led training that helps professionals around the world grow and succeed.
            </p>

            {/* Trust Badge */}
            <p className="text-gray-600 text-xs sm:text-sm">
              Est. 2013 Trusted by{' '}
              <span className="font-bold text-blue-600">5000+</span> Students
            </p>

            {/* CTA Button */}
            <div className="pt-1 sm:pt-2 md:pt-4">
              <button 
                onClick={handleButtonClick}
                className="group relative bg-blue-600 text-white px-4 sm:px-6 md:px-8 py-2 sm:py-3 md:py-4 rounded-lg font-semibold text-sm sm:text-base md:text-lg transition-all duration-300 hover:scale-105 sm:hover:scale-110 hover:shadow-2xl hover:-translate-y-1 overflow-hidden w-full sm:w-auto"
              >
                {/* Animated background layers */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-600 to-blue-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute inset-0 bg-gradient-to-45deg from-blue-300/20 to-purple-500/20 scale-0 group-hover:scale-125 transition-transform duration-500 rounded-lg"></div>
                
                {/* Floating particles effect */}
                <div className="absolute top-2 left-4 w-1 h-1 bg-white/60 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-100"></div>
                <div className="absolute top-3 right-6 w-1 h-1 bg-blue-200/80 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-200"></div>
                <div className="absolute bottom-3 left-6 w-1 h-1 bg-white/40 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-75"></div>
                <div className="absolute bottom-2 right-4 w-1 h-1 bg-blue-100/70 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-bounce transition-all duration-300 delay-150"></div>
                
                {/* Ripple effect */}
                <div className="absolute inset-0 bg-white/10 rounded-lg scale-0 group-hover:scale-150 opacity-100 group-hover:opacity-0 transition-all duration-700"></div>
                
                {/* Border animation */}
                <div className="absolute inset-0 rounded-lg border-2 border-transparent group-hover:border-blue-300/50 transition-all duration-300"></div>
                
                {/* Button text with glow */}
                <span className="relative z-10 group-hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300">
                  Free Consultation
                </span>
              </button>
            </div>

            {/* Company Logos */}
            <LogoCarousel columnCount={4} />

          </div>

          {/* Right Side - 3D Logo */}
          <div className={`hidden md:flex justify-center md:justify-end transition-all duration-1000 ease-\[cubic-bezier\(0.4\,0\,0.2\,1\)\] delay-300 ${isLoaded ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'} order-2 mb-6 md:mb-0`}>
            <div className="relative group cursor-pointer">
              
              {/* Floating Animation Wrapper */}
              <div className="animate-float">
                {/* Main Logo Container */}
                <div className="relative w-48 h-48 sm:w-60 sm:h-60 md:w-72 md:h-72 lg:w-80 lg:h-80 xl:w-96 xl:h-96 transform transition-all duration-500 group-hover:scale-105">
                  
                  {/* 3D Logo Placeholder */}
                  <div className="relative w-full h-full">
                    {/* Replaced placeholder with image */}
                  <img
                    src="https://res.cloudinary.com/dubeuisom/image/upload/v1756890589/3d-logo_1_qwvz8y.avif"
                    alt="3D Logo"
                    className="w-full h-full object-contain rounded-xl shadow-2xl"
                  />
                    
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Floating Action Buttons removed as requested */}
      
      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg); 
          }
          50% { 
            transform: translateY(-15px) rotate(2deg); 
          }
        }
        
        @keyframes scaleX {
          from { transform: scaleX(0); }
          to { transform: scaleX(1); }
        }
        
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
        
        @media (max-width: 768px) {
          .animate-float {
            animation: float 3s ease-in-out infinite;
          }
        }
        
        @media (max-width: 640px) {
          .animate-float {
            animation: float 2.5s ease-in-out infinite;
          }
        }
      `}</style>

    </BackgroundBeamsWithCollision>
  );
};

export default CareerHeroSlide;