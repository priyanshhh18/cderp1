"use client";
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { AnimatedBeamDemo } from "../magicui/beam";
import Image from 'next/image';
const CareerMentorsComponent = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [animationState, setAnimationState] = useState('stacked'); // 'stacked', 'expanding', 'complete'
  // Initialize from current browser size to avoid initial mobile flash
  const getInitialWindowSize = () => {
    if (typeof window !== 'undefined') {
      return { width: window.innerWidth, height: window.innerHeight };
    }
    // SSR fallback: assume desktop to avoid mobile flash until hydrated
    return { width: 1280, height: 800 };
  };
  const [windowSize, setWindowSize] = useState(getInitialWindowSize);
  const containerRef = useRef(null);
  const animationTimeoutRef = useRef(null);
  const rafRef = useRef(null);

  // Memoized companies data
  const companies = useMemo(() => [
    { 
      name: 'Cisco', 
      mentors: 8, 
      experience: '12+',
      color: '#1e3a8a', // darker blue
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119549/A_czofnz.avif'
    },
    { 
      name: 'Accenture', 
      mentors: 12, 
      experience: '11+',
      color: '#5b21b6', // darker purple
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119549/B_ur486e.avif'
    },
    { 
      name: 'Amdocs', 
      mentors: 6, 
      experience: '13+',
      color: '#1f2937', // darker gray
      logo: 'https://res.cloudinary.com/dubeuisom/image/upload/v1756974571/DOX-148df523_n8rgrn.png'
    },
    { 
      name: 'Meta', 
      mentors: 7, 
      experience: '9+',
      color: '#1d4ed8', // darker blue
      logo: 'https://res.cloudinary.com/dubeuisom/image/upload/v1756883174/CTSH-82a8444b_s0dbpx.png'
    },
    { 
      name: 'Netflix', 
      mentors: 5, 
      experience: '8+',
      color: '#b91c1c', // darker red
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119548/F_ik0hbh.avif'
    },
    { 
      name: 'Tesla', 
      mentors: 4, 
      experience: '14+',
      color: '#7f1d1d', // darker dark red
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119538/G_ea3rjb.avif'
    },
    { 
      name: 'Spotify', 
      mentors: 6, 
      experience: '7+',
      color: '#047857', // darker green
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119538/H_ulxtbz.avif'
    },
    { 
      name: 'Adobe', 
      mentors: 8, 
      experience: '11+',
      color: '#b91c1c', // darker red
      logo: 'https://res.cloudinary.com/dubeuisom/image/upload/v1756883174/TCS_wordmark_2020_coekk1.webp'
    },
    { 
      name: 'Salesforce', 
      mentors: 9, 
      experience: '10+',
      color: '#0369a1', // darker cyan-blue
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119537/J_nek9z0.avif'
    },
    { 
      name: 'Uber', 
      mentors: 5, 
      experience: '8+',
      color: '#111827', // almost black
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119537/K_vfcxtt.avif'
    },
    { 
      name: 'Airbnb', 
      mentors: 7, 
      experience: '9+',
      color: '#be123c', // darker rose
      logo: 'https://res.cloudinary.com/drvug594q/image/upload/v1754119537/L_mq7q48.avif'
    }
  ], []);
  

  // Beam background in use; removed custom particles

  // Optimized throttle function with smoother timing
  const throttle = useCallback((func, limit) => {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }, []);

  // Handle window resize with debouncing
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, 100);
    };

    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // Responsive breakpoints
  const isMobile = windowSize.width < 768;
  const isTablet = windowSize.width >= 768 && windowSize.width < 1024;
  const isDesktop = windowSize.width >= 1024;

  // Animation sequence with cleanup
  useEffect(() => {
    const timer1 = setTimeout(() => {
      setAnimationState('expanding');
    }, 1000);

    const timer2 = setTimeout(() => {
      setAnimationState('complete');
    }, 2500);

    animationTimeoutRef.current = { timer1, timer2 };

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  // Optimized mouse move handler - only for desktop
  const handleMouseMove = useCallback((e) => {
    if (containerRef.current && animationState === 'complete' && isDesktop) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      setMousePosition({
        x: (e.clientX - centerX) / (rect.width / 2),
        y: (e.clientY - centerY) / (rect.height / 2)
      });
    }
  }, [animationState, isDesktop]);

  // Smooth mouse move with optimized RAF
  useEffect(() => {
    const smoothMouseMove = (e) => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      rafRef.current = requestAnimationFrame(() => {
        requestAnimationFrame(() => handleMouseMove(e)); // Double RAF for ultra-smooth animation
      });
    };
    
    window.addEventListener('mousemove', smoothMouseMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', smoothMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [handleMouseMove]);

  // Memoized position calculations - only for tablet and desktop
  const getLogoPosition = useCallback((index, total) => {
    const angle = (index / total) * 2 * Math.PI - Math.PI / 2;
    let radius;
    
    // Responsive radius calculation
    if (isTablet) radius = 150;
    else if (isDesktop) {
      if (windowSize.width < 1280) radius = 180;
      else radius = 200;
    }
    else radius = 120; // fallback
    
    return {
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    };
  }, [isTablet, isDesktop, windowSize.width]);

  // Memoized mouse influence calculation - only for desktop with smoother interpolation
  const getMouseInfluence = useCallback((logoX, logoY) => {
    if (animationState !== 'complete' || !isDesktop) 
      return { x: 0, y: 0, scale: 1 };
    
    const mouseInfluence = 0.08; // Reduced for smoother movement
    const distance = Math.sqrt(
      Math.pow(mousePosition.x * 200 - logoX, 2) + 
      Math.pow(mousePosition.y * 200 - logoY, 2)
    );
    
    const maxDistance = 180; // Increased for smoother falloff
    const influence = Math.max(0, 1 - Math.pow(distance / maxDistance, 1.5)); // Smoother easing curve
    
    return {
      x: mousePosition.x * mouseInfluence * influence * 25, // Reduced movement
      y: mousePosition.y * mouseInfluence * influence * 25,
      scale: 1 + influence * 0.08 // Reduced scale change
    };
  }, [animationState, isDesktop, mousePosition]);

  // Memoized transform calculation
  const getLogoTransform = useCallback((index) => {
    const position = getLogoPosition(index, companies.length);
    const mouseInfluence = getMouseInfluence(position.x, position.y);
    
    switch (animationState) {
      case 'stacked':
        return {
          transform: `translate3d(0px, 0px, 0) scale(0.8)`,
          opacity: 0.5,
          zIndex: companies.length - index
        };
      
      case 'expanding':
        return {
          transform: `translate3d(${position.x}px, ${position.y}px, 0) scale(1)`,
          opacity: 1,
          zIndex: 10,
          transition: `all 1.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)`,
          transitionDelay: `${index * 100}ms`
        };
      
      case 'complete':
        return {
          transform: `translate3d(${position.x + mouseInfluence.x}px, ${position.y + mouseInfluence.y}px, 0) scale(${mouseInfluence.scale})`,
          opacity: 1,
          zIndex: 10,
          transition: isDesktop ? 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
          willChange: 'transform' // Optimize for animations
        };
      
      default:
        return {};
    }
  }, [getLogoPosition, getMouseInfluence, animationState, companies.length, isDesktop]);

  // Memoized size calculations - only for tablet and desktop
  const logoSize = useMemo(() => {
    if (isTablet) return 'w-18 h-18';
    if (isDesktop) return 'w-20 h-20 lg:w-24 lg:h-24';
    return 'w-16 h-16'; // fallback
  }, [isTablet, isDesktop]);

  const centralHubSize = useMemo(() => {
    if (isTablet) return 'w-32 h-28';
    if (isDesktop) return 'w-36 h-32 lg:w-40 lg:h-36';
    return 'w-28 h-24'; // fallback
  }, [isTablet, isDesktop]);

  // Memoized PlacementBadge component
  const PlacementBadge = useMemo(() => (
    <div className="relative group max-w-md mx-auto lg:mx-0 overflow-visible">
      {/* Blue glow effect */}
      <div className="absolute inset-1 sm:inset-0 bg-gradient-to-br from-blue-700 via-blue-500 to-blue-600 rounded-2xl sm:rounded-3xl blur-lg sm:blur-xl opacity-10 sm:opacity-15 group-hover:opacity-20 sm:group-hover:opacity-25 transition-opacity duration-500 will-change-opacity"></div>

      {/* Secondary soft blue glow for depth */}
      <div className="absolute inset-1 sm:inset-0 bg-gradient-to-br from-blue-100 via-blue-200 to-blue-400 rounded-2xl sm:rounded-3xl blur-xl sm:blur-2xl opacity-5 sm:opacity-10 group-hover:opacity-10 sm:group-hover:opacity-15 transition-opacity duration-700 will-change-opacity"></div>

      <div className="relative bg-gradient-to-br from-blue-300 via-blue-500 to-blue-600 rounded-2xl sm:rounded-3xl p-3 sm:p-4 lg:p-6 shadow-2xl border border-white/20 backdrop-blur-sm">
        {/* Inner glow layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-2xl sm:rounded-3xl"></div>

        <div className="relative flex items-center space-x-3 sm:space-x-4 lg:space-x-6">
          <div className="relative flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-white/20 rounded-xl p-1.5 sm:p-2 backdrop-blur-sm">
              <img
                src="https://res.cloudinary.com/drvug594q/image/upload/v1754119537/medal_lyetf6.avif"
                alt="Medal icon"
                className="w-full h-full object-contain filter brightness-110"
                loading="lazy"
              />
            </div>
            <div className="absolute inset-0 bg-white/15 rounded-xl animate-ping opacity-20"></div>
            {/* Sparkle effect */}
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full opacity-80 animate-pulse"></div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-sm sm:text-base lg:text-lg mb-1 drop-shadow-sm">
              Assured Placement Opportunity
            </p>
            <p className="text-blue-100 text-xs sm:text-sm drop-shadow-sm">
              Career Support Program
            </p>
            <div className="mt-2 w-16 h-0.5 bg-white/30 rounded-full"></div>
          </div>
          {/* Blue sparkle badge dot */}
          <div className="absolute top-2 right-2 w-2 h-2 bg-blue-200 rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  ), []);

  // Removed background particles to use beam background

  // Memoized company logo components
  const companyLogos = useMemo(() => 
    companies.map((company, index) => {
      const logoStyle = getLogoTransform(index);
      
      return (
        <div
          key={`${company.name}-${index}`}
          className="absolute cursor-pointer group"
          style={{
            ...logoStyle,
            willChange: 'transform',
            backfaceVisibility: 'hidden',
            perspective: '1000px'
          }}
        >
          {/* Logo Container */}
          <div className="relative flex items-center justify-center">
            {/* Logo Background Circle */}
            <div 
              className={`${logoSize} rounded-full flex items-center justify-center shadow-lg transition-all duration-200 bg-blue-200 group-hover:scale-105 border-2`}
              style={{
                borderColor: `${company.color}40`,
                boxShadow: `0 4px 20px ${company.color}15, 0 2px 10px rgba(0,0,0,0.1)`,
                willChange: 'transform',
                backfaceVisibility: 'hidden'
              }}
            >
              {/* Logo */}
              <div className="relative w-3/4 h-3/4 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image 
                    src={company.logo} 
                    alt={company.name}
                    fill
                    sizes="(max-width: 768px) 40px, 60px"
                    className="object-contain group-hover:scale-105 transition-transform duration-200"
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))',
                      maxWidth: '80%',
                      maxHeight: '80%',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden'
                    }}
                    decoding="async"
                    priority={index < 5} // Prioritize loading first 5 images
                  />
                </div>
              </div>
            </div>

            {/* Glow effect */}
            <div 
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-15 transition-opacity duration-500 blur-xl will-change-opacity"
              style={{
                background: `radial-gradient(circle at center, ${company.color}, transparent 70%)`,
              }}
            ></div>
          </div>
        </div>
      );
    }), [companies, getLogoTransform, logoSize]
  );

  // Memoized connection lines
  const connectionLines = useMemo(() => {
    if (animationState !== 'complete') return null;

    return (
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-15" style={{ zIndex: 1 }}>
        <defs>
          <radialGradient id="connectionGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.3)"/>
            <stop offset="80%" stopColor="rgba(59, 130, 246, 0.1)"/>
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0)"/>
          </radialGradient>
        </defs>
        {companies.map((_, index) => {
          const position = getLogoPosition(index, companies.length);
          return (
            <line
              key={`line-${index}`}
              x1="50%"
              y1="50%"
              x2={`${50 + (position.x / 4)}%`}
              y2={`${50 + (position.y / 4)}%`}
              stroke="url(#connectionGradient)"
              strokeWidth="1"
              opacity="0.4"
            />
          );
        })}
      </svg>
    );
  }, [animationState, companies, getLogoPosition]);

  return (
    <BackgroundBeamsWithCollision className="min-h-[520px] md:min-h-screen relative overflow-visible md:overflow-hidden">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 py-4 sm:py-8 md:py-16 min-h-[520px] md:min-h-[80vh] flex flex-col justify-center">
        
        {/* Mobile Layout */}
        {isMobile && (
          <div className="space-y-3 sm:space-y-4 md:space-y-6 pt-8 pb-8 overflow-visible">
            {/* Main Heading - Mobile */}
            <div className="text-center px-2 mt-8">
              <div className="relative inline-block">
                <h1 className="text-2xl sm:text-3xl font-black leading-tight text-gray-800">
                  <span className="text-gray-800">Secure your </span>
                  <span className="text-blue-600">Dream Career </span>
                  <span className="text-gray-700">with Live Classes</span>
                </h1>
                
                {/* Mobile accent line */}
                <div className="absolute -left-2 sm:-left-4 top-0 bottom-0 w-0.5 sm:w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600 rounded-full">
                  <div className="absolute top-0 left-0 w-full h-2 sm:h-3 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed mt-0 mb-0">
                From <span className="font-bold text-blue-600">Industry Experts</span>
              </p>
            </div>

            {/* AnimatedBeamDemo Section - Mobile */}
            <div className="flex justify-center mt-[-30px]">
              <div className="w-full max-w-lg">
                <AnimatedBeamDemo />
              </div>
            </div>

            {/* Placement Badge - Mobile */}
            <div className="px-4 overflow-visible">
              {PlacementBadge}
            </div>
          </div>
        )}

        {/* Tablet Layout */}
        {isTablet && (
          <div className="h-full flex flex-col justify-center">
            {/* Main Heading - Tablet */}
            <div className="text-center px-4 py-6 flex-shrink-0">
              <div className="relative inline-block">
                <h1 className="text-2xl md:text-4xl font-black leading-tight text-gray-800">
                  <span className="text-gray-800">Secure your </span>
                  <span className="text-blue-600">Dream Career </span>
                  <span className="text-gray-700">with Live Classes</span>
                </h1>
                
                {/* Tablet accent line */}
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600 rounded-full">
                  <div className="absolute top-0 left-0 w-full h-4 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
              </div>
              
              <p className="text-base md:text-lg text-gray-600 leading-relaxed mt-4">
                From <span className="font-bold text-blue-600">Industry Experts</span>
              </p>
            </div>

            {/* Floating Logos Section - Tablet */}
            <div className="flex-1 flex items-center justify-center py-4">
              <div className="relative w-full max-w-2xl" style={{ height: '450px' }} ref={containerRef}>
                
                {/* Central Hub */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
                  <div 
                    className={`${centralHubSize} bg-white/80 backdrop-blur-xl border border-blue-200/30 rounded-3xl flex items-center justify-center shadow-xl transition-all duration-1000 will-change-transform ${
                      animationState === 'stacked' ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
                    }`}
                  >
                    <div className="text-center p-3">
                      <div className="text-gray-800 font-bold text-lg mb-2">
                        Our Mentors
                      </div>
                      <div className="text-blue-600 font-semibold text-base">
                        Come From
                      </div>
                      <div className="mt-2 w-10 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto"></div>
                    </div>
                  </div>
                </div>

                {/* Company Logos */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {companyLogos}
                </div>

                {/* Connection lines */}
                {connectionLines}
              </div>
            </div>

            {/* Placement Badge - Tablet */}
            <div className="px-6 py-4 flex-shrink-0">
              {PlacementBadge}
            </div>
          </div>
        )}

        {/* Desktop Layout */}
        {isDesktop && (
          <div className="h-full grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            
            {/* Left Content Section - Desktop */}
            <div className="space-y-8 lg:pr-12">
              
              {/* Main Heading - Desktop */}
              <div className="space-y-6">
                <div className="relative">
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black leading-tight">
                    <span className="block text-gray-800 mb-3 lg:mb-4">
                      Secure your
                    </span>
                    <span className="block text-blue-600 bg-clip-text mb-3 lg:mb-4">
                      Dream Career
                    </span>
                    <span className="block text-gray-700 text-3xl lg:text-4xl xl:text-5xl">
                      with Live Classes
                    </span>
                  </h1>
                  
                  {/* Accent line */}
                  <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-purple-600 rounded-full">
                    <div className="absolute top-0 left-0 w-full h-6 bg-blue-500 rounded-full animate-pulse"></div>
                  </div>
                </div>
                
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                  From <span className="font-bold text-blue-600">Industry Experts</span>
                </p>
              </div>

              {/* Placement Badge - Desktop */}
              {PlacementBadge}
            </div>

            {/* Right Floating Logos Section - Desktop */}
            <div className="relative flex items-center justify-center w-full" style={{ height: '550px', minHeight: '400px' }} ref={containerRef}>
              
              {/* Central Hub */}
              <div className="relative z-30">
                <div 
                  className={`${centralHubSize} bg-white/80 backdrop-blur-xl border border-blue-200/30 rounded-3xl flex items-center justify-center shadow-xl transition-all duration-1000 will-change-transform ${
                    animationState === 'stacked' ? 'scale-95 opacity-80' : 'scale-100 opacity-100'
                  }`}
                >
                  <div className="text-center p-4">
                    <div className="text-gray-800 font-bold text-xl mb-2">
                      Our Mentors
                    </div>
                    <div className="text-blue-600 font-semibold text-lg">
                      Come From
                    </div>
                    <div className="mt-2 w-12 h-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mx-auto"></div>
                  </div>
                </div>
              </div>

              {/* Company Logos */}
              <div className="absolute inset-0 flex items-center justify-center">
                {companyLogos}
              </div>

              {/* Connection lines - only show when animation is complete and on larger screens */}
              {connectionLines}
            </div>
          </div>
        )}
      </div>
    </BackgroundBeamsWithCollision>
  );
};

export default CareerMentorsComponent;