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
  content: {
    title: string;
    category?: string;
    intro_text?: string;
    image?: any;
    icon?: any;
    $: any;
  };
  call_to_action: {
    link?: CMSLinkField;
    secondary_link?: CMSLinkField;
    $: any;
  };
  rendering_options: {
    card_orientation?: string;
    image_order?: string;
    header_tag?: string;
    link_type?: string;
    colspan?: string;
    hide_image?: boolean;
    hide_border?: boolean;
    use_title_as_link_text?: boolean;
    swap_image?: boolean;
    $: any;
  };
  $: any;
}

export type CardListingFields = {
  title?: string;
  description?: string;
  cards: CardListingCard[];
  rendering_options?: CardListingRenderingOptions;
  $: any;
}
