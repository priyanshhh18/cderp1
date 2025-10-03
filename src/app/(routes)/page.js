import "@/app/globals.css";
import dynamic from "next/dynamic";
import React, { Suspense } from "react";

// Simple loading placeholder component
const Loading = () => <div className="loading-placeholder">Loading...</div>;

// Critical above-the-fold component - load immediately
import HeaderCarousel from "@/components/HomePage/HeaderCarousel";
import Marquee from "@/components/HomePage/Marquee2";
import Chevron from "@/components/HomePage/Chevron";

// Lazy load below-the-fold components with Suspense and fallback loaders

const Keypoints = dynamic(() => import("@/components/HomePage/Keypoints"), {
  suspense: true,
});
const OurClients = dynamic(() => import("@/components/HomePage/OurClients"), {
  suspense: true,
});
const PlacementSection = dynamic(
  () => import("@/components/HomePage/PlacementSection"),
  { suspense: true }
);
const AnimatedStatsSection = dynamic(
  () => import("@/components/HomePage/OurStats"),
  { suspense: true }
);
const Achievements = dynamic(() => import("@/components/HomePage/Achievements"), {
  suspense: true,
});
const FeedbackAndReviews = dynamic(
  () => import("@/components/HomePage/FeedbackandReviews"),
  { suspense: true }
);
const DemoCertificate = dynamic(() => import("@/components/HomePage/DemoCertificate"), {
  suspense: true,
});
const Branches = dynamic(() => import("@/components/HomePage/Branches"), {
  suspense: true,
});
const Courses = dynamic(() => import("@/components/HomePage/PopCourses"), {
  suspense: true,
});

export const metadata = {
  title: "Connecting Dots ERP - SAP & IT Training Institute",
  description:
    " Looking for an offline or online SAP course in Pune? Join today for hands-on training, expert guidance & Get free s/4 hana server access during Training",
  keywords: [
    "SAP Certification Courses",
    "SAP Course",
    "Data Science Course",
    "Power Bi Course",
    "Digital Marketing Course",
    "HR Training Institute",
    "SAP Training Institute",
    "Python Course",
    "Software Course",
    "Training",
    "Education",
    "Sap course in pune ",
    "sap course in mumbai ",
    " sap training in pune ",
    " sap training in Mumbai ",
    "hr course in pune ",
    "hr training in pune ",
    " hr course in Mumbai ",
    "hr training in Mumbai ",
    " Data Analytics training in Pune ",
    "best IT courses in Pune ",
    "Data Analytics training in mumbai ",
    "best IT courses in mumbai ",
    " best it course in pune "
  ],
  author: "Connecting Dots ERP | Software and SAP Training Institute",
  robots: "index, follow",
  alternates: {
    canonical: "https://connectingdotserp.com/",
  },
  openGraph: {
    title: "Connecting Dots ERP | Software and SAP Training Institute",
    description:
      "With 10+ years of experience we offer Expert-led training in SAP, Software Development, Digital Marketing, and HR Courses with strong placement support for your career.",
    url: "https://connectingdotserp.com/",
    siteName: "Connecting Dots ERP",
    images: [
      {
        url: "https://connectingdotserp.com/Navbar/logo.webp",
        width: 180,
        height: 60,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SAP Training Institute | Connecting Dots ERP",
    description:
      "Get recognized SAP and Software training at Connecting Dots ERP. Start your career in SAP with expert guidance.",
    site: "@CD_ERP",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "LocalBusiness"],
      "@id": "https://connectingdotserp.com/#organization",
      name: "Connecting Dots ERP SAP Training Institute",
      url: "https://connectingdotserp.com/",
      logo: {
        "@type": "ImageObject",
        url: "https://connectingdotserp.com/Navbar/logo.webp",
        width: 180,
        height: 60,
      },
      sameAs: [
        "https://www.facebook.com/sapinstallation.pune.9",
        "https://x.com/CD_ERP",
        "https://www.instagram.com/connecting_dots_sap_training",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+919004002958",
        contactType: "Customer Support",
        areaServed: "IN",
        availableLanguage: ["English"],
      },
      description:
        "We offer expert-led training in SAP, Software Development, Digital Marketing, and HR courses with strong placement support for your career.",
      address: [
        {
          "@type": "PostalAddress",
          streetAddress:
            "1st Floor, 101, Police, Wireless Colony, Vishal Nagar, Pimple Nilakh",
          addressLocality: "Pune",
          addressRegion: "MH",
          postalCode: "411027",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress:
            "8th Floor, Paradise Tower, next to McDonald's, Naupada, Thane West",
          addressLocality: "Mumbai",
          addressRegion: "Maharashtra",
          postalCode: "400601",
          addressCountry: "IN",
        },
        {
          "@type": "PostalAddress",
          streetAddress:
            "8th Floor, Paradise Tower, next to McDonald's, Naupada, Thane West",
          addressLocality: "Raipur",
          addressRegion: "Chhattisgarh",
          postalCode: "492001",
          addressCountry: "IN",
        },
      ],
      geo: {
        "@type": "GeoCoordinates",
        latitude: "18.586532821424697",
        longitude: "73.78137250928907",
      },
      foundingDate: "2013",
      founder: {
        "@type": "Person",
        name: "Nitendra Singh",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        reviewCount: "185",
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
        ],
        opens: "00:00",
        closes: "23:59",
      },
    },
    {
      "@type": "Product",
      "@id": "https://connectingdotserp.com/#product",
      name: "SAP Course",
      description: "Comprehensive SAP covering all modules.",
      image: "https://i.imgur.com/HbmlQ9u.png",
      url: "https://connectingdotserp.com/",
      brand: {
        "@type": "Brand",
        name: "Connecting Dots ERP",
      },
      offers: {
        "@type": "Offer",
        price: "75000",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
        validFrom: "2025-04-01",
      },
    },
    {
      "@type": "Course",
      "@id": "https://connectingdotserp.com/#course",
      name: "SAP Course",
      description:
        "Comprehensive SAP with modules designed to help you master SAP systems.",
      provider: {
        "@type": "Organization",
        name: "Connecting Dots ERP",
        url: "https://connectingdotserp.com/",
      },
    },
    {
      "@type": "VideoObject",
      "@id": "https://connectingdotserp.com/#video",
      name: "Introduction to ConnectingDots",
      description:
        "Connecting Dots ERP is a SAP and software training institute in Pune offering a wide range of career enhancement courses. We offer SAP Courses Digital Marketing & HR along with other IT courses.",
      embedUrl: "https://youtu.be/7YRbfuv7R3k?si=cqdu5buZ-Ya_-O8R",
      uploadDate: "2025-04-03",
      duration: "PT5M",
      thumbnailUrl: "https://i.imgur.com/HbmlQ9u.png",
      publisher: {
        "@type": "Organization",
        name: "Connecting Dots ERP",
      },
    },
    {
      "@type": "SpecialAnnouncement",
      "@id": "https://connectingdotserp.com/#announcement",
      headline: "Batches Starting Soon",
      text: "Connecting Dots ERP is a SAP and software training institute in Pune offering a wide range of career enhancement courses. We offer SAP Courses Digital Marketing & HR along with other IT courses.",
      url: "https://connectingdotserp.com/",
      datePosted: "2025-06-10",
      expires: "2025-12-31",
      publisher: {
        "@id": "https://connectingdotserp.com/#organization",
      },
      announcementLocation: {
        "@type": "Place",
        "@id": "https://connectingdotserp.com/pune/#localbusiness",
      },
    },
  ],
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main Page Content */}
      <main className="flex-col justify-center">
        <h1 className="visually-hidden">
          Professional SAP & IT Training Institute
        </h1>
        <HeaderCarousel />
        <Marquee />
        <Chevron />

          <Suspense fallback={<Loading />}>
          <Keypoints />
          <OurClients />
          <Courses />
          <PlacementSection />
          <AnimatedStatsSection />
          <Achievements />
          <FeedbackAndReviews />
          <DemoCertificate />
          <Branches />
        </Suspense>
      </main>
    </>
  );
}
