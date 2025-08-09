import { ImageFields } from "./components/SimpleTypes";

export type PageSettings = {
  enable_search_indexing: boolean
  include_in_sitemap: boolean;
  meta_title: string;
  meta_description: string;
  meta_image: ImageFields;
  header_scripts: string;
  footer_scripts: string;
}