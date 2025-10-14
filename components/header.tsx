
import { GetHeader } from "@/core/ContentQueries/GetHeader";
import { HeaderFields } from "@/core/types/components/Header";
import { CMSLink } from "@/core/atoms/Link";
import { CMSImage } from "@/core/atoms/Image";
import CTAButton from "./cta-button";
import MegaNav from "./MegaNav";
import Link from "next/link";

export default async function Header() {
  
  const header = await GetHeader() as HeaderFields;

  return (
      <header>
        <div id="header" className="shadow-xs bg-slate [&amp;_img]:h-20 [&amp;_img]:relative [&amp;_img]:z-50 [&amp;_img]:w-full [&amp;_img]:object-contain max-md:[&amp;_.row]:flex-row md:[&amp;_.row]:justify-end md:[&amp;_.row]:items-center [&amp;_a]:text-primary [&amp;_a]:no-underline [&amp;_ul&gt;li:last-child&gt;ul]:left-auto [&amp;_ul&gt;li:last-child&gt;ul]:right-0 [&amp;_ul&gt;li:nth-last-child(2)&gt;ul]:left-auto [&amp;_ul&gt;li:nth-last-child(2)&gt;ul]:right-0 [&amp;_a:hover&gt;div]:text-primary [&amp;_a&gt;div]:opacity-80 [&amp;_a&gt;div]:no-underline [&amp;_a&gt;div&gt;img]:max-w-4 [&amp;_.underline]:px-3 [&amp;_.underline]:py-2 h-137">
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
                                  <Link href="/">
                                  <CMSImage image={header.logo} alt="corporate_brand_logo" width="323" height="76" />
                                  </Link>
                                </div>
                              </div>
                              
                            </div>
                          </div>
                        
                        <div className="basis-1/2 lg:basis-3/4 md:basis-3/4 px-2">
                          <div className="row">
                            
                            {/* Search Link */}
                            <div className="basis-full mb-2">
                              <Link 
                                href="/search" 
                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition-colors"
                              >
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                Search
                              </Link>
                            </div>
                            
                            {header.top_links.map((item, index) => { 
                              return(
                              <div className="basis-full " key={`component-${index}`}>
                                <CTAButton button={item.link}  />                         
                              </div>)
                            })}
                            
                          </div>
                        </div>
                        
                      </div>
                    </div>
                  </div>
                  <div className="container-fluid">
                    <div>
                      <div className="row">
                        <div className="w-full basis-full  mega-nav-container relative">
                            <MegaNav items={header.mega_menu} />
                        </div>
                      </div>
                  </div>
            </div>
            </div></div></div></div></div></div>
</header>
);
}