# Accordion

The Accordion component groups content into expandable/collapsible panels. Authors add one or more `Accordion Panel` items inside the Accordion. Each panel has a title and a rich content area, making this ideal for FAQs, product details, and progressive disclosure of content.

## Field Details

**Content Type:** Accordion  
**Content Type UID:** `accordion`

| Field Name | ContentStack Field Type | Description |
|------------|------------------------|-------------|
| — | — | The Accordion itself does not hold content fields; it provides a structure for adding `Accordion Panel` items. |

* * *

## Authoring Model

- Add the `Accordion` component to the page.
- Inside the Accordion, add one or more `Accordion Panel` items as modular blocks.
- Open each `Accordion Panel` and add content into its rich text area (e.g., text, images, CTAs, etc.).

Notes:
- In the ContentStack editor, all panels are open by default to simplify authoring.
- On the live site, the Accordion behaves as a single-expand control (one panel open at a time) and supports collapse.

* * *

## Advanced Options (Component Parameters)

| Option | Type | Description | Default |
|--------|------|-------------|---------|
| styles | Text | Optional CSS utility classes applied to the Accordion wrapper. | — |
| componentId | Text | Optional HTML `id` attribute for targeting/analytics. | — |

### Styling Options
Common styling such as spacing, background, and alignment may be available via global styles. See `Global Styling Guide` for details.

* * *

## How It Works

- Initialization: The Accordion reads panel data from the modular blocks structure.
- Panel Structure: Each `Accordion Panel` renders an `AccordionTrigger` (title) and `AccordionContent` (body) bound to a unique `value` key.
- Editing Experience: In editing mode, all panels are opened by default for easier content authoring.
- Live Behavior: On the live site, the Accordion allows a single panel to be open at a time and supports collapsing the open panel.

Implementation notes:
- The wrapper can accept optional `styles` from component parameters for layout tweaks.
- The open/close behavior is handled by the UI library and the component's mode (editing vs. live).

* * *

## Related: Accordion Panel

The `Accordion Panel` is the child item used only inside the `Accordion`.

**Content Type:** Accordion Panel  
**Content Type UID:** `accordion_panel`

| Field Name | ContentStack Field Type | Description |
|------------|------------------------|-------------|
| AccordionPanelTitle | Text | The text used as the clickable panel header. |
| AccordionPanelContent | Rich Text | The content area for adding text, images, and other components. |

Additional parameters available on panels:
- `styles`: Optional CSS utility classes applied to the panel wrapper.
- `componentId`: Optional HTML id for targeting/analytics.

* * *

## Screenshots

1. Accordion with multiple panels (live site view)

![screenshot](/images/components/component-accordion-default.png "Accordion with multiple panels")

2. Authoring view showing the `accord-{*}` placeholder and panel content placeholder

![screenshot](/images/components/component-accordion-authoring.png "Authoring view")


