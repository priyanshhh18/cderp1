"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

// A globally sticky floating button that opens the PopupForm on click
// Uses a placeholder image for the "Book For DEMO" design
export default function FloatingFlag() {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);

  // Hide on admin-like paths and blogs
  const hiddenPaths = ["/dashboard", "/superadmin", "/adminlogin", "/blogsadmin", "/blogs"];
  const isHidden = (pathname || "").toLowerCase().startsWith("/admin") ||
                   hiddenPaths.some(p => (pathname || "").toLowerCase().startsWith(p));

  useEffect(() => {
    // preload any required assets in future
    const onSidebarVisibility = (e) => {
      if (e?.detail && typeof e.detail.open === "boolean") {
        setSidebarOpen(e.detail.open);
      }
    };
    const onGlobalFormVisibility = (e) => {
      if (e?.detail && typeof e.detail.open === "boolean") {
        setFormOpen(e.detail.open);
      }
    };
    if (typeof window !== "undefined") {
      window.addEventListener("sidebar-visibility", onSidebarVisibility);
      window.addEventListener("global-form-visibility", onGlobalFormVisibility);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("sidebar-visibility", onSidebarVisibility);
        window.removeEventListener("global-form-visibility", onGlobalFormVisibility);
      }
    };
  }, []);

  if (isHidden || formOpen) return null;

  const handleClick = () => {
    // Fire a custom event that PopupForm listens to
    if (typeof window !== "undefined") {
      window.dispatchEvent(new CustomEvent("open-popup-form", {
        detail: { source: "floating-flag" }
      }));
      
      // Debug log
      console.log("FloatingFlag clicked - attempting to open popup");
    }
  };

  const containerStyle = {
    position: "fixed",
    left: 0,
    top: sidebarOpen ? "58%" : "50%",
    transform: "translateY(-50%)",
    zIndex: 1500,
    cursor: "pointer",
  };

  const imageButtonStyle = {
    display: "block",
    transition: "transform 0.2s ease, filter 0.2s ease",
    filter: "drop-shadow(2px 2px 8px rgba(0,0,0,0.3))",
  };

  return (
    <div style={containerStyle} aria-label="Open registration form">
      <button
        type="button"
        onClick={handleClick}
        style={{ 
          background: "none", 
          border: "none", 
          padding: 0,
          cursor: "pointer"
        }}
        aria-haspopup="true"
        aria-controls="popup-form"
        title="Book For DEMO - Flat 5000 Rs. OFF"
        onMouseEnter={(e) => {
          const img = e.currentTarget.querySelector('img');
          if (img) {
            img.style.transform = "translateX(8px) scale(1.05)";
            img.style.filter = "drop-shadow(4px 4px 12px rgba(0,0,0,0.4)) brightness(1.1)";
          }
        }}
        onMouseLeave={(e) => {
          const img = e.currentTarget.querySelector('img');
          if (img) {
            img.style.transform = "translateX(0) scale(1)";
            img.style.filter = "drop-shadow(2px 2px 8px rgba(0,0,0,0.3))";
          }
        }}
        onMouseDown={(e) => {
          const img = e.currentTarget.querySelector('img');
          if (img) {
            img.style.transform = "translateX(4px) scale(0.98)";
          }
        }}
        onMouseUp={(e) => {
          const img = e.currentTarget.querySelector('img');
          if (img) {
            img.style.transform = "translateX(8px) scale(1.05)";
          }
        }}
      >
        <Image
          src="https://res.cloudinary.com/dujw4np0d/image/upload/v1757918647/reshhh_1_dtixc2.avif" // Replace with your actual image path
          alt="Book For DEMO - Flat 5000 Rs. OFF"
          width={140}
          height={100}
          style={imageButtonStyle}
          priority={true}
          // Fallback placeholder while image loads or if image fails
          onError={(e) => {
            // Create a simple fallback if image fails to load
            e.currentTarget.style.display = 'none';
            const fallback = document.createElement('div');
            fallback.innerHTML = '📞 DEMO';
            fallback.style.cssText = `
              background: linear-gradient(to bottom, #FF7F00 0%, #FF7F00 33%, #FFFFFF 33%, #FFFFFF 66%, #128807 66%, #128807 100%);
              width: 140px;
              height: 100px;
              display: flex;
              align-items: center;
              justify-content: center;
              border-radius: 0 8px 8px 0;
              color: white;
              font-weight: bold;
              font-size: 14px;
            `;
            e.currentTarget.parentNode.appendChild(fallback);
          }}
        />
      </button>
    </div>
  );
}