"use client";

import { useEffect } from 'react';

/**
 * Lytics Web SDK Integration Component
 * 
 * This component loads and initializes the Lytics tracking tag.
 * Place this in your root layout to enable Lytics tracking across the site.
 * 
 * @see https://docs.lytics.com/docs/web-sdk
 */
export default function LyticsScript() {
  useEffect(() => {
    // Only load Lytics if we have an account ID configured
    const lyticsAccountId = process.env.NEXT_PUBLIC_LYTICS_ACCOUNT_ID;
    
    if (!lyticsAccountId) {
      console.warn('Lytics: NEXT_PUBLIC_LYTICS_ACCOUNT_ID not configured. Skipping initialization.');
      return;
    }

    // Check if Lytics is already loaded
    if (window.jstag && window.jstag.init) {
      console.log('Lytics: Already initialized');
      return;
    }

    // Lytics Tracking Tag Version 3
    !(function () {
      "use strict";
      var o = window.jstag || (window.jstag = {}),
        r: any[] = [];
      function n(e: string) {
        o[e] = function () {
          for (var n = arguments.length, t = new Array(n), i = 0; i < n; i++)
            t[i] = arguments[i];
          r.push([e, t]);
        };
      }
      n("send");
      n("mock");
      n("identify");
      n("pageView");
      n("unblock");
      n("getid");
      n("setid");
      n("loadEntity");
      n("getEntity");
      n("on");
      n("once");
      n("call");
      o.loadScript = function (n: string, t: () => void, i: () => void) {
        var e = document.createElement("script");
        e.async = true;
        e.src = n;
        e.onload = t;
        e.onerror = i;
        var o = document.getElementsByTagName("script")[0],
          r = (o && o.parentNode) || document.head || document.body,
          c = o || r.lastChild;
        return null != c ? r.insertBefore(e, c) : r.appendChild(e), this;
      };
      o.init = function n(t: any) {
        return (
          (this.config = t),
          this.loadScript(
            t.src,
            function () {
              if (o.init === n) throw new Error("Load error!");
              o.init(o.config);
              (function () {
                for (var n = 0; n < r.length; n++) {
                  var t = r[n][0],
                    i = r[n][1];
                  o[t].apply(o, i);
                }
                r = void 0 as any;
              })();
            },
            function () {
              console.error('Lytics: Failed to load SDK script');
            }
          ),
          this
        );
      };
    })();

    // Initialize Lytics tracking tag
    window.jstag.init({
      src: `https://c.lytics.io/api/tag/${lyticsAccountId}/latest.min.js`,
    });

    // Send initial page view
    window.jstag.pageView();

    console.log('Lytics: Initialized successfully');
  }, []);

  return null; // This component doesn't render anything
}

// TypeScript declarations for Lytics jstag
declare global {
  interface Window {
    jstag: {
      init: (config: { src: string; [key: string]: any }) => void;
      send: (eventName: string, data?: Record<string, any>) => void;
      mock: (...args: any[]) => void;
      identify: (attributes: Record<string, any>) => void;
      pageView: (data?: Record<string, any>) => void;
      unblock: () => void;
      getid: (callback: (id: string) => void) => void;
      setid: (id: string) => void;
      loadEntity: (entityName: string, callback: (entity: any) => void) => void;
      getEntity: (entityName: string) => any;
      on: (event: string, callback: (...args: any[]) => void) => void;
      once: (event: string, callback: (...args: any[]) => void) => void;
      call: (method: string, ...args: any[]) => void;
      loadScript: (src: string, onload: () => void, onerror: () => void) => void;
      config?: any;
    };
  }
}


