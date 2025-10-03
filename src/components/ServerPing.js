'use client';
import { useEffect } from 'react';

export default function ServerPing() {
  useEffect(() => {
    // Helper to safely fetch JSON without throwing on HTML/error pages
    const fetchJsonSafe = async (url, label) => {
      if (!url || typeof url !== 'string' || url.startsWith('undefined')) {
        console.warn(`[ServerPing] Skipping ${label}: invalid URL ->`, url);
        return;
      }

      try {
        const res = await fetch(url);
        const contentType = res.headers.get('content-type') || '';

        if (!res.ok) {
          const text = await res.text().catch(() => '');
          console.warn(`[ServerPing] ${label} responded with ${res.status}. Body preview:`, text.slice(0, 200));
          return;
        }

        if (contentType.includes('application/json')) {
          const data = await res.json();
          console.log(`[ServerPing] ${label} OK:`, data);
        } else {
          const text = await res.text();
          console.warn(`[ServerPing] ${label} non-JSON response (content-type: ${contentType}). Body preview:`, text.slice(0, 200));
        }
      } catch (err) {
        console.error(`[ServerPing] ${label} request failed:`, err);
      }
    };

    // Ping main server
    const pingServer = () =>
      fetchJsonSafe(`${process.env.NEXT_PUBLIC_API_URL}/api/ping`, 'Main server');

    // Ping blogs server
    const pingBlogsServer = () =>
      fetchJsonSafe(`${process.env.NEXT_PUBLIC_API_URL_BLOG}/api/blogs/ping`, 'Blogs server');

    // Execute both pings
    pingServer();
    pingBlogsServer();

    // Optional: Set up interval to ping periodically (every 5 minutes)
    const interval = setInterval(() => {
      pingServer();
      pingBlogsServer();
    }, 5 * 60 * 1000); // 5 minutes

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return null; // This component doesn't render anything visible
}