import React from 'react';
import ContentSection from './content-section';
import { Component } from '@/core/types/Component';
import ImageComponent from './image';
import RichText from './rich-text';
import FlexGrid from './flex-grid';
import ContentCard from './ContentCard';
import Accordion from './Accordion';
import { BaseComponent } from '@/core/types/components/BaseComponent';

type RenderProps = BaseComponent & {
  components: Component[];
  rendering: any;
}

export default function RenderComponents(props: RenderProps) {
  const { components } = props;

  return (
    <>
      {components?.map((component, key: number) => {
        if (component.content_section) {
          return (
           <div key={`component-${key}`} {...props.rendering.$?.[`components__${key}`]}>
              <ContentSection contentSection={component.content_section} page={props.page} key={`component-${key}`} />
            </div>
          );
        }
        if (component.content_card) {
          return (
             <div key={`component-${key}`} {...props.rendering.$?.[`components__${key}`]}>
            <ContentCard contentCard={component.content_card} page={props.page}  key={`component-${key}`} />
            </div>
          );
        }

        if (component.flex_grid){
          return (
            <div key={`component-${key}`} {...props.rendering.$?.[`components__${key}`]}>
              <FlexGrid flexGrid={component.flex_grid} page={props.page} key={`component-${key}`} />
            </div>
          );
        }
        if (component.image){
          return (
            <div key={`component-${key}`} {...props.rendering.$?.[`components__${key}`]}>
              <ImageComponent image={component.image} page={props.page} key={`component-${key}`} />
            </div>
          );
        }
        if (component.rich_text){
          return (
            <div key={`component-${key}`} {...props.rendering.$?.[`components__${key}`]}>
              <RichText richText={component.rich_text} page={props.page} key={`component-${key}`} />
            </div>
          );
        }
        if (component.accordion){
          return (
            <div key={`component-${key}`} {...props.rendering.$?.[`components__${key}`]}>
              <Accordion accordion={component.accordion} page={props.page} key={`component-${key}`} />
            </div>
          );
        }

      })}
    </>
  );
}