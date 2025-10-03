# MegaMenu Navigation (MegaNav & MegaNavItem)

**Mega Menu Navigation:** The Mega Navigation component is designed to provide an expandable, multi-level navigation menu for the Catalyst website, enhancing user navigation across various pages. It supports a hierarchical structure with headers and items, adhering to responsive design principles and theming via ShadCN UI and Tailwind CSS. The component is optimized for the ContentStack editor and includes nested content types for MegaNav and MegaNavItem to manage content and navigation structure.

**a. MegaNav:**

**Description**: A comprehensive navigation menu that organizes multiple sections (e.g., "About Us," "Resources," "News").

**Functionality**: Provides a dropdown or expandable menu structure, allowing users to access primary site sections. Supports keyboard navigation and mobile-friendly collapse/expand behavior.

**Authoring & Modular Blocks**

- Add `MegaNavItem` components as modular blocks when editing.
- Runtime content renders via modular blocks for the active item (desktop overlay, mobile sheet, and editing view).

**Behavior Notes**

- Desktop: Opens an overlay panel for the active item; closes on outside click or Escape key.
- Mobile: Uses a slide-in sheet with a back button for nested content.
- State: Remembers the last active item in `localStorage` under `active-menu-item`.
- Navigation: Closes menus on route changes.

## MegaNav Field Details

**Content Type:** MegaNav  
**Content Type UID:** `mega_nav`

| Field Name | ContentStack Field Type | Description |
|------------|------------------------|-------------|
| MegaNavHeaderTitle | Text | The main header title for the navigation section |

**b. MegaNavItem:**

**Description**: Individual menu items within the MegaNavigation (e.g., "Getting Started," "Documentation"). It holds a rich text area to add Image, RichText, and other content components.

**Functionality**: Acts as a category or section header within the navigation, triggering the display of associated content items on hover or click.

## MegaNavItem Field Details

**Content Type:** MegaNavItem
**Content Type UID:** `mega_nav_item`

| Field Name | ContentStack Field Type | Description |
|------------|------------------------|-------------|
| MegaNavTitle | Text | Title field for the navigation item |

**Screenshots:**

**MegaNavigation:** 
    ![screenshot](/images/components/component-meganavigation.png "screenshot")

**Mega NavItem displays ContentStack modular blocks to add any components:**
    ![screenshot](/images/components/component-mega-navitem.png "screenshot")
