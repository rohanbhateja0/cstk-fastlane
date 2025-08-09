'use client';

import { Menu, ChevronLeft, ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/core/ui/navigation-menu';

import { cn } from '@/core/lib/utils';
import { Button } from '@/core/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/core/ui/sheet';
import { MenuItems } from '@/core/types/components/Header';

type MegaNavProps = {
  items: MenuItems[];
};


export default function MegaNav(props: MegaNavProps){

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeItem, setActiveItem] = useState('');
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  
  
  const tabPhKey = `meganav-1`;

  const handleItemChange = (uid: string) => {
    if (activeItem === uid) {
      setActiveItem('');
      if (typeof window !== 'undefined') {
        localStorage.removeItem('active-menu-item');
      }
    } else {
      setActiveItem(uid);
      if (typeof window !== 'undefined') {
        localStorage.setItem('active-menu-item', uid);
      }
    }
  };

  // Close on mobile menu open
  useEffect(() => {
    if (isMobileMenuOpen) {
      setActiveItem('');
    }
  }, [isMobileMenuOpen]);

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeItem && !(event.target as Element).closest('.mega-nav-container')) {
        setActiveItem('');
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActiveItem('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [activeItem]);

  return (
    <div className={`w-full mega-nav-container relative`}>
      { (
        <>
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu className="w-full" role="navigation" aria-label="Main menu">
              <NavigationMenuList className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-none [&_button]:!bg-transparent [&_li]:-ml-4 [&_li]:w-max">
                {props.items.map((menuItem) => {
                  const item = menuItem.menu_item;
                  const isActive = activeItem === item.link.href;
                  const title = item.link.title;
                  return (
                    <NavigationMenuItem key={item.link.href}>
                      <NavigationMenuTrigger
                        onClick={() => handleItemChange(item?.link.href || '')}
                        className={cn(
                          '[&>svg:nth-of-type(2)]:hidden bg-background inline-flex h-full w-full items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50',
                          isActive ? 'text-accent-foreground' : 'text-foreground'
                        )}
                        aria-current={isActive ? 'page' : undefined}
                        aria-haspopup="true"
                        aria-controls={`menu-panel-${item.link.href}`}
                        aria-expanded={isActive}
                      >
                        {title && (
                          <span className="font-bold mr-2">
                              {item.link.title}
                          </span> 
                        )}
                        <ChevronDown
                          className={cn(
                            'h-4 w-4 transition-transform duration-200 ml-2',
                            isActive ? 'rotate-180' : 'rotate-0'
                          )}
                        />
                      </NavigationMenuTrigger>
                    </NavigationMenuItem>
                  );
                })}
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Mobile Navigation */}
          <div className={cn('md:hidden', activeItem && 'active-menu-item')}>
            <div className="flex items-center justify-between p-4 border-b">
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
                  <div
                    className={cn('flex flex-col max-md:mt-6', activeItem && 'active-menu-item')}
                  >
                    {activeItem ? (
                      <>
                        <div className="flex items-center mb-4">
                          <button
                            onClick={() => handleItemChange('')}
                            className="flex items-center text-sm text-muted-foreground hover:text-foreground"
                          >
                            <ChevronLeft className="mr-2 h-4 w-4 shrink-0 transition-transform duration-200" />
                            {props.items.find((item) => item.menu_item.link.href === activeItem)?.menu_item.link.title
                               || 'Back'}
                          </button>
                        </div>

                        <div>
                          
                        </div>
                      </>
                    ) : (
                      <div className="flex flex-col space-y-2">
                        {props.items.map((menuItem) => {
                          const item = menuItem.menu_item;
                          const title = item.link.title;
                          return (
                            <Button
                              key={item.link.href}
                              variant="ghost"
                              className="justify-start"
                              onClick={() => handleItemChange(item?.link.href || '')}
                            >
                              {title && <div>{title}</div>}
                            </Button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  <div>
                    
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Desktop Submenu Panel */}
          {activeItem && (
            <div
              className={cn(
                'w-full mega-menu-overlay [&_.linklist>ul]:flex-col [&_.linklist>ul>li>div>a]:text-foreground rounded-lg overflow-hidden',
                'sticky left-0 top-0 right-0 z-50'
              )}
            >
              <div
                className="absolute inset-0 bg-black/20"
                onClick={() => setActiveItem('')}
                aria-hidden="true"
              />
              <div
                className="relative w-full bg-white max-h-[80vh] navigation-menu "
                role="dialog"
                aria-modal="true"
                id={`menu-panel-${activeItem}`}
              >
                <div className='block'>
                  
                </div>
              </div>
            </div>
          )}

          {/* Mobile Menu Content and editing mode */}
          <div className={'md:hidden'}>
            <div>
              
            </div>
          </div>
        </>
      )}
    </div>
  );
};

