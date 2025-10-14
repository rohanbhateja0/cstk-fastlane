import { CMSImageField, CMSLinkField } from "../Fields";
import { CTAFields } from "./SimpleTypes";

export type NewsSectionContent = {
    title: string;
    description: string;
    detail_text: string;
    image: CMSImageField;
    $: any;
}

export type NewsSectionRenderingOptions = {
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

export type NewsSectionFields = {
    content: NewsSectionContent;
    rendering_options: NewsSectionRenderingOptions;
    call_to_action: CTAFields;
    $: any;
}
