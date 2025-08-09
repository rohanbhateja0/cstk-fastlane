

import ThemeProvider from "@/core/context/ThemeContext"
import { ThemeSelector } from "./ThemeSelector";
import { createServerContext } from 'react';
import { GetFooter } from "@/core/ContentQueries/GetFooter";
import { FooterFields } from "@/core/types/components/Footer";
import { CMSLink } from "@/core/atoms/Link";
import { CMSImage } from "@/core/atoms/Image";

export default async function Footer () {
  
  const footer = await GetFooter() as FooterFields;

  return (
<>
  <footer>
    <div id="footer" className="[&amp;_div.row]:py-2 bg-foreground text-background [&amp;_ul]:list-disc">
      <div className="flex flex-col">
        <div className="basis-full sxa-bordered test">
          <div className="w-full">
            <div className="flex flex-col items-center lg:px-12 px-4 container mx-auto">
              <div className="component link-list basis-full bottom-low-space top-medium-space position-center linklist">
                
                <ul className="flex gap-5">
                  {footer.top_links.map((item, index) => { 
                    //note the original markup sample had odd as first item, not even
                    const classes = index == 0 ? "odd first" : index % 2 === 0 ? "odd" : "even";
                    return(
                    <li className={`item${index} ${classes} first:list-none`} key={index}>
                      <div className="field-link"><a className="mr-2" href={item.href}>{item.title}</a></div>
                    </li>)
                  })}
                </ul>
              </div>
              
            <div className="component link-list basis-full position-center bottom-low-space top-low-space linklist">
              <ul className="flex gap-5">
                
                 {footer.bottom_links.map((item, index) => { 
                    //note the original markup sample had odd as first item, not even
                    const classes = index == 0 ? "odd first" : index % 2 === 0 ? "odd" : "even";
                    return(
                    <li className={`item${index} ${classes} first:list-none`} key={index}>
                      <div className="field-link"><a className="mr-2" href={item.href} >{item.title}</a></div>
                    </li>)
                  })}
              </ul>
            </div>
            
            <div className="component rich-text inline-block basis-full position-center">
              <div className="component-content">
                <div className="[&amp;_h1]:font-bold [&amp;_h1]:mb-6 [&amp;_h1]:mt-8   [&amp;_h2]:mb-4 [&amp;_h2:first-of-type]:border-b [&amp;_h2]:pb-2   [&amp;_h3]:mb-3 [&amp;_h3]:mt-5   [&amp;_p]:my-4 [&amp;_p]:leading-relaxed   [&amp;_ul]:list-disc [&amp;_ul]:list-inside [&amp;_ul]:m-6   [&amp;_ol]:list-decimal [&amp;_ol]:ml-6 [&amp;_ol]:my-4   [&amp;_li]:mb-2   [&amp;_blockquote]:border-l-4 [&amp;_blockquote]:border-gray-300 [&amp;_blockquote]:pl-6 [&amp;_blockquote]:italic [&amp;_blockquote]:my-4 [&amp;_blockquote]:text-base   [&amp;_a]:underline [&amp;_a:hover]:text-blue-800 [&amp;_a]:underline-offset-4   [&amp;_table]:w-full [&amp;_table]:border-collapse [&amp;_table]:my-4   [&amp;_th]:border [&amp;_th]:border-gray-300 [&amp;_th]:bg-gray-100 [&amp;_th]:p-2 [&amp;_th]:text-left   [&amp;_td]:border [&amp;_td]:border-gray-300 [&amp;_td]:p-2   [&amp;_tr:nth-child(odd)]:bg-gray-200 [&amp;_figure]:w-full">
                  <div className="ck-content">
                    <div>
                      <p className="text-center text-sm" {...(footer?.$?.disclaimer ?? {} )}>{footer.disclaimer}</p>
                      <p className="flex justify-center">
                        <CMSLink link={footer.appstore_links.link_1}>
                          <CMSImage image={footer.appstore_links.link_1_image} alt={footer.appstore_links.link_1.title} />
                        </CMSLink>
                        <CMSLink link={footer.appstore_links.link_2}>
                          <CMSImage image={footer.appstore_links.link_2_image} alt={footer.appstore_links.link_2.title} />
                        </CMSLink>
                        <CMSLink link={footer.appstore_links.link_3}>
                          <CMSImage image={footer.appstore_links.link_3_image} alt={footer.appstore_links.link_3.title} />
                        </CMSLink>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <ThemeProvider>
              <ThemeSelector></ThemeSelector>
            </ThemeProvider>

            <div className="component rich-text inline-block basis-full position-center">
              <div className="component-content">
                <div className="[&amp;_h1]:font-bold [&amp;_h1]:mb-6 [&amp;_h1]:mt-8   [&amp;_h2]:mb-4 [&amp;_h2:first-of-type]:border-b [&amp;_h2]:pb-2   [&amp;_h3]:mb-3 [&amp;_h3]:mt-5   [&amp;_p]:my-4 [&amp;_p]:leading-relaxed   [&amp;_ul]:list-disc [&amp;_ul]:list-inside [&amp;_ul]:m-6   [&amp;_ol]:list-decimal [&amp;_ol]:ml-6 [&amp;_ol]:my-4   [&amp;_li]:mb-2   [&amp;_blockquote]:border-l-4 [&amp;_blockquote]:border-gray-300 [&amp;_blockquote]:pl-6 [&amp;_blockquote]:italic [&amp;_blockquote]:my-4 [&amp;_blockquote]:text-base   [&amp;_a]:underline [&amp;_a:hover]:text-blue-800 [&amp;_a]:underline-offset-4   [&amp;_table]:w-full [&amp;_table]:border-collapse [&amp;_table]:my-4   [&amp;_th]:border [&amp;_th]:border-gray-300 [&amp;_th]:bg-gray-100 [&amp;_th]:p-2 [&amp;_th]:text-left   [&amp;_td]:border [&amp;_td]:border-gray-300 [&amp;_td]:p-2   [&amp;_tr:nth-child(odd)]:bg-gray-200 [&amp;_figure]:w-full">
                  <p className="rte-align-center" {...(footer?.$?.copyright ?? {} )}>{footer.copyright}</p>
                </div>
              </div>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  </div>
</footer>
</>);
};


