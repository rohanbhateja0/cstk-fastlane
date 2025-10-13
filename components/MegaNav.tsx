'use client';

import { Menu } from 'lucide-react';
import { useEffect, useState } from 'react';

import { cn } from '@/core/lib/utils';
import { Button } from '@/core/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/core/ui/sheet';
import { MenuItems } from '@/core/types/components/Header';
import Link from 'next/link';

type MegaNavProps = {
  items: MenuItems[];
};


export default function MegaNav(props: MegaNavProps){

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => { 
    setHasMounted(true);
  }, []);

  return (
    <div className={`w-full mega-nav-container relative`}>
      { (
        <>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <nav className="w-full" role="navigation" aria-label="Main menu">
              <ul className="inline-flex h-12 w-full items-center justify-start gap-2 rounded-none">
                {props.items.map((menuItem) => {
                  const item = menuItem.menu_item;
                  const title = item.link.title;
                  const href = item.link.href;
                  
                  return (
                    <li key={href} className="w-max">
                      <Link
                        href={href}
                        className={cn(
                          'bg-transparent border-transparent inline-flex h-full w-full items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground rounded-md'
                        )}
                      >
                        {title && (
                          <span className="font-bold">
                              {title}
                          </span> 
                        )}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <div className="flex items-center justify-between p-4 border-b border-transparent bg-transparent">
              <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Toggle menu"
                    className="ml-auto p-2 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                  >
                    <Menu className="h-6 w-6 transition-transform duration-200" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-[100%] sm:w-[350px]"
                  role="dialog"
                  aria-modal="true"
                  id="mobile-nav"
                >
                  <div className="flex flex-col max-md:mt-6">
                    <div className="flex flex-col space-y-2">
                      {props.items.map((menuItem) => {
                        const item = menuItem.menu_item;
                        const title = item.link.title;
                        const href = item.link.href;
                        
                        return (
                          <Link
                            key={href}
                            href={href}
                            className="flex items-center justify-start px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded-md border-transparent bg-transparent"
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            {title && <div>{title}</div>}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

        </>
      )}
    </div>
  );
};

