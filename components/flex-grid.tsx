import React from 'react';
import { FlexGridProps } from '@/core/types/Props';
import { VB_EmptyBlockParentClass} from "@contentstack/live-preview-utils"; 
import RenderComponents from './render-components';
import { cn } from '@/core/lib/utils';

// Helper function to get colspan class
function getColspanClass(element: any){
  if (!element) return "";
  const colspan = element.rendering_options?.colspan ?? ""; 
  const colspanClass = colspan == "" || colspan == "1" ? "" : "col-span-" + colspan;
  return colspanClass;
}

export default function FlexGrid(props: FlexGridProps) {

  const smallCols = props.flexGrid.column_settings.small_device_columns;
  const mediumCols = props.flexGrid.column_settings.medium_device_columns;
  const largeCols = props.flexGrid.column_settings.large_device_columns;

  const components = props.flexGrid.components.components;
  
  
  const bgImage = props.flexGrid.display_options.background_image?.filename;
  const backgroundStyle =  bgImage? { backgroundImage: `url('${bgImage}')` } : {};

  

  const primaryBackground = props.flexGrid.display_options.background_color == "Primary";
  const secondaryBackground = props.flexGrid.display_options.background_color == "Secondary";
  const tertiaryBackground = props.flexGrid.display_options.background_color == "Tertiary";
  const isFullWidth = props.flexGrid.display_options.full_width;
  const isCentered = props.flexGrid.display_options.centered;
  const bordered = props.flexGrid.display_options.bordered;
  const addMargins = props.flexGrid.display_options.add_margins;
  const addTopMargin = props.flexGrid.display_options.add_top_margin;
  const addBottomMargin = props.flexGrid.display_options.add_bottom_margin;


  return (
     <div 
        className={cn({
            'container mx-auto': !isFullWidth,
            'flex flex-col items-center': isCentered,
            'px-12 container mx-auto': bordered,
            'bg-primary text-primary-foreground': primaryBackground,
            'bg-secondary text-secondary-foreground': secondaryBackground,
            'bg-tertiary text-tertiary-foreground': tertiaryBackground,
            'lg:px-12 px-4 container mx-auto' : addMargins,
            'mt-6' : addTopMargin,
            'mt-0' : !addTopMargin,
            'mb-6' : addBottomMargin,
            'mb-0' : !addBottomMargin
          })}
          style={backgroundStyle}
        >
     <div
          className={`space-y-8 max-w-full ${
            !components || components.length === 0
              ? VB_EmptyBlockParentClass // Adding a class if no blocks are present
              : ""
          }`}
          {...(props.flexGrid.components?.$?.components ?? {} )} // Adding editable tags if available
           data-add-direction="vertical"
        >
        <div className={`grid grid-cols-${smallCols} md:grid-cols-${mediumCols} lg:grid-cols-${largeCols} gap-4`}>
            {components?.map((component: any, key: number) => {
              // For colspan, we need to check the component itself, not the nested object
              // The rendering_options should be at the component level
              const elementForColspan = component;

              return (
                <div 
                  key={`component-${key}`} 
                  {...props.flexGrid.components?.$?.[`components__${key}`]} 
                  className={getColspanClass(elementForColspan)}
                >
                  <RenderComponents
                    components={[component]}
                    page={props.page}
                    rendering={props.flexGrid}
                    $={props.flexGrid.components.$}
                    contentTypeUid="page"
                    entryUid={props.page.uid || ""}
                    locale={props.page.locale || "en-us"}
                  />
                </div>
              );
            })}
        </div>
      </div>
      </div>
  );
}