import { NextResponse } from 'next/server';

// This would typically use your ContentStack SDK
// For now, we'll use the MCP server data structure
const CONTENT_CARDS = [
  {
    title: "Statement Regarding Our Ever-Changing Environment",
    content: {
      title: "Statement Regarding Our Ever-Changing Environment",
      category: "This is an earmark",
      intro_text: "We remain steadfast in our belief that the dedication and resilience of our professional community will ensure the continued delivery of high standards and impactful service nationwide.",
      icon: null,
      image: {
        uid: "blt54f2d0e7677e6ab3",
        url: "https://images.contentstack.io/v3/assets/blt33c1b1e577f25486/blt54f2d0e7677e6ab3/6886580575235770baeca21a/modern-cloud-ecosystem.svg",
        filename: "modern-cloud-ecosystem.svg",
        title: "Modern Cloud Ecosystem",
        description: "",
        height: 400,
        width: 600
      }
    },
    call_to_action: {
      link: {
        title: "Read the Article",
        href: "#"
      },
      secondary_link: {
        title: "",
        href: ""
      }
    },
    rendering_options: {
      card_orientation: "Vertical",
      link_type: "Button",
      hide_image: false,
      hide_border: false,
      use_title_as_link_text: false,
      swap_image: false,
      colspan: null,
      header_tag: null,
      image_order: null
    },
    locale: "en-us",
    uid: "bltbc8b9bdd43526dad",
    created_at: "2025-10-10T17:15:41.105Z",
    updated_at: "2025-10-10T21:36:43.559Z"
  },
  {
    title: "ICMP Certifies Over 10,000 Physicians Through Digital Fellowship Network",
    content: {
      title: "ICMP Certifies Over 10,000 Physicians Through Digital Fellowship Network",
      category: "This is an earmark",
      intro_text: "A multidisciplinary ICMP task force released a landmark report urging stronger governance, transparency, and patient protections in the growing use of AI tools in clinical decision-making.",
      icon: null,
      image: {
        uid: "blt54f2d0e7677e6ab3",
        url: "https://images.contentstack.io/v3/assets/blt33c1b1e577f25486/blt54f2d0e7677e6ab3/6886580575235770baeca21a/modern-cloud-ecosystem.svg",
        filename: "modern-cloud-ecosystem.svg",
        title: "Modern Cloud Ecosystem",
        description: "",
        height: 400,
        width: 600
      }
    },
    call_to_action: {
      link: {
        title: "Read the Article",
        href: "#"
      },
      secondary_link: {
        title: "",
        href: ""
      }
    },
    rendering_options: {
      card_orientation: "Vertical",
      link_type: "Button",
      hide_image: false,
      hide_border: false,
      use_title_as_link_text: false,
      swap_image: false,
      colspan: null,
      header_tag: null,
      image_order: null
    },
    locale: "en-us",
    uid: "blte23dbffa88f67117",
    created_at: "2025-10-10T17:15:10.648Z",
    updated_at: "2025-10-10T21:36:36.259Z"
  },
  {
    title: "ICMP Launches Global Telemedicine Accreditation Program",
    content: {
      title: "ICMP Launches Global Telemedicine Accreditation Program",
      category: "This is an earmark",
      intro_text: "The ICMP has introduced the world's first international accreditation system for telemedicine providers, aiming to ensure safe, ethical, and standardized virtual care across borders and platforms.",
      icon: null,
      image: {
        uid: "blt6e3d0f15986a8078",
        url: "https://images.contentstack.io/v3/assets/blt33c1b1e577f25486/blt6e3d0f15986a8078/6886580a1dcf718f279eef3b/traditional-decoupled-_headless-cms.svg",
        filename: "traditional-decoupled-_headless-cms.svg",
        title: "Traditional Decoupled Headless CMS",
        description: "",
        height: 400,
        width: 600
      }
    },
    call_to_action: {
      link: {
        title: "Read the Article",
        href: "#"
      },
      secondary_link: {
        title: "",
        href: ""
      }
    },
    rendering_options: {
      card_orientation: "Vertical",
      link_type: "Button",
      hide_image: false,
      hide_border: false,
      use_title_as_link_text: false,
      swap_image: false,
      colspan: null,
      header_tag: null,
      image_order: null
    },
    locale: "en-us",
    uid: "blt940052f4e06128a4",
    created_at: "2025-10-10T17:15:45.781Z",
    updated_at: "2025-10-10T21:35:27.315Z"
  }
];

export async function GET() {
  try {
    return NextResponse.json(CONTENT_CARDS);
  } catch (error) {
    console.error('Error fetching content cards:', error);
    return NextResponse.json(
      { error: 'Failed to fetch content cards' },
      { status: 500 }
    );
  }
}
