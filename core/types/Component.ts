import { AccordionFields } from "./components/Accordion";
import { ContentCardFields } from "./components/ContentCard";
import { ContentSectionFields } from "./components/ContentSection";
import { FlexGridFields } from "./components/FlexGrid";
import { ImageFields, RichTextFields } from "./components/SimpleTypes";

export type Component = {
  rich_text: RichTextFields;
  image: ImageFields;
  content_section: ContentSectionFields;
  flex_grid: FlexGridFields;
  content_card: ContentCardFields;
  accordion: AccordionFields
}