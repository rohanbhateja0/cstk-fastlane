# Video Player

### ✅ **Overview**
The `VideoPlayer` component is a reusable video wrapper built using the **Plyr** library. It supports embedding and playing videos from popular platforms like **YouTube** and **Vimeo** with a consistent and customizable player UI.

## Field Details

**Content Type:** VideoPlayer
**Content Type UID:** `video_player`

| Field Name | ContentStack Field Type | Description |
|------------|------------------------|-------------|
| VideoLink | Link | The URL or internal link to the video content (e.g., YouTube, Vimeo) |

![screenshot](/images/components/component-video-1.png "screenshot")


### 🎯 **Key Features**
*   ✅ Supports **YouTube** and **Vimeo** video sources.
    
*   ✅ Lightweight and responsive.
    
*   ✅ Custom controls, captions, and keyboard accessibility via Plyr.
    
*   ✅ Easy to integrate with dynamic video URLs.

**Provider Detection**

- The component auto-detects the video provider from the URL.
- For Vimeo links, the numeric video ID is extracted from the URL when possible; both full URLs and IDs are supported.
    

* * *

## 🎨 Styling Options
### **1\. Component Top Spacing**
Controls the top spacing above the component. The following options are available:

*   `Top Large Space`
    
*   `Top Medium Space`
    
*   `Top Low Space`
    
*   `Top No Space`
    

### **2\. Component Bottom Spacing**
Controls the bottom spacing below the component. The following options are available:

*   `Bottom Large Space`
    
*   `Bottom Medium Space`
    
*   `Bottom Low Space`
    
*   `Bottom No Space`
