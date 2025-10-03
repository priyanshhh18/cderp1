"use client";

import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { FaBookOpen, FaWhatsapp, FaStar, FaPhoneAlt, FaFileAlt } from "react-icons/fa";
import ChatbotIcon from "@/components/ChatbotIcon";
import styles from "@/styles/BottomMenu.module.css";
import { usePathname } from "next/navigation";

const BottomMenu = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [tawkReady, setTawkReady] = useState(false);
  const pathname = usePathname();

  // Check if current path is an admin path
  const isAdminPath = pathname && (
    pathname.startsWith('/dashboard') ||
    pathname.startsWith('/superadmin') ||
    pathname === '/AdminLogin'
  );

  // Handle screen size detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    // Initial check and event listeners
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Check for Tawk API availability
  useEffect(() => {
    const checkTawkAPI = () => {
      if (typeof window !== "undefined" && window.Tawk_API) {
        setTawkReady(true);
        return;
      }
      
      // If Tawk_API is not available, wait for it
      const interval = setInterval(() => {
        if (window.Tawk_API) {
          setTawkReady(true);
          clearInterval(interval);
        }
      }, 100);

      // Clear interval after 10 seconds to avoid infinite checking
      setTimeout(() => clearInterval(interval), 10000);
      
      return () => clearInterval(interval);
    };

    if (typeof window !== "undefined") {
      checkTawkAPI();
    }
  }, []);

  // Handle Tawk chat toggle with better error handling
  const toggleChat = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (typeof window !== "undefined" && window.Tawk_API && tawkReady) {
        // Try different Tawk API methods
        if (typeof window.Tawk_API.toggle === 'function') {
          window.Tawk_API.toggle();
        } else if (typeof window.Tawk_API.maximize === 'function') {
          window.Tawk_API.maximize();
        } else if (typeof window.Tawk_API.showWidget === 'function') {
          window.Tawk_API.showWidget();
        }
      } else {
        console.warn('Tawk API not ready or not available');
        
        // Fallback: Try to find and click the Tawk widget manually
        const tawkWidget = document.querySelector('#tawk-bubble') || 
                          document.querySelector('.tawk-bubble') ||
                          document.querySelector('[id*="tawk"]') ||
                          document.querySelector('iframe[src*="tawk"]');
        
        if (tawkWidget) {
          tawkWidget.click();
        } else {
          // Final fallback - show alert or redirect to contact page
          alert('Chat service is temporarily unavailable. Please try again or contact us directly.');
        }
      }
    } catch (error) {
      console.error('Error toggling chat:', error);
      
      // Fallback error handling
      const tawkWidget = document.querySelector('#tawk-bubble') || 
                        document.querySelector('.tawk-bubble') ||
                        document.querySelector('[id*="tawk"]');
      
      if (tawkWidget) {
        tawkWidget.click();
      } else {
        alert('Chat service is temporarily unavailable. Please contact us via phone or WhatsApp.');
      }
    }
  }, [tawkReady]);

  // Menu items configuration
  const menuItems = [
    {
      id: "chatbot",
      href: "#",
      icon: <ChatbotIcon />,
      label: "Chat",
      color: "#7B61FF",
      onClick: toggleChat
    },
    {
      id: "whatsapp",
      href: "https://wa.me/+919004002958",
      icon: <FaWhatsapp size={22} />,
      label: "WhatsApp",
      color: "#25D366"
    },
    {
      id: "review",
      href: "https://g.co/kgs/d827hLN",
      icon: <FaStar size={22} />,
      label: "Rating 4.7☆",
      color: "#FFD700",
      isReview: true
    },
    {
      id: "contact",
      href: "tel:+919004002958",
      icon: <FaPhoneAlt size={20} />,
      label: "Call Us",
      color: "#0D6EFD"
    },
  ];

  // Handle item click with animation
  const handleItemClick = (id, onClick) => {
    setActiveItem(id);
    setTimeout(() => setActiveItem(null), 500);
    
    // Execute custom onClick if provided
    if (onClick) {
      return onClick;
    }
  };

  // Don't render on desktop or admin pages
  if (!isMobile || isAdminPath) return null;

  return (
    <nav className={styles.bottomMenu}>
      <div className={`container-fluid ${styles.menuContainer}`}>
        <div className={styles.menuWrapper}>
          {menuItems.map((item) => (
            <Link
              href={item.href}
              key={item.id}
              className={`${styles.menuItem} ${activeItem === item.id ? styles.active : ''}`}
              onClick={(e) => {
                if (item.onClick) {
                  // For items with custom onClick, prevent default navigation
                  e.preventDefault();
                  handleItemClick(item.id);
                  item.onClick(e);
                } else {
                  // For regular links, just handle the animation
                  handleItemClick(item.id);
                }
              }}
              // Add these attributes for better mobile handling
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  if (item.onClick) {
                    e.preventDefault();
                    item.onClick(e);
                  }
                }
              }}
            >
              <div className={styles.iconWrapper} style={{ color: item.color }}>
                {item.icon}
                <div className={styles.ripple} style={{ backgroundColor: item.color }}></div>
              </div>
              <span className={styles.label}>
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default BottomMenu;