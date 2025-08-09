import { CMSImageField, CMSLinkField } from "../Fields";
import { CTAFields } from "./SimpleTypes";

export type ContentSectionContent = {
    title: string;
    category: string;
    intro_text: string;
    image: CMSImageField;
    background_image: CMSImageField;
    $: any;
}

export type ContentSectionRenderingOptions = {
    header_tag: string;
    image_order: string;
    alignment: string;
    card_orientation: string;
    colspan: string;
    $: any;
}

export type ContentSectionFields = {
  content: ContentSectionContent;
  call_to_action: CTAFields;
  rendering_options: ContentSectionRenderingOptions;
  $: any;
}

