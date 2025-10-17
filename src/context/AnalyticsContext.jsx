// context/AnalyticsContext.js
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

const AnalyticsContext = createContext();

export const AnalyticsProvider = ({ children }) => {
  const [sessionId, setSessionId] = useState('');
  const [visitorId, setVisitorId] = useState('');
  const [currentPage, setCurrentPage] = useState('');
  const [pageStartTime, setPageStartTime] = useState(Date.now());
  const [scrollDepth, setScrollDepth] = useState(0);
  const [performanceMetrics, setPerformanceMetrics] = useState({});
  const scrollDepthRef = useRef(0);
  const pageEventsRef = useRef(new Set());

  useEffect(() => {
    initializeAnalytics();
    setupPageTracking();
    setupVisibilityTracking();
    setupScrollTracking();
    setupPerformanceTracking();
    setupClickTracking();
    setupFormTracking();
  }, []);

  const initializeAnalytics = () => {
    // Generate or retrieve visitor ID
    let storedVisitorId = localStorage.getItem('visitorId');
    if (!storedVisitorId) {
      storedVisitorId = uuidv4();
      localStorage.setItem('visitorId', storedVisitorId);
    }
    setVisitorId(storedVisitorId);

    // Generate session ID
    const newSessionId = uuidv4();
    setSessionId(newSessionId);

    // Track session start
    trackSessionStart();
  };

  const setupPageTracking = () => {
    // Track initial page view
    trackPageView(window.location.pathname, document.title);

    // Listen for route changes (for React Router)
    const handleRouteChange = () => {
      trackPageView(window.location.pathname, document.title);
    };

    window.addEventListener('popstate', handleRouteChange);
    
    // Override pushState to detect route changes
    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      originalPushState.apply(this, args);
      setTimeout(handleRouteChange, 100);
    };

    // Override replaceState as well
    const originalReplaceState = history.replaceState;
    history.replaceState = function (...args) {
      originalReplaceState.apply(this, args);
      setTimeout(handleRouteChange, 100);
    };

    return () => {
      window.removeEventListener('popstate', handleRouteChange);
    };
  };

  const setupVisibilityTracking = () => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        setPageStartTime(Date.now());
      } else if (document.visibilityState === 'hidden') {
        trackPageExit();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Track beforeunload for session duration
    window.addEventListener('beforeunload', trackSessionEnd);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('beforeunload', trackSessionEnd);
    };
  };

  const setupScrollTracking = () => {
    let scrollTimeout;
    let maxScrollDepth = 0;

    const trackScrollDepth = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = window.scrollY;
      const depth = scrollHeight > 0 ? Math.round((scrolled / scrollHeight) * 100) : 0;
      
      if (depth > maxScrollDepth) {
        maxScrollDepth = depth;
        setScrollDepth(maxScrollDepth);
        scrollDepthRef.current = maxScrollDepth;
      }

      // Throttle scroll events
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        trackEvent('scroll', {
          depth: maxScrollDepth,
          position: scrolled,
          viewportHeight: window.innerHeight,
          documentHeight: document.documentElement.scrollHeight
        });
      }, 1000);
    };

    window.addEventListener('scroll', trackScrollDepth, { passive: true });

    return () => {
      window.removeEventListener('scroll', trackScrollDepth);
      clearTimeout(scrollTimeout);
    };
  };

  const setupPerformanceTracking = () => {
    if ('performance' in window) {
      // Track Core Web Vitals
      const observePerformance = () => {
        // Largest Contentful Paint
        const lcpObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          const lastEntry = entries[entries.length - 1];
          setPerformanceMetrics(prev => ({
            ...prev,
            largestContentfulPaint: lastEntry.renderTime || lastEntry.loadTime
          }));
        });
        lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

        // Cumulative Layout Shift
        const clsObserver = new PerformanceObserver((entryList) => {
          let clsValue = 0;
          for (const entry of entryList.getEntries()) {
            if (!entry.hadRecentInput) {
              clsValue += entry.value;
            }
          }
          setPerformanceMetrics(prev => ({
            ...prev,
            cumulativeLayoutShift: clsValue
          }));
        });
        clsObserver.observe({ type: 'layout-shift', buffered: true });

        // First Input Delay
        const fidObserver = new PerformanceObserver((entryList) => {
          const entries = entryList.getEntries();
          for (const entry of entries) {
            const delay = entry.processingStart - entry.startTime;
            setPerformanceMetrics(prev => ({
              ...prev,
              firstInputDelay: delay
            }));
          }
        });
        fidObserver.observe({ type: 'first-input', buffered: true });
      };

      // Wait for page to load before observing
      if (document.readyState === 'complete') {
        observePerformance();
      } else {
        window.addEventListener('load', observePerformance);
      }

      // Track navigation timing
      const navigationTiming = performance.getEntriesByType('navigation')[0];
      if (navigationTiming) {
        setPerformanceMetrics(prev => ({
          ...prev,
          dnsLookup: navigationTiming.domainLookupEnd - navigationTiming.domainLookupStart,
          tcpConnection: navigationTiming.connectEnd - navigationTiming.connectStart,
          ttfb: navigationTiming.responseStart - navigationTiming.requestStart,
          domContentLoaded: navigationTiming.domContentLoadedEventEnd - navigationTiming.navigationStart,
          windowLoad: navigationTiming.loadEventEnd - navigationTiming.navigationStart
        }));
      }

      // Track resource timing
      const resources = performance.getEntriesByType('resource');
      const resourceLoadTimes = resources.map(resource => ({
        name: resource.name,
        duration: resource.duration,
        size: resource.transferSize
      }));

      setPerformanceMetrics(prev => ({
        ...prev,
        resourceLoadTimes
      }));
    }
  };

  const setupClickTracking = () => {
    const handleClick = (event) => {
      const target = event.target;
      const element = {
        tagName: target.tagName,
        id: target.id,
        className: target.className,
        text: target.textContent?.slice(0, 100),
        href: target.href
      };

      trackEvent('click', {
        element,
        coordinates: {
          x: event.clientX,
          y: event.clientY
        },
        page: window.location.pathname
      });
    };

    document.addEventListener('click', handleClick, { passive: true });

    return () => {
      document.removeEventListener('click', handleClick);
    };
  };

  const setupFormTracking = () => {
    const handleFormSubmit = (event) => {
      const form = event.target;
      const formData = {
        id: form.id,
        className: form.className,
        action: form.action,
        method: form.method,
        fields: Array.from(form.elements).filter(el => el.name).map(el => ({
          name: el.name,
          type: el.type
        }))
      };

      trackEvent('form_submit', {
        form: formData,
        page: window.location.pathname
      });
    };

    const handleFormStart = (event) => {
      const target = event.target;
      if (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.tagName === 'SELECT') {
        const form = target.form;
        if (form && !pageEventsRef.current.has(`form_start_${form.id || form.className}`)) {
          pageEventsRef.current.add(`form_start_${form.id || form.className}`);
          
          const formData = {
            id: form.id,
            className: form.className,
            action: form.action
          };

          trackEvent('form_start', {
            form: formData,
            page: window.location.pathname
          });
        }
      }
    };

    document.addEventListener('submit', handleFormSubmit);
    document.addEventListener('focusin', handleFormStart, true);

    return () => {
      document.removeEventListener('submit', handleFormSubmit);
      document.removeEventListener('focusin', handleFormStart);
    };
  };

  const collectEnhancedAnalyticsData = () => {
    // Get screen resolution
    const screenResolution = {
      width: window.screen.width,
      height: window.screen.height,
      colorDepth: window.screen.colorDepth,
      pixelRatio: window.devicePixelRatio
    };

    // Get viewport size
    const viewportSize = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Get connection information
    const connection = navigator.connection ? {
      effectiveType: navigator.connection.effectiveType,
      downlink: navigator.connection.downlink,
      rtt: navigator.connection.rtt,
      saveData: navigator.connection.saveData
    } : null;

    // Get language and timezone
    const language = navigator.language;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Get referrer and URL parameters
    const referrer = document.referrer;
    const urlParams = Object.fromEntries(new URLSearchParams(window.location.search));

    return {
      userAgent: navigator.userAgent,
      screenResolution,
      viewportSize,
      connection,
      language,
      timezone,
      referrer,
      landingPage: window.location.pathname,
      urlParams,
      performance: performanceMetrics,
      consentGiven: localStorage.getItem('analyticsConsent') === 'true',
      doNotTrack: navigator.doNotTrack === '1'
    };
  };

//   const trackSessionStart = async () => {
//     try {
//       const analyticsData = collectEnhancedAnalyticsData();
//       await axios.post(`${import.meta.env.VITE_API_BASE_URL}/analytics/session/start`, {
//         sessionId,
//         visitorId,
//         ...analyticsData
//       });
//     } catch (error) {
//       console.error('Error tracking session start:', error);
//     }
//   };

  // In your frontend AnalyticsContext.js - add this to trackSessionStart
    
  const trackSessionStart = async () => {
    try {
        const analyticsData = await collectEnhancedAnalyticsData();
        
        console.log('Sending session start:', {
        sessionId,
        visitorId,
        hasSessionId: !!sessionId,
        hasVisitorId: !!visitorId,
        analyticsData: Object.keys(analyticsData)
        });

        const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/analytics/session/start`, {
        sessionId,
        visitorId,
        ...analyticsData
        });
        
        console.log('Session start response:', response.data);
    } catch (error) {
        console.error('Error tracking session start:', error.response?.data || error.message);
    }
    };
  const trackSessionEnd = async () => {
    try {
      const sessionDuration = Math.floor((Date.now() - pageStartTime) / 1000);
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/analytics/session/end`, {
        sessionId,
        duration: sessionDuration,
        reason: 'page_unload'
      }, {
        headers: { 'Content-Type': 'application/json' },
        keepalive: true
      });
    } catch (error) {
      // Use navigator.sendBeacon as fallback
      const blob = new Blob([JSON.stringify({
        sessionId,
        duration: Math.floor((Date.now() - pageStartTime) / 1000),
        reason: 'page_unload'
      })], { type: 'application/json' });
      navigator.sendBeacon(`${import.meta.env.VITE_API_BASE_URL}/analytics/session/end`, blob);
    }
  };

  const trackPageView = async (path, title) => {
    // Track previous page exit
    if (currentPage) {
      trackPageExit();
    }

    // Reset scroll depth and events for new page
    scrollDepthRef.current = 0;
    pageEventsRef.current.clear();
    setScrollDepth(0);

    // Set new page start time
    setPageStartTime(Date.now());
    setCurrentPage(path);

    try {
      const analyticsData = collectEnhancedAnalyticsData();
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/analytics/pageview`, {
        sessionId,
        visitorId,
        path,
        title,
        referrer: document.referrer,
        queryParams: Object.fromEntries(new URLSearchParams(window.location.search)),
        hash: window.location.hash,
        performance: performanceMetrics,
        ...analyticsData
      });

      // Track performance metrics separately
      if (Object.keys(performanceMetrics).length > 0) {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/analytics/performance`, {
          sessionId,
          performanceMetrics
        });
      }
    } catch (error) {
      console.error('Error tracking page view:', error);
    }
  };

  const trackPageExit = async () => {
    const duration = Math.floor((Date.now() - pageStartTime) / 1000);
    if (duration > 0 && currentPage) {
      try {
        await axios.post(`${import.meta.env.VITE_API_BASE_URL}/analytics/page-exit`, {
          sessionId,
          path: currentPage,
          duration,
          scrollDepth: scrollDepthRef.current
        });
      } catch (error) {
        console.error('Error tracking page exit:', error);
      }
    }
  };

  const trackEvent = async (eventName, properties = {}, category = null, action = null, label = null, value = null) => {
    try {
      const eventData = {
        sessionId,
        visitorId,
        eventName,
        category: category || eventName.split('_')[0],
        action: action || eventName,
        label: label || properties.element?.tagName || properties.form?.id || eventName,
        value: value || properties.depth || properties.duration || 1,
        properties,
        page: window.location.pathname,
        element: properties.element ? `${properties.element.tagName}.${properties.element.id || properties.element.className}` : null,
        coordinates: properties.coordinates || null,
        timestamp: new Date().toISOString()
      };

      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/analytics/event`, eventData);
    } catch (error) {
      console.error('Error tracking event:', error);
    }
  };

  // Enhanced tracking methods
  const trackDownload = (fileUrl, fileName) => {
    trackEvent('download', {
      file: fileName || fileUrl,
      url: fileUrl
    }, 'engagement', 'download', fileName);
  };

  const trackVideo = (action, videoId, currentTime, duration) => {
    trackEvent(`video_${action}`, {
      videoId,
      currentTime,
      duration,
      percentComplete: duration > 0 ? (currentTime / duration) * 100 : 0
    }, 'media', `video_${action}`, videoId, currentTime);
  };

  const trackConversion = (conversionName, value = 0, properties = {}) => {
    trackEvent('conversion', {
      conversionName,
      value,
      ...properties
    }, 'conversion', 'complete', conversionName, value);
  };

  const trackError = (errorMessage, stackTrace, componentStack) => {
    trackEvent('error', {
      errorMessage,
      stackTrace,
      componentStack,
      url: window.location.href,
      userAgent: navigator.userAgent
    }, 'error', 'javascript_error', errorMessage);
  };

  const value = {
    trackEvent,
    trackPageView,
    trackDownload,
    trackVideo,
    trackConversion,
    trackError,
    sessionId,
    visitorId
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
};


















































// // context/AnalyticsContext.js
// import React, { createContext, useContext, useState, useEffect } from 'react';
// import axios from 'axios';
// import { v4 as uuidv4 } from 'uuid';

// const AnalyticsContext = createContext();

// export const AnalyticsProvider = ({ children }) => {
//   const [sessionId, setSessionId] = useState('');
//   const [visitorId, setVisitorId] = useState('');
//   const [currentPage, setCurrentPage] = useState('');
//   const [pageStartTime, setPageStartTime] = useState(Date.now());

//   useEffect(() => {
//     initializeAnalytics();
//     setupPageTracking();
//     setupVisibilityTracking();
//   }, []);

//   const initializeAnalytics = () => {
//     // Generate or retrieve visitor ID
//     let storedVisitorId = localStorage.getItem('visitorId');
//     if (!storedVisitorId) {
//       storedVisitorId = uuidv4();
//       localStorage.setItem('visitorId', storedVisitorId);
//     }
//     setVisitorId(storedVisitorId);

//     // Generate session ID
//     const newSessionId = uuidv4();
//     setSessionId(newSessionId);

//     // Track session start
//     trackSessionStart();
//   };

//   const setupPageTracking = () => {
//     // Track page changes
//     const handleRouteChange = () => {
//       trackPageView(window.location.pathname, document.title);
//     };

//     // Listen for route changes (for React Router)
//     window.addEventListener('popstate', handleRouteChange);
    
//     // Override pushState to detect route changes
//     const originalPushState = history.pushState;
//     history.pushState = function (...args) {
//       originalPushState.apply(this, args);
//       handleRouteChange();
//     };

//     return () => {
//       window.removeEventListener('popstate', handleRouteChange);
//     };
//   };

//   const setupVisibilityTracking = () => {
//     const handleVisibilityChange = () => {
//       if (document.visibilityState === 'visible') {
//         setPageStartTime(Date.now());
//       } else if (document.visibilityState === 'hidden') {
//         trackPageDuration();
//       }
//     };

//     document.addEventListener('visibilitychange', handleVisibilityChange);

//     // Track beforeunload for session duration
//     window.addEventListener('beforeunload', trackSessionEnd);

//     return () => {
//       document.removeEventListener('visibilitychange', handleVisibilityChange);
//       window.removeEventListener('beforeunload', trackSessionEnd);
//     };
//   };

//   const trackSessionStart = async () => {
//     try {
//       const analyticsData = await collectAnalyticsData();
//       await axios.post(`${import.meta.env.VITE_API_BASE_URL}/analytics/session/start`, {
//         sessionId,
//         visitorId,
//         ...analyticsData
//       });
//     } catch (error) {
//       console.error('Error tracking session start:', error);
//     }
//   };

//   const trackSessionEnd = async () => {
//     try {
//       const sessionDuration = Math.floor((Date.now() - pageStartTime) / 1000);
//       await axios.post(`${import.meta.env.VITE_API_BASE_URL}/analytics/session/end`, {
//         sessionId,
//         duration: sessionDuration
//       }, {
//         headers: { 'Content-Type': 'application/json' },
//         // Use sendBeacon for reliable sending before page unload
//         keepalive: true
//       });
//     } catch (error) {
//       // Use navigator.sendBeacon as fallback
//       const blob = new Blob([JSON.stringify({
//         sessionId,
//         duration: Math.floor((Date.now() - pageStartTime) / 1000)
//       })], { type: 'application/json' });
//       navigator.sendBeacon(`${import.meta.env.VITE_API_BASE_URL}/analytics/session/end`, blob);
//     }
//   };

//   const trackPageView = async (path, title) => {
//     // Track previous page duration
//     trackPageDuration();

//     // Set new page start time
//     setPageStartTime(Date.now());
//     setCurrentPage(path);

//     try {
//       const analyticsData = await collectAnalyticsData();
//       await axios.post(`${import.meta.env.VITE_API_BASE_URL}/analytics/pageview`, {
//         sessionId,
//         visitorId,
//         path,
//         title,
//         ...analyticsData
//       });
//     } catch (error) {
//       console.error('Error tracking page view:', error);
//     }
//   };

//   const trackPageDuration = async () => {
//     const duration = Math.floor((Date.now() - pageStartTime) / 1000);
//     if (duration > 0 && currentPage) {
//       try {
//         await axios.post(`${import.meta.env.VITE_API_BASE_URL}/analytics/page-duration`, {
//           sessionId,
//           path: currentPage,
//           duration
//         });
//       } catch (error) {
//         console.error('Error tracking page duration:', error);
//       }
//     }
//   };

//   const trackEvent = async (eventName, properties = {}) => {
//     try {
//       await axios.post(`${import.meta.env.VITE_API_BASE_URL}/analytics/event`, {
//         sessionId,
//         visitorId,
//         eventName,
//         properties,
//         timestamp: new Date().toISOString()
//       });
//     } catch (error) {
//       console.error('Error tracking event:', error);
//     }
//   };

//   const collectAnalyticsData = async () => {
//     // Get screen resolution
//     const screenResolution = {
//       width: window.screen.width,
//       height: window.screen.height
//     };

//     // Get language
//     const language = navigator.language;

//     // Get referrer
//     const referrer = document.referrer;

//     // Parse user agent (you might want to use a library like ua-parser-js)
//     const userAgent = navigator.userAgent;

//     return {
//       userAgent,
//       screenResolution,
//       language,
//       referrer,
//       landingPage: window.location.pathname,
//       urlParams: Object.fromEntries(new URLSearchParams(window.location.search))
//     };
//   };

//   const value = {
//     trackEvent,
//     trackPageView,
//     sessionId,
//     visitorId
//   };

//   return (
//     <AnalyticsContext.Provider value={value}>
//       {children}
//     </AnalyticsContext.Provider>
//   );
// };

// export const useAnalytics = () => {
//   const context = useContext(AnalyticsContext);
//   if (!context) {
//     throw new Error('useAnalytics must be used within an AnalyticsProvider');
//   }
//   return context;
// };


