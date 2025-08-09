import React from 'react';
import { FlexGridProps } from '@/core/types/Props';
import { VB_EmptyBlockParentClass} from "@contentstack/live-preview-utils"; 
import RenderComponents from './render-components';
import { cn } from '@/core/lib/utils';

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
          {...(props.page?.$?.flex_grid ?? {} )} // Adding editable tags if available
        >
        <div className={`grid grid-cols-${smallCols} md:grid-cols-${mediumCols} lg:grid-cols-${largeCols} gap-4`}>
            <RenderComponents
            components={components}
            page={props.page}
            rendering={props.flexGrid}
            />
        </div>
      </div>
      </div>
  );
}