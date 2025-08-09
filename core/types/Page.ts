import { Component } from "./Component";
import { PageSettings } from "./PageSettings";
import { FlexGridFields } from "./components/FlexGrid";

export type Page ={
  [x: string]: any;
  layout: string;
  main: FlexGridFields[];
  main_column: { components: Component[]; }
  left_column: { components: Component[]; }
  right_column: { components: Component[]; };
  uid: string;
  locale: string;
  url: string;
  seo: PageSettings;
  title: string;

}