"use client";

import { createContext, useContext, useEffect, useState } from 'react';

/**
 * Lytics SDK Type Definitions
 */
export interface LyticsSDK {
  /**
   * Send a custom event to Lytics
   * @param eventName - Name of the custom event
   * @param data - Optional event data
   */
  send: (eventName: string, data?: Record<string, any>) => void;

  /**
   * Identify a user with attributes
   * @param attributes - User attributes to send
   */
  identify: (attributes: Record<string, any>) => void;

  /**
   * Track a page view
   * @param data - Optional page view data
   */
  pageView: (data?: Record<string, any>) => void;

  /**
   * Get the Lytics user ID
   * @param callback - Callback function that receives the user ID
   */
  getid: (callback: (id: string) => void) => void;

  /**
   * Set the Lytics user ID
   * @param id - User ID to set
   */
  setid: (id: string) => void;

  /**
   * Load an entity (user profile)
   * @param entityName - Name of the entity to load
   * @param callback - Callback function that receives the entity data
   */
  loadEntity: (entityName: string, callback: (entity: any) => void) => void;

  /**
   * Get an entity (user profile)
   * @param entityName - Name of the entity to get
   */
  getEntity: (entityName: string) => any;

  /**
   * Register an event listener
   * @param event - Event name
   * @param callback - Callback function
   */
  on: (event: string, callback: (...args: any[]) => void) => void;

  /**
   * Register a one-time event listener
   * @param event - Event name
   * @param callback - Callback function
   */
  once: (event: string, callback: (...args: any[]) => void) => void;

  /**
   * Unblock the SDK (for GDPR compliance)
   */
  unblock: () => void;
}

/**
 * Lytics Context
 * 
 * Provides access to the Lytics SDK throughout the application.
 * Similar to PersonalizeContext, this wraps the Lytics jstag SDK.
 */
const LyticsContext = createContext<LyticsSDK | null>(null);

/**
 * Get the Lytics SDK instance
 * This function waits for the Lytics SDK to be loaded before returning it.
 */
export async function getLyticsInstance(): Promise<LyticsSDK | null> {
  // Check if Lytics account ID is configured
  const lyticsAccountId = process.env.NEXT_PUBLIC_LYTICS_ACCOUNT_ID;
  
  if (!lyticsAccountId) {
    console.warn('Lytics: Account ID not configured');
    return null;
  }

  // Wait for jstag to be available
  return new Promise((resolve) => {
    const checkLytics = () => {
      if (typeof window !== 'undefined' && window.jstag) {
        resolve(window.jstag as LyticsSDK);
      } else {
        setTimeout(checkLytics, 100);
      }
    };
    checkLytics();
  });
}

/**
 * Lytics Provider Component
 * 
 * Wrap your application with this provider to enable Lytics tracking.
 * 
 * @example
 * ```tsx
 * <LyticsProvider>
 *   <YourApp />
 * </LyticsProvider>
 * ```
 */
export function LyticsProvider({ children }: { children: React.ReactNode }) {
  const [sdk, setSdk] = useState<LyticsSDK | null>(null);

  useEffect(() => {
    getLyticsInstance().then(setSdk);
  }, []);

  return (
    <LyticsContext.Provider value={sdk}>
      {children}
    </LyticsContext.Provider>
  );
}

/**
 * useLytics Hook
 * 
 * Access the Lytics SDK from any component.
 * 
 * @returns The Lytics SDK instance or null if not loaded
 * 
 * @example
 * ```tsx
 * function MyComponent() {
 *   const lytics = useLytics();
 * 
 *   const handleClick = () => {
 *     if (lytics) {
 *       lytics.send('button_clicked', { button: 'cta' });
 *     }
 *   };
 * 
 *   return <button onClick={handleClick}>Click Me</button>;
 * }
 * ```
 */
export function useLytics(): LyticsSDK | null {
  return useContext(LyticsContext);
}

/**
 * Higher-Order Component to inject Lytics into a component
 * 
 * @example
 * ```tsx
 * const MyComponentWithLytics = withLytics(MyComponent);
 * ```
 */
export function withLytics<P extends { lytics?: LyticsSDK | null }>(
  Component: React.ComponentType<P>
) {
  return function WithLyticsComponent(props: Omit<P, 'lytics'>) {
    const lytics = useLytics();
    return <Component {...(props as P)} lytics={lytics} />;
  };
}


