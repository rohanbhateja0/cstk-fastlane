import React from 'react';
import ContentSection from './content-section';
import { Component } from '@/core/types/Component';
import ImageComponent from './image';
import RichText from './rich-text';
import FlexGrid from './flex-grid';
import ContentCard from './ContentCard';
import HeroBanner from './HeroBanner';
import Accordion from './Accordion';
import Breadcrumb from './Breadcrumb';
import Carousel from './Carousel';
import { BaseComponent } from '@/core/types/components/BaseComponent';

type RenderProps = BaseComponent & {
  components: Component[];
  contentTypeUid: string;
  entryUid: string;
  locale: string;
  rendering: any;
  $: any; // to pass params for Visual Builder
}

export default function RenderComponents(props: RenderProps) {
  const { components, entryUid, contentTypeUid, locale } = props;

  function getColspanClass(element: any){
       const colspan = element.rendering_options?.colspan ?? ""; 
       const colspanClass = colspan == "" || colspan == "1" ? "" : "col-span-" + colspan;
       return colspanClass;
  }

  return (
    <div
      data-pageref={entryUid}
      data-contenttype={contentTypeUid}
      data-locale={locale}
    >
      {components?.map((component, key: number) => {
         
        if (component.content_section) {
          return (
           <div key={`component-${key}`} {...props.$?.[`components__${key}`]} className={getColspanClass(component.content_section)}>
              <ContentSection contentSection={component.content_section} page={props.page} key={`component-${key}`} />
            </div>
          );
        }
        if (component.content_card) {
          return (
             <div key={`component-${key}`} {...props.$?.[`components__${key}`]} className={getColspanClass(component.content_card)}>
            <ContentCard contentCard={component.content_card} page={props.page}  key={`component-${key}`} />
            </div>
          );
        }

        if (component.hero_banner) {
          return (
            <div key={`component-${key}`} {...props.$?.[`components__${key}`]} className={getColspanClass(component.hero_banner)}>
              <HeroBanner heroBanner={component.hero_banner} page={props.page} key={`component-${key}`} />
            </div>
          );
        }

        if (component.flex_grid){
          return (
            <div key={`component-${key}`} {...props.$?.[`components__${key}`]}>
              <FlexGrid flexGrid={component.flex_grid} page={props.page} key={`component-${key}`} />
            </div>
          );
        }
        if (component.image){
          return (
            <div key={`component-${key}`} {...props.$?.[`components__${key}`]} className={getColspanClass(component.image)}>
              <ImageComponent image={component.image} page={props.page} key={`component-${key}`} />
            </div>
          );
        }
        if (component.rich_text){
          return (
            <div key={`component-${key}`} {...props.$?.[`components__${key}`]} className={getColspanClass(component.rich_text)}>
              <RichText richText={component.rich_text} key={`component-${key}`} />
            </div>
          );
        }
        if (component.accordion){
          return (
            <div key={`component-${key}`} {...props.$?.[`components__${key}`]} className={getColspanClass(component.accordion)}>
              <Accordion accordion={component.accordion} page={props.page} key={`component-${key}`} />
            </div>
          );
        }
        if (component.breadcrumb){
          return (
            <div key={`component-${key}`} {...props.$?.[`components__${key}`]} className={getColspanClass(component.breadcrumb)}>
              <Breadcrumb breadcrumb={component.breadcrumb} page={props.page} key={`component-${key}`} />
            </div>
          );
        }
        if (component.carousel){
          return (
            <div key={`component-${key}`} {...props.$?.[`components__${key}`]} className={getColspanClass(component.carousel)}>
              <Carousel carousel={component.carousel} page={props.page} key={`component-${key}`} />
            </div>
          );
        }

      })}
    </div>
  );
}