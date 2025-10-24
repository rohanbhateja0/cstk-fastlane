import { cn } from '@/core/lib/utils';
import { MenuItems } from '@/core/types/components/Header';
import { ServerLink } from '@/core/atoms/ServerLink';
import ClientMegaNavMobile from './ClientMegaNavMobile';
import { Locale } from '@/lib/i18n';

type ServerMegaNavProps = {
  items: MenuItems[];
  locale: Locale;
};

export default function ServerMegaNav(props: ServerMegaNavProps){
  const { items, locale } = props;

  return (
    <div className={`w-full mega-nav-container relative`}>
      {/* Desktop Navigation */}
      <div className="hidden md:block">
        <nav className="w-full" role="navigation" aria-label="Main menu">
          <ul className="inline-flex h-12 w-full items-center justify-start gap-2 rounded-none">
            {items.map((menuItem) => {
              const item = menuItem.menu_item;
              const title = item.link.title;
              const href = item.link.href || '#';
              
              return (
                <li key={href} className="w-max">
                  <ServerLink
                    href={href}
                    locale={locale}
                    className={cn(
                      'bg-transparent border-transparent inline-flex h-full w-full items-center justify-center whitespace-nowrap px-4 py-2 text-sm font-medium transition-all hover:bg-accent hover:text-accent-foreground rounded-md'
                    )}
                  >
                    {title && (
                      <span className="font-bold">
                          {title}
                      </span> 
                    )}
                  </ServerLink>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>

      {/* Mobile Navigation - Client component for interactivity */}
      <ClientMegaNavMobile items={items} />
    </div>
  );
}
