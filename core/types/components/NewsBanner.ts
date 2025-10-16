import { CMSImageField, CMSLinkField } from "../Fields";
import { CTAFields } from "./SimpleTypes";

export type NewsBannerContent = {
    title: string;
    description: string;
    detail_text: string;
    image: CMSImageField;
    $: any;
}

export type NewsBannerRenderingOptions = {
    header_tag: string; // H1-H6
    link_type: string; // Button, Card, Link
    content_alignment: string; // left, center, right
    $: any;
}

export type NewsBannerFields = {
    content: NewsBannerContent;
    rendering_options: NewsBannerRenderingOptions;
    call_to_action: CTAFields;
    $: any;
}
