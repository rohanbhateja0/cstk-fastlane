import { CMSImageField, CMSLinkField } from "../Fields";

export type CarouselSlideContent = {
    title: string;
    tag: string;
    description: string;
    image: CMSImageField;
    calltoaction1: CMSLinkField;
    calltoaction2: CMSLinkField;
    $: any;
}

export type CarouselRenderingOptions = {
    show_navigation: boolean;
    show_dots: boolean;
    colspan: string;
    $: any;
}

export type CarouselFields = {
    title?: string;
    description?: string;
    slides?: CarouselSlideContent[];
    rendering_options?: CarouselRenderingOptions;
    uid?: string;
    _content_type_uid?: string;
    $: any;
}
