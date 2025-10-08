import { CMSImageField, CMSLinkField } from "../Fields";

import { CTAFields } from "./SimpleTypes";

export type ContentCardContent = {
    title: string;
    category: string;
    intro_text: string;
    image: CMSImageField;
    icon: CMSImageField;
    $: any;
}

export type ContentCardRenderingOptions = {
    card_orientation: string;
    image_order: string;
    header_tag: string;
    link_type: string;
    colspan: string;
    hide_image: boolean;
    hide_border: boolean;
    use_title_as_link_text: boolean;
    swap_image: boolean;
    $: any;
}

export type ContentCardFields = {
    content: ContentCardContent;
    rendering_options: ContentCardRenderingOptions;
    call_to_action: CTAFields;
    $: any;
}
