// src/app/layout.js
import { Lato, Rubik } from "next/font/google";
import Script from "next/script";
import "./globals.css";

// Static imports for components that are part of the main layout
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import CallAdvisorsStrip from "@/components/Common/CallAdvisorsStrip";
import Marquee from "@/components/Common/Marquee";
import ServerPing from "@/components/ServerPing";
// import FloatingFlag from "@/components/FloatingFlag"; 
// Client wrapper for providers - but don't wrap the main content
import ConditionalAuthProvider from "@/app/conditionalprovider";
import ClientLayoutWrapper from "@/components/ClientLayoutWrapper";


// --- Font Setup ---
const lato = Lato({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

const rubik = Rubik({
  weight: ["300", "500"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-rubik",
});

// --- Constants ---
const GTM_ID = "GTM-MB68QM2V";
const FB_PIXEL_ID = "3414178115554916";
const AHREFS_KEY = "pUfORHA6uR+7KBt+fOIy2g";

// --- SITE-WIDE METADATA ---
export const metadata = {
  title: {
    default: "Connecting Dots ERP | SAP Training Institute",
  },
  description:
    "Expert-led training in SAP, Software Development, Digital Marketing, and HR Courses with strong placement support for your career.",
  verification: {
    google: "KRKFsO9AAW2a8qImif8Wj4uzzjmWGA0R6o7IZFJcmPo",
    other: {
      "ahrefs-site-verification":
        "f3b13167d2161bfb1fc945b8ecb8c0e6855cf9394e9e96e12104db099fbbcab0",
    },
  },
  manifest: "/site.webmanifest",
  icons: {
    icon: "/favicon.ico",
    appleTouchIcon: "/apple-touch-icon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${lato.variable} ${rubik.variable}`}>
      <head>
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#1a365d" />
        <meta name="mobile-web-app-capable" content="yes" />

        {/* GTM Head Script */}
        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
      </head>
      <body
        className={`body bg-black ${lato.className} ${rubik.className}`}
        suppressHydrationWarning={true}
      >
        {/* GTM noscript fallback */}
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
      
        {/* Server Ping Component */}
        <ServerPing />

        {/* Server-Side Rendered Components - Critical for SEO */}
        <CallAdvisorsStrip />
        <Marquee />
        <Navbar />
 
        {/* ✅ MAIN CONTENT - Keep this server-side for SEO */}
        <ConditionalAuthProvider>
          <ClientLayoutWrapper>
            {children}
          </ClientLayoutWrapper>
        </ConditionalAuthProvider>

        

        <Footer />
        
        {/* <FloatingFlag />

        {/* Facebook Pixel */}
        {/* <Script
          id="facebook-pixel"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${FB_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />  */}
        
        {/* Ahrefs Analytics */}
        <Script
          id="ahrefs-analytics"
          src="https://analytics.ahrefs.com/analytics.js"
          data-key={AHREFS_KEY}
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
