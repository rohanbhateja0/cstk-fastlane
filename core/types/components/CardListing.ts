import { CMSImageField, CMSLinkField } from "../Fields";
import { CTAFields } from "./SimpleTypes";

export type CardListingContent = {
  title?: string;
  description?: string;
  $: any;
}

export type CardListingRenderingOptions = {
  cards_per_row?: {
    desktop?: number;
    tablet?: number;
    mobile?: number;
  };
  show_card_borders?: boolean;
  card_spacing?: number;
  $: any;
}

export type CardListingCard = {
  // Cards are always references with UID and content type
  uid: string;
  _content_type_uid: string;
  $: any;
}

export type CardListingFields = {
  title?: string;
  description?: string;
  cards: CardListingCard[];
  rendering_options?: CardListingRenderingOptions;
  $: any;
}
