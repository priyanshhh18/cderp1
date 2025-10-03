"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

// Organized clients by tier for better visual hierarchy
const premiumClients = [
  "Accenture.avif",
  "wipro.avif",
  "infosys.avif",
  "google.avif",
  "microsoft.avif",
  "cognizant.avif",
  "tcs.avif",
  "amdocs.avif",
  "ibm.avif",
  "paytm.avif",
  "capgemini.avif",
  "swiggy.avif",
  "dream11.avif",
  "hdfc.avif",
  "God.avif",
  "BAJAJ.avif",
  "bharatpe.avif",
  "pizza-hut.avif",
  
];

const enterpriseClients = [
  "exl.avif",
  "volkswagon.avif",
  "jindal.avif",
  "john-deere.avif",
  "bostonbyte.avif",
  "sharechat.avif",
  "leapfinance.avif",
  "moneytap.avif",
  "whitehat.avif",
  "cummins.avif",
];

const growingClients = [
  "airmeet.avif",
  "ask.avif",
  "bharatgri.avif",
  "capita.avif",
  "crisi.avif",
  "eatfit.avif",
  "genius.avif",
  "homelane.avif",
  "iss.avif",
  "kelly.avif",
];

const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

const MarqueeRow = ({
  logos,
  direction = "left",
  speed = "normal",
  shuffle = false,
}) => {
  const [logosToUse, setLogosToUse] = useState(logos);

  useEffect(() => {
    if (shuffle) {
      setLogosToUse(shuffleArray(logos));
    } else {
      setLogosToUse(logos);
    }
  }, [logos, shuffle]);

  const getAnimationClass = () => {
    const baseAnimation =
      direction === "right" ? "animate-marquee-reverse" : "animate-marquee";
    const speedMultiplier = {
      slow: "40s",
      normal: "30s",
      fast: "20s",
    }[speed];

    return `${baseAnimation} [animation-duration:${speedMultiplier}]`;
  };

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex gap-4 sm:gap-6 md:gap-8 ${getAnimationClass()}`}
        style={{ width: "max-content" }}
      >
        {/* First set */}
        {logosToUse.map((logo, index) => (
          <div 
            key={`first-${index}`} 
            className="flex-shrink-0 group"
            style={{
              width: '120px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease'
            }}
          >
            <Image
              src={`/Ourclients/${logo}`}
              alt={`Client logo`}
              width={140}
              height={120}
              className="object-contain max-w-full max-h-full group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
              quality={75}
            />
          </div>
        ))}

        {/* Second set for seamless loop */}
        {logosToUse.map((logo, index) => (
          <div 
            key={`second-${index}`} 
            className="flex-shrink-0 group"
            style={{
              width: '120px',
              height: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'white',
              borderRadius: '12px',
              padding: '4px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              transition: 'transform 0.3s ease'
            }}
          >
            <Image
              src={`/Ourclients/${logo}`}
              alt={`Client logo`}
              width={120}
              height={100}
              className="object-contain max-w-full max-h-full group-hover:scale-110 transition-transform duration-300"
              loading="lazy"
              quality={75}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const OurClients = () => {
  return (
    <section className="py-6 sm:py-8 md:py-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Custom Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h2 
            className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4"
            style={{
              fontSize: '2.5rem',
              fontWeight: 700,
              letterSpacing: '4px',
              textShadow: `
                0 0 0px #fff,
                0 0 10px #fff,
                0 0 10px #0073e6,
                0 0 20px #182e4a,
                0 0 20px #182e4a,
                0 0 30px #182e4a,
                0 0 30px #182e4a
              `,
              background: 'linear-gradient(90deg, #fff 35%, rgba(3, 163, 196, 1) 49%, #fff 62%)',
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent',
              textAlign: 'center'
            }}
          >
            Our Clients
          </h2>
          
          {/* Custom Underline */}
          <div 
            style={{
              width: '80px',
              height: '4px',
              background: 'linear-gradient(90deg, #a76b2e, #f18436)',
              margin: '5px auto 10px',
              borderRadius: '2px',
              marginBottom: '1rem'
            }}
          />
          
          <p className="text-gray-400 text-sm sm:text-base">
            Trusted by industry leaders worldwide
          </p>
        </div>

        {/* Client Marquees */}
        <div className="space-y-6 sm:space-y-8">
          {/* First Row - Premium Clients */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
            <MarqueeRow
              logos={premiumClients}
              direction="left"
              speed="slow"
              shuffle={true}
            />
          </div>

          {/* Second Row - Enterprise Clients */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
            <MarqueeRow
              logos={enterpriseClients}
              direction="right"
              speed="normal"
              shuffle={false}
            />
          </div>

          {/* Third Row - Growing Clients */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-r from-gray-900 to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-8 sm:w-16 bg-gradient-to-l from-gray-900 to-transparent z-10"></div>
            <MarqueeRow
              logos={growingClients}
              direction="left"
              speed="fast"
              shuffle={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OurClients;
