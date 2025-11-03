'use client';

import { useState } from 'react';
import { Menu } from 'lucide-react';
import { cn } from '@/core/lib/utils';
import { Button } from '@/core/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/core/ui/sheet';
import { MenuItems } from '@/core/types/components/Header';
import { CMSLink } from '@/core/atoms/Link';

type ClientMegaNavMobileProps = {
  items: MenuItems[];
};

export default function ClientMegaNavMobile(props: ClientMegaNavMobileProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
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
              <nav className="flex flex-col space-y-2" role="navigation" aria-label="Mobile menu">
                {props.items.map((menuItem) => {
                  const item = menuItem.menu_item;
                  const title = item.link.title;
                  const href = item.link.href || '#';
                  
                  return (
                    <CMSLink
                      key={href}
                      href={href}
                      className={cn(
                        'flex items-center px-4 py-3 text-base font-medium transition-colors hover:bg-accent hover:text-accent-foreground rounded-md'
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {title && (
                        <span className="font-bold">
                          {title}
                        </span>
                      )}
                    </CMSLink>
                  );
                })}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
}
