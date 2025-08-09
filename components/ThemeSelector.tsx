'use client';

import { JSX, useState, useEffect } from 'react';
import { useTheme } from '@/core/context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

interface ThemeSelectorProps {
  className?: string;
}

export const ThemeSelector = ({ className = '' }: ThemeSelectorProps): JSX.Element => {
  const { theme, toggleTheme } = useTheme();

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (<></>); // Render nothing on the server
  }

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className={`p-2 rounded-full hover:shadow-[0_0_6px_2px_rgba(107,182,0,0.3)] dark:hover:shadow-[0_0_6px_2px_rgba(107,182,0,0.2)] transition-all duration-200 ease-in-out ${className}`}
    >
      {theme === 'light' ? (
        <Moon className="h-5 w-5 text-primary rounded-full" />
      ) : (
        <Sun className="h-5 w-5 text-chart-3 rounded-full" />
      )}
    </button>
  );
};
