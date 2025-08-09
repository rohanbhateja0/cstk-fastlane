import { CMSImageField, CMSLinkField } from "../Fields";

export type CustomButtonFields = {
    button_image: CMSImageField;
    button_link: CMSLinkField;

    button_style: string;
    button_direction: string;
}