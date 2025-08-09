import { CMSImageField, CMSLinkField } from "../Fields";
import { CustomButtonFields } from "./CustomButton";

export type HeaderFields = {
    logo: CMSImageField;
    top_links: TopLinks[];
    mega_menu: MenuItems[];
}

export type TopLinks = {
    link: CustomButtonFields;    
}

export type MenuItems = {
    menu_item: MenuItem;
}

export type MenuItem = {
    link: CMSLinkField;
}