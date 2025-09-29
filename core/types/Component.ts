import { AccordionFields } from "./components/Accordion";
import { BreadcrumbFields } from "./components/Breadcrumb";
import { ContentCardFields } from "./components/ContentCard";
import { ContentSectionFields } from "./components/ContentSection";
import { FlexGridFields } from "./components/FlexGrid";
import { HeroBannerFields } from "./components/HeroBanner";
import { ImageFields, RichTextFields, VideoFields } from "./components/SimpleTypes";

export type Component = {
  rich_text: RichTextFields;
  image: ImageFields;
  content_section: ContentSectionFields;
  flex_grid: FlexGridFields;
  content_card: ContentCardFields;
  hero_banner: HeroBannerFields;
  accordion: AccordionFields;
  video: VideoFields;
  breadcrumb: BreadcrumbFields;
}