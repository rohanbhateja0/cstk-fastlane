import { AccordionFields } from "./components/Accordion";
import { BreadcrumbFields } from "./components/Breadcrumb";
import { CarouselFields } from "./components/Carousel";
import { ContentCardFields } from "./components/ContentCard";
import { ContentSectionFields } from "./components/ContentSection";
import { FlexGridFields } from "./components/FlexGrid";
import { HeroBannerFields } from "./components/HeroBanner";
import { NewsSectionFields } from "./components/NewsSection";
import { NewsBannerFields } from "./components/NewsBanner";
import { ImageFields, RichTextFields, VideoFields } from "./components/SimpleTypes";
import { UserListFields } from "./components/UserList";
import { CardListingFields } from "./components/CardListing";

export type Component = {
  rich_text: RichTextFields;
  image: ImageFields;
  content_section: ContentSectionFields;
  flex_grid: FlexGridFields;
  content_card: ContentCardFields;
  hero_banner: HeroBannerFields;
  news_section: NewsSectionFields;
  news_banner: NewsBannerFields;
  accordion: AccordionFields;
  video: VideoFields;
  breadcrumb: BreadcrumbFields;
  carousel: {
    carousels: CarouselFields[];
    _metadata?: any;
    $: any;
  };
  user_list: UserListFields;
  card_listing: CardListingFields;
}