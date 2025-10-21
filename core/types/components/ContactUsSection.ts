import { CMSImageField, CMSLinkField } from "../Fields";
import { CTAFields } from "./SimpleTypes";

export type ContactUsSectionRenderingOptions = {
    image_order: string;
    header_tag: string;
    link_type: string;
    hide_image: boolean;
    hide_border: boolean;
    $: any;
}

export type ContactUsSectionFields = {
    title: string;              // Default title field
    category: string;
    description: string;
    image: CMSImageField;
    call_to_action: CTAFields;
    rendering_options: ContactUsSectionRenderingOptions;
    contactus_sections?: Array<{
        uid: string;
        _content_type_uid?: string;
    }>;
    $: any;
}


