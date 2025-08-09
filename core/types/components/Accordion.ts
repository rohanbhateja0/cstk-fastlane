import { RenderingOptions } from "./SimpleTypes";

export type AccordionFields = {
    accordion_items: AccordionItemFields[];
    rendering_options: RenderingOptions;
    $: any;
}

export type AccordionItemFields = {
    header: string;
    content: string;
    $ : any;
}