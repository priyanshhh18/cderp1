"use client";
import React, { useState, useEffect } from "react";

const BackgroundOnly = () => {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  // Handle video load event
  const handleVideoLoad = () => {
    setVideoLoaded(true);
    // Small delay to ensure smooth transition
    setTimeout(() => {
      setShowContent(true);
    }, 200);
  };

  // Fallback timeout in case video doesn't load
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (!videoLoaded) {
        setVideoLoaded(true);
        setShowContent(true);
      }
    }, 3000); // 3 second fallback

    return () => clearTimeout(fallbackTimer);
  }, [videoLoaded]);

  return (
    <div className="min-h-[700px] pt-50 pb-50 bg-gradient-to-br from-gray-50 to-gray-100 relative overflow-hidden flex items-start justify-center">
      {/* Loading overlay */}
      {!showContent && (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 z-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-600 mx-auto mb-4"></div>
            <p className="text-gray-600 font-medium">Loading...</p>
          </div>
        </div>
      )}

      {/* CSS Toran Banner - Only show when content is ready */}
      <div 
        className={`transition-opacity duration-500 ${showContent ? 'opacity-100' : 'opacity-0'}`}
        style={{ position: 'absolute', top: 0, left: 0, zIndex: 20, width: '100vw', maxWidth: '600px', height: 'auto', aspectRatio: '600/320', pointerEvents: 'none' }}
      >
        <svg width="100%" height="100%" viewBox="0 0 600 320" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" style={{ display: 'block', overflow: 'visible' }}>
          <defs>
            <style>
              {`
                .fairy-bulb {
                  animation: fairyOnOff 1.2s infinite alternate;
                }
                @keyframes fairyOnOff {
                  0% { opacity: 1; }
                  50% { opacity: 0.3; }
                  100% { opacity: 1; }
                }
              `}
            </style>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          {/* First arc - top half-curve, right end joins top right corner */}
          <path d="M 0 30 Q 300 120 600 0" stroke="#222" strokeWidth="3" fill="none" />
          {/* Fairy lights for first arc (glowing, animated, on flag) */}
          {(() => {
            const bulbs = [];
            for (let i = 0; i < 15; i++) {
              const t = (i + 0.5) / 15;
              // Match flag base coordinates
              const x = (1-t)*(1-t)*0 + 2*(1-t)*t*300 + t*t*600;
              const y = (1-t)*(1-t)*30 + 2*(1-t)*t*120 + t*t*0;
              const baseOffset = -2;
              bulbs.push(
                <circle key={'fa'+i} cx={x} cy={y+baseOffset} r={5} fill="#fffbe6" className="fairy-bulb" style={{ animationDelay: `${(i%2)*0.6}s` }} />
              );
            }
            return bulbs;
          })()}
          {/* Second arc - middle half-curve, right end joins same top right point */}
          <path d="M 0 130 Q 300 220 600 0" stroke="#222" strokeWidth="3" fill="none" />
          {/* Fairy lights for second arc (glowing, animated, on flag) */}
          {(() => {
            const bulbs = [];
            for (let i = 0; i < 16; i++) {
              const t = (i + 0.5) / 16;
              const x = (1-t)*(1-t)*0 + 2*(1-t)*t*300 + t*t*600;
              const y = (1-t)*(1-t)*130 + 2*(1-t)*t*220 + t*t*0;
              const baseOffset = (i === 15) ? -4 : -2;
              bulbs.push(
                <circle key={'fb'+i} cx={x} cy={y+baseOffset} r={5} fill="#fffbe6" className="fairy-bulb" style={{ animationDelay: `${(i%2)*0.6}s` }} />
              );
            }
            return bulbs;
          })()}
          {/* Third arc - bottom half-curve, right end joins same top right point */}
          <path d="M 0 230 Q 300 320 600 0" stroke="#222" strokeWidth="3" fill="none" />
          {/* Fairy lights for third arc (glowing, animated, on flag) */}
          {(() => {
            const bulbs = [];
            for (let i = 0; i < 17; i++) {
              const t = (i + 0.5) / 17;
              const x = (1-t)*(1-t)*0 + 2*(1-t)*t*300 + t*t*600;
              const y = (1-t)*(1-t)*230 + 2*(1-t)*t*320 + t*t*0;
              const baseOffset = (i === 16) ? -4 : -2;
              bulbs.push(
                <circle key={'fc'+i} cx={x} cy={y+baseOffset} r={5} fill="#fffbe6" className="fairy-bulb" style={{ animationDelay: `${(i%2)*0.6}s` }} />
              );
            }
            return bulbs;
          })()}
          {/* Triangles for first arc */}
          {(() => {
            const colors = ['#FFD700','#FF0000','#228B22','#FFD700','#800080','#FF9800'];
            const triangles = [];
            for (let i = 0; i < 15; i++) {
              const t = (i + 0.5) / 15;
              const x = (1-t)*(1-t)*0 + 2*(1-t)*t*300 + t*t*600;
              const y = (1-t)*(1-t)*30 + 2*(1-t)*t*120 + t*t*0;
              const baseOffset = -2;
              triangles.push(
                <polygon key={'a'+i} points={`${x-18},${y+baseOffset} ${x+18},${y+baseOffset} ${x},${y+38}`} fill={colors[i%colors.length]} />
              );
            }
            return triangles;
          })()}
          {/* Triangles for second arc */}
          {(() => {
            const colors = ['#FFD700','#FF0000','#228B22','#FFD700','#800080','#FF9800'];
            const triangles = [];
            for (let i = 0; i < 16; i++) {
              const t = (i + 0.5) / 16;
              const x = (1-t)*(1-t)*0 + 2*(1-t)*t*300 + t*t*600;
              const y = (1-t)*(1-t)*130 + 2*(1-t)*t*220 + t*t*0;
              const baseOffset = (i === 15) ? -4 : -2;
              triangles.push(
                <polygon key={'b'+i} points={`${x-18},${y+baseOffset} ${x+18},${y+baseOffset} ${x},${y+38}`} fill={colors[i%colors.length]} />
              );
            }
            return triangles;
          })()}
          {/* Triangles for third arc */}
          {(() => {
            const colors = ['#FFD700','#FF0000','#228B22','#FFD700','#800080','#FF9800'];
            const triangles = [];
            for (let i = 0; i < 17; i++) {
              const t = (i + 0.5) / 17;
              const x = (1-t)*(1-t)*0 + 2*(1-t)*t*300 + t*t*600;
              const y = (1-t)*(1-t)*230 + 2*(1-t)*t*320 + t*t*0;
              const baseOffset = (i === 16) ? -4 : -2;
              triangles.push(
                <polygon key={'c'+i} points={`${x-18},${y+baseOffset} ${x+18},${y+baseOffset} ${x},${y+38}`} fill={colors[i%colors.length]} />
              );
            }
            return triangles;
          })()}
        </svg>
      </div>
      
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
        src="https://res.cloudinary.com/dujw4np0d/video/upload/v1757566111/resh_wezsfi.mp4"
        style={{ opacity: videoLoaded ? 0.8 : 0 }}
        onLoadedData={handleVideoLoad}
        onCanPlay={handleVideoLoad}
      />
      
      {/* Content Container - Only show when ready */}
      <div className={`relative z-10 flex flex-row items-start justify-center w-full mt-16 transition-all duration-700 ease-in-out ${showContent ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'}`}>
        {/* Garba Image - Only visible on desktop/tablet */}
        <div 
          className="flex-shrink-0 h-full garba-desktop mobile-hide-garba"
          style={{ 
            position: 'absolute', 
            left: '-40px', 
            top: '160px', 
            zIndex: 10 
          }}
        >
          <img
            src="https://res.cloudinary.com/dujw4np0d/image/upload/v1757914104/rr_xwy5d0.avif"
            alt="Garba"
            className="w-[280px] h-auto md:w-[380px] lg:w-[570px] object-contain garba-tablet-shift desktop-only"
            style={{ maxHeight: '600px' }}
          />
        </div>
        
        {/* Text Content */}
        <div 
          className="text-center px-4 flex flex-col justify-center items-center md:ml-80 lg:ml-0 tablet-shift mobile-content-shift" 
          style={{ minWidth: '300px' }}
        >
          {/* Google Fonts Style and Custom CSS */}
          <style>
            {`
              @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=Poppins:wght@400;600&display=swap');
              
              /* Tablet view - 768px to 1023px */
              @media (min-width: 768px) and (max-width: 1023px) {
                .tablet-shift {
                  transform: translateY(120px);
                }
                .garba-tablet-shift {
                  transform: translateY(40px);
                  width: 480px;
                }
                .banner-tablet-shift {
                  transform: translateY(-25px) translateX(-85px);
                  max-width: 1200px !important;
                  width: 75vw !important;
                }
                .tablet-heading {
                  font-size: 2.6rem !important;
                  transform: translateY(-10px);
                }
                .tablet-subheading {
                  font-size: 1.5rem !important;
                  transform: translateY(-20px);
                }
              }
              
              /* Laptop view - 1024px to 1439px */
              @media (min-width: 1024px) and (max-width: 1439px) {
                /* Slightly nudge the Garba image right on desktop */
                .garba-desktop {
                  left: -20px !important;
                }
                .laptop-shift {
                  transform: translateY(80px) translateX(120px);
                }
                .garba-laptop-shift {
                  transform: translateY(20px) translateX(-60px);
                  width: 520px;
                }
                .banner-laptop-shift {
                  transform: translateY(6px) translateX(160px);
                  max-width: 2xl !important;
                  width: 70vw !important;
                }
                .laptop-heading {
                  font-size: 2.9rem !important;
                  line-height: 1.1;
                  text-align: right !important;
                  margin-left: 320px !important;
                }
                .laptop-subheading {
                  font-size: 1.0rem !important;
                  line-height: 1.4;
                  text-align: right !important;
                  margin-left: 320px !important;
                }
              }
              
              /* Mobile view - up to 767px */
              @media (max-width: 767px) {
                .mobile-content-shift {
                  transform: translateY(120px);
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  text-align: center;
                  padding: 0 10px;
                }
                .mobile-heading {
                  font-size: 1.8rem !important;
                  transform: none;
                  line-height: 1.2;
                  margin: 0 auto 5px auto;
                }
                .mobile-subheading {
                  font-size: 0.9rem !important;
                  transform: none;
                  line-height: 1.3;
                  margin: 0 auto 10px auto;
                }
                .banner-mobile-shift {
                  transform: none;
                  max-width: 320px !important;
                  width: 98% !important;
                  margin: 0 auto -10px auto; /* Negative margin to bring garba closer */
                }
                .mobile-hide-garba {
                  display: none !important;
                }
                .mobile-garba-container {
                  display: flex !important;
                  justify-content: flex-end;
                  align-items: center;
                  width: auto;
                  margin-top: 10px !important; /* Only shift down, do not change size */
                }
                .garba-mobile-img {
                  width: 250px !important;
                  max-width: 90vw !important;
                  height: auto !important;
                  max-height: 300px !important;
                  object-fit: contain;
                  margin-right: -45px; /* Keep original size and spacing */
                }
                  
                  
              }

              /* Laptop 1440px view - Perfect centering */
              @media (min-width: 1440px) {
                .laptop-1440-shift {
                  transform: translateY(80px);
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                  align-items: center;
                  width: 100%;
                  text-align: center;
                }
                .laptop-1440-heading {
                  font-size: 3.2rem !important;
                  transform: none;
                  line-height: 1.1;
                  margin: 0 auto;
                }
                .laptop-1440-subheading {
                  font-size: 1.2rem !important;
                  transform: none;
                  line-height: 1.4;
                  margin: 0 auto;
                }
                .banner-laptop-1440-shift {
                  transform: none;
                  max-width: 800px !important;
                  width: 90% !important;
                  margin: 0 auto;
                }
              }

              /* Smooth text rendering animations */
              @keyframes slideUp {
                from {
                  opacity: 0;
                  transform: translateY(20px);
                }
                to {
                  opacity: 1;
                  transform: translateY(0);
                }
              }

              .animate-slide-up {
                animation: slideUp 0.6s ease-out forwards;
              }

              .animate-slide-up-delayed {
                animation: slideUp 0.6s ease-out 0.3s forwards;
                opacity: 0;
              }
            `}
          </style>
          
          <h1 
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 tablet-heading laptop-heading laptop-1440-heading mobile-heading ${showContent ? 'animate-slide-up' : ''}`}
            style={{ 
              color: '#FFFACD', 
              fontFamily: 'Playfair Display, serif' 
            }}
          >
            PROFESSIONAL<br/>SAP &amp; IT TRAINING<br/>INSTITUTE
          </h1>
          
          <p 
            className={`text-base md:text-lg mb-2 tablet-subheading laptop-subheading laptop-1440-subheading mobile-subheading ${showContent ? 'animate-slide-up-delayed' : ''}`}
            style={{ 
              color: '#FFFACD', 
              fontFamily: 'Poppins, sans-serif' 
            }}
          >
            Advance your skills in SAP and IT<br/>with our expert led programs
          </p>
          
          <img
            src="https://res.cloudinary.com/dujw4np0d/image/upload/v1757911867/full_HD_size_2x_1_atpjdd.avif"
            alt="Banner"
            className={`w-full max-w-2xl md:max-w-3xl mx-auto mt-2 banner-tablet-shift banner-laptop-shift banner-laptop-1440-shift banner-mobile-shift transition-all duration-700 ${showContent ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'}`}
            style={{ transitionDelay: showContent ? '0.4s' : '0s' }}
          />

          {/* Mobile Banner and Mataji Image Side by Side */}
          <div className={`mobile-banner-container transition-all duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: showContent ? '0.5s' : '0s' }}>
            <div className="banner-wrapper">
              <img
                src="https://res.cloudinary.com/dujw4np0d/image/upload/v1757911867/full_HD_size_2x_1_atpjdd.avif"
                alt="Banner"
                className="mobile-banner"
              />
            </div>
            <div className="mataji-wrapper">
              <img
                src="https://res.cloudinary.com/dujw4np0d/image/upload/v1757914104/rr_xwy5d0.avif"
                alt="Mataji"
                className="mobile-mataji"
              />
            </div>
          </div>

          {/* Bottom Banner */}
          <div className={`bottom-banner-container transition-all duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: showContent ? '0.6s' : '0s' }}>
            <img
              src="https://res.cloudinary.com/dujw4np0d/image/upload/v1758368729/shared_image_a9rrik.png"
              alt="Bottom Banner"
              className="bottom-banner-image"
            />
          </div>

          <style>
            {`
              .desktop-only {
                display: block;
              }
              .mobile-only {
                display: none;
              }
              @media (max-width: 767px) {
                .desktop-only {
                  display: none !important;
                }
                .mobile-only {
                  display: flex !important;
                }
              }
              /* Mobile Banner and Mataji Side by Side Layout */
              .mobile-banner-container {
                display: none; /* Hidden by default */
                width: 100%;
                max-width: 100%;
                margin: 0 auto;
                padding: 0 10px;
                box-sizing: border-box;
              }
              
              .banner-wrapper, .mataji-wrapper {
                flex: 1;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              
              .mobile-banner {
                width: 250%;
                max-width: 250px;
                height:200px;
                object-fit: contain;
              }
              
              .mobile-mataji {
                width: 100%;
                max-width: 200px;
                height: 250px;
                object-fit: contain;
              }
              
              @media (max-width: 767px) {
                .mobile-banner-container {
                  display: flex;
                  flex-direction: row;
                  justify-content: space-between;
                  align-items: center;
                  gap: 10px;
                  margin-top: 5px;
                }
                
                .mobile-banner {
                  max-width: 150%;
                  transform: scale(1.2);
                }
                
                .mobile-mataji {
                  max-width: 120%;
                  transform: scale(1.2);
                }
                
                /* Hide the regular banner in mobile view */
                .banner-mobile-shift {
                  display: none;
                }
              }
              
              /* Bottom Banner Styles */
              .bottom-banner-container {
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: 20px;
                padding: 0 10px;
              }
              
              .bottom-banner-image {
                width: 100%;
                max-width: 800px;
                height: auto;
                object-fit: contain;
                display: none;
              }
              
              @media (max-width: 767px) {
                .bottom-banner-container {
                  margin-top: 0px;
                  padding: 0 5px;
                }
                .bottom-banner-image {
                  max-width: 100vw;
                  width: 100vw;
                  height: 220px;
                  display: block !important;
                  margin-top: -85px;
                }
              }
              
              @media (min-width: 768px) and (max-width: 1023px) {
                .bottom-banner-image {
                  max-width: 700px;
                  display: none !important;
                }
              }
              
              @media (min-width: 1024px) {
                .bottom-banner-image {
                  max-width: 800px;
                  display: none !important;
                }
              }
            `}
          </style>
        </div>
      </div>
    </div>
  );
};

export default BackgroundOnly;