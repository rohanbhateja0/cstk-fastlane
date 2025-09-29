import { CMSImageField, CMSLinkField } from "../Fields";

export type HeroBannerContent = {
    title: string;
    subtitle: string;
    description: string;
    background_image: CMSImageField;
    call_to_action: CMSLinkField;
    $: any;
}

export type HeroBannerRenderingOptions = {
    content_alignment: string; // left, center, right
    background_overlay: string; // true/false
    overlay_opacity: string; // light, medium, dark
    $: any;
}

export type HeroBannerFields = {
    content: HeroBannerContent;
    rendering_options: HeroBannerRenderingOptions;
    $: any;
}
