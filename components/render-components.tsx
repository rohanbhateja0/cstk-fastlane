import React from 'react';
import ContentSection from './content-section';
import { Component } from '@/core/types/Component';
import ImageComponent from './image';
import RichText from './rich-text';
import FlexGrid from './flex-grid';
import ContentCard from './ContentCard';
import HeroBanner from './HeroBanner';
import NewsSection from './NewsSection';
import NewsBanner from './NewsBanner';
import Accordion from './Accordion';
import Breadcrumb from './Breadcrumb';
import Carousel from './Carousel';
import UserList from './UserList';
import CardListing from './CardListing';
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

        console.log('component', component);
         
        if (component.content_section) {
          return (
            <ContentSection 
              contentSection={component.content_section} 
              page={props.page} 
              key={`component-${key}`}
            />
          );
        }
        if (component.content_card) {
          console.log('inside content card');
          return (
            <ContentCard 
              contentCard={component.content_card} 
              page={props.page}  
              key={`component-${key}`}
            />
          );
        }

        if (component.hero_banner) {
          return (
            <HeroBanner 
              heroBanner={component.hero_banner} 
              page={props.page} 
              key={`component-${key}`}
            />
          );
        }

        if (component.flex_grid){
          return (
            <FlexGrid 
              flexGrid={component.flex_grid} 
              page={props.page} 
              key={`component-${key}`}
            />
          );
        }
        if (component.image){
          return (
            <ImageComponent 
              image={component.image} 
              page={props.page} 
              key={`component-${key}`}
            />
          );
        }
        if (component.rich_text){
          return (
            <RichText 
              richText={component.rich_text} 
              key={`component-${key}`}
            />
          );
        }
        if (component.accordion){
          return (
            <Accordion 
              accordion={component.accordion} 
              page={props.page} 
              key={`component-${key}`}
            />
          );
        }
        if (component.breadcrumb){
          return (
            <Breadcrumb 
              breadcrumb={component.breadcrumb} 
              page={props.page} 
              key={`component-${key}`}
            />
          );
        }
        if (component.carousel){
          return (
            <Carousel 
              carousel={component.carousel} 
              page={props.page} 
              key={`component-${key}`}
            />
          );
        }

        if (component.user_list){
          return (
            <UserList 
              userList={component.user_list} 
              page={props.page} 
              key={`component-${key}`}
            />
          );
        }

        if (component.card_listing){
          return (
            <CardListing 
              cardListing={component.card_listing} 
              page={props.page} 
              key={`component-${key}`}
            />
          );
        }

        if (component.news_section){
          return (
            <NewsSection 
              newsSection={component.news_section} 
              page={props.page} 
              key={`component-${key}`}
            />
          );
        }

        if (component.news_banner){
          return (
            <NewsBanner 
              newsBanner={component.news_banner} 
              page={props.page} 
              key={`component-${key}`}
            />
          );
        }

      })}
    </div>
  );
}