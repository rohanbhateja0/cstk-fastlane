import { GetHeader } from "@/core/ContentQueries/GetHeader";
import { HeaderFields } from "@/core/types/components/Header";
import { CMSLink } from "@/core/atoms/Link";
import { CMSImage } from "@/core/atoms/Image";
import ServerCTAButton from "./server-cta-button";
import ServerMegaNav from "./ServerMegaNav";
import LanguageSwitcher from "./LanguageSwitcher";
import { Locale } from "@/lib/i18n";

interface HeaderProps {
  locale: Locale;
}

export default async function Header({ locale }: HeaderProps) {
  const header = (await GetHeader(locale)) as HeaderFields;

  return (
    <header>
      <div
        id="header"
        className="shadow-xs bg-slate [&amp;_img]:h-20 [&amp;_img]:relative [&amp;_img]:z-50 [&amp;_img]:w-full [&amp;_img]:object-contain max-md:[&amp;_.row]:flex-row md:[&amp;_.row]:justify-end md:[&amp;_.row]:items-center [&amp;_a]:text-primary [&amp;_a]:no-underline [&amp;_ul&gt;li:last-child&gt;ul]:left-auto [&amp;_ul&gt;li:last-child&gt;ul]:right-0 [&amp;_ul&gt;li:nth-last-child(2)&gt;ul]:left-auto [&amp;_ul&gt;li:nth-last-child(2)&gt;ul]:right-0 [&amp;_a:hover&gt;div]:text-primary [&amp;_a&gt;div]:opacity-80 [&amp;_a&gt;div]:no-underline [&amp;_a&gt;div&gt;img]:max-w-4 [&amp;_.underline]:px-3 [&amp;_.underline]:py-2 h-137"
      >
        <div className="basis-full sxa-bordered">
          <div className="w-full">
            <div className="lg:px-12 px-4 container mx-auto">
              <div className="component row-splitter basis-full ">
                <div className="container-fluid">
                  <div>
                    <div className="row">
                      <div className="component column-splitter mx-2 flex flex-wrap basis-full">
                        <div className="basis-1/2 lg:basis-1/4 md:basis-1/4 px-2">
                          <div className="row">
                            <div className="component image basis-full">
                              <div className="component-content">
                                <CMSLink href={`/${locale}/`}>
                                  <CMSImage
                                    image={header.logo}
                                    alt="corporate_brand_logo"
                                    width="323"
                                    height="76"
                                  />
                                </CMSLink>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="basis-1/2 lg:basis-3/4 md:basis-3/4 px-2">
                          <div className="row">
                            {/* Empty space for logo alignment */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <div>
                      <div className="row">
                        <div className="w-full basis-full mega-nav-container relative">
                          {/* Desktop Layout */}
                          <div className="hidden md:flex items-center justify-between w-full">
                            <ServerMegaNav items={header.mega_menu} locale={locale} />

                            {/* Top Links - Desktop */}
                            <div className="flex items-center space-x-4">
                              {header.top_links.map((item, index) => {
                                return (
                                  <div
                                    key={`top-link-desktop-${index}`}
                                    className="flex-shrink-0"
                                  >
                                    <ServerCTAButton button={item.link} locale={locale} />
                                  </div>
                                );
                              })}
                              {/* Language Switcher */}
                              <LanguageSwitcher className="flex-shrink-0" />
                            </div>
                          </div>

                          {/* Mobile Layout */}
                          <div className="md:hidden">
                            <div className="flex items-center justify-between w-full">
                              <ServerMegaNav items={header.mega_menu} locale={locale} />

                              {/* Top Links - Mobile */}
                              <div className="flex items-center space-x-2">
                                {header.top_links.map((item, index) => {
                                  return (
                                    <div
                                      key={`top-link-mobile-${index}`}
                                      className="flex-shrink-0"
                                    >
                                      <ServerCTAButton button={item.link} locale={locale} />
                                    </div>
                                  );
                                })}
                                {/* Language Switcher - Mobile */}
                                <LanguageSwitcher className="flex-shrink-0" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
