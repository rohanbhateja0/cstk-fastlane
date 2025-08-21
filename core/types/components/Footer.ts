import { CMSImageField, CMSLinkField } from "../Fields";

export type FooterFields = {

  title: string;
  top_links: CMSLinkField[];
  bottom_links: CMSLinkField[];
  disclaimer: string;
  copyright: string;
  appstore_links: AppStoreFields;

  $: any;
}

export type AppStoreFields = {
  link_1 : CMSLinkField;
  link_1_image: CMSImageField;
  link_2 : CMSLinkField;
  link_2_image: CMSImageField;
  link_3 : CMSLinkField;
  link_3_image: CMSImageField;
}

export type FooterLinkRowProps = {
  data: CMSLinkField[];
  className?: string;
}