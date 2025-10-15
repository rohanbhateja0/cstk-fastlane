import { CMSImageField, CMSLinkField } from "../Fields";
import { CTAFields } from "./SimpleTypes";

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
    title: string;              // Default title field
    category: string;
    description: string;
    image: CMSImageField;
    call_to_action: CTAFields;
    rendering_options: NewsSectionRenderingOptions;
    $: any;
}
