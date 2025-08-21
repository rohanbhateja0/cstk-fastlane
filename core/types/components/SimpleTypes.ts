import { CMSImageField, CMSLinkField } from "../Fields";

export type RichTextFields = {
    content: string;
    rendering_options: RenderingOptions;
    $: any;
}

export type ImageFields = {
    image: CMSImageField;
    rendering_options: RenderingOptions;
}
export type VideoFields = {
    video_url: string;
    rendering_options: RenderingOptions;
    $: any;
}

export type CTAFields = {
    link: CMSLinkField;
    secondary_link: CMSLinkField;
    $: any;
}

export type RenderingOptions = {
    colspan: string;
}
