# Alert/Notification Banner

## 📢 Alert Component Documentation

### 📌 Purpose

The `Alert` component is used to display important messages, warnings, or notifications to the user. It is a reusable UI block designed to be informative while maintaining stylistic consistency across the application.

---

## Field Details

**Content Type:** Alert/Notification Banner  
**Content Type UID:** `alert_notification_banner`

| Field Name | ContentStack Field Type | Description                                                                       |
| ---------- | ----------------------- | --------------------------------------------------------------------------------- |
| Icon       | File                    | Optional icon element to visually represent the type of alert (e.g., info, error) |
| Title      | Text                    | Short heading that gives a brief context of the alert message                     |
| Text       | Rich Text               | Detailed message or content for the alert                                         |

---

### 🎨 Styling Options

#### ➤ Variants (Advanced Styling)

The `Alert` component supports **two visual variants** to indicate the type of message:

1.  **Default**

    - Used for standard or informational messages.
    - Text color remains neutral (based on theme).

2.  **Error**

    - Used for error or warning messages.
    - Text color changes to reflect urgency or attention (e.g., red or theme-defined error color).

#### ➤ Background Color Options

You can choose the background color of the alert using the following predefined theme-based options:

- `Primary`: Applies the theme's primary background color.
- `Secondary`: Applies the theme's secondary background color.
- `Tertiary`: Applies the theme's tertiary background color.

The background color selection helps align the alert component with the overall UI theme while maintaining clarity.

## 📝 Summary

The Alert component includes an optional icon, a title, and a message text. It supports two variants—`default` and `error`—with text color changing in the error variant. Users can choose from three background color options—`primary`, `secondary`, and `tertiary`—based on the theme. This makes the component flexible and easily customizable while ensuring a consistent look and feel.

screenshots:

- Default variant
  ![default variant](/images/components/component-alert-screenshot-default-variant.png 'Default variant')

- Error variant
  ![error variant](/images/components/component-alert-screenshot-error-variant.png 'Error variant')
