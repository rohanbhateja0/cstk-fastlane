import { CMSImageField, CMSLinkField } from "../Fields";

export type RichTextFields = {
    content: string;
    $: any;
}

export type ImageFields = {
    image: CMSImageField;
}

export type CTAFields = {
    link: CMSLinkField;
    secondary_link: CMSLinkField;
    $: any;
}