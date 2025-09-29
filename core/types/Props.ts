import { ContentSectionFields } from "./components/ContentSection";
import { ImageFields, RichTextFields } from "./components/SimpleTypes";
import { FlexGridFields } from "./components/FlexGrid";
import { CustomButtonFields } from "./components/CustomButton";
import { ContentCardFields } from "./components/ContentCard";
import { HeroBannerFields } from "./components/HeroBanner";
import { AccordionFields } from "./components/Accordion";
import { BreadcrumbFields } from "./components/Breadcrumb";
import { BaseComponent } from "./components/BaseComponent";

//Base Component adds pages Prop to all component props

export type ConentSectionProps = BaseComponent & {
  contentSection: ContentSectionFields;
}

export type ContentCardProps = BaseComponent & {
  contentCard: ContentCardFields;
}

export type RichTextProps = {
  richText: RichTextFields;
}

export type ImageProps = BaseComponent & {
  image: ImageFields;
}

export type FlexGridProps = BaseComponent & {
  flexGrid : FlexGridFields;
}

export type CTAButtonProps = {
  button : CustomButtonFields;
}

export type AccordionProps= BaseComponent & {
  accordion : AccordionFields;
}

export type BreadcrumbProps = BaseComponent & {
  breadcrumb: BreadcrumbFields;
}

export type HeroBannerProps = BaseComponent & {
  heroBanner: HeroBannerFields;
}

export type VideoProps = BaseComponent & {
  video: VideoProps;
}