import { CMSLinkField } from "../Fields";

export type BreadcrumbFields = {
    breadcrumb_items: BreadcrumbItem[];
    rendering_options: BreadcrumbRenderingOptions;
    $: any;
}

export type BreadcrumbItem = {
    title: string;
    link: CMSLinkField;
    $: any;
}

export type BreadcrumbRenderingOptions = {
    colspan: string;
    show_home: boolean;
    separator: string;
}