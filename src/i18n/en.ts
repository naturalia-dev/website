// src/i18n/en.ts
// English texts: `satisfies Dictionary` makes the build fail on a missing or extra key.
import type { Dictionary, ProductRequest } from './it';

export const en = {
  layout: {
    description: "Naturalia: an engineering company with over 30 years of experience in electronics. We design greener products, solutions and technology consulting.",
    ogImageAlt: "Naturalia, green people network",
    logoAlt: "Naturalia",
    nav: {
      products: "Products",
      contact: "Contact",
    },
    menu: { open: "Open menu", close: "Close menu", nav: "Main menu" },
    vat: "VAT",
  },

  home: {
    title: "Naturalia | Greener electronic engineering",
    description: "Naturalia: over 30 years of electronic engineering. Products, solutions and technology consulting designed to use less. Discover the Irry family.",
    hero: {
      badge: "Engineering with a green heart",
      heading: `Technology <br /> <span class="text-accent-500">in tune with nature</span>`,
      intro: "For over thirty years we have been designing and building electronics, products and technology solutions. With one mission: making them greener every day.",
      ctaProducts: "Discover the products",
      ctaContact: "Talk to us",
    },
    services: {
      header: {
        badge: "What we do",
        title: "We design.",
        subtitle: "We build. We advise.",
        description: "From idea to finished product: one team of engineers handles electronics, firmware and industrialization, with energy efficiency as a design requirement.",
      },
      steps: {
        engineering: {
          title: "Electronic engineering",
          subtitle: "Design",
          description: "Custom boards, firmware and systems, from prototype to production.",
        },
        products: {
          title: "Products",
          subtitle: "Development and sales",
          description: "Our own devices, built to last and to use as little energy as possible.",
        },
        consulting: {
          title: "Consulting",
          subtitle: "Technology",
          description: "We support companies and designers in their technical choices, with over 30 years of experience.",
        },
      },
    },
    irry: {
      badge: "The Irry family",
      title: `Smart <br/> <span class="text-accent-500">irrigation</span>`,
      text: "Advanced irrigation control systems for residential and commercial use: water and energy savings, and native home automation integration, especially with <strong>Home Assistant</strong>.",
      cta: "Explore the Irry family",
    },
    mission: {
      badge: "Our mission",
      text: `"Every solution we design should leave the world <br class="hidden md:block"/> a little greener than it found it."`,
    },
    cta: {
      heading: `Have a project <br/> <span class="text-accent-500">in mind?</span>`,
      button: "Contact us",
    },
  },

  products: {
    title: "Products | Naturalia",
    description: "Naturalia products: the Irry family for smart irrigation, with energy savings and Home Assistant integration.",
    badge: "Designed by Naturalia",
    heading: "Products",
    intro: "Devices we design and develop ourselves, from electronics to firmware.",
    empty: "Our products will be available soon. Contact us to learn more.",
    status: { available: "Available", coming_soon: "Coming soon" },
    priceOnRequest: "Price on request",
    discover: "Discover the product",
    back: "All products",
    highlights: "Highlights",
    details: "The product",
    gallery: "Gallery",
    video: "Video",
    playVideo: "Watch the video",
    lightbox: { open: "Open photo", close: "Close", prev: "Previous photo", next: "Next photo" },
    photoAlt: "photo",
    cta: {
      heading: `Interested in <br/> <span class="text-accent-500">this product?</span>`,
      button: "Request information",
    },
  },

  contact: {
    title: "Contact | Naturalia",
    description: "Contact Naturalia for products, electronic engineering projects and technology consulting. Via Luciano Manara 17, Milan.",
    badge: "Contact",
    heading: `Let's talk about <br /> <span class="text-accent-500">your project</span>`,
    intro: "An Irry product, a new device to design or a consultation: write to us and we will get back to you soon.",
    formName: "contact-en",
    honeypot: "Don’t fill this out if you’re human:",
    name: "Name and surname",
    email: "Email",
    message: "Message",
    heardAbout: {
      label: "How did you hear about us?",
      placeholder: "Optional",
      options: [
        { value: "Instagram", label: "Instagram" },
        { value: "TikTok", label: "TikTok" },
        { value: "Facebook", label: "Facebook" },
        { value: "Google", label: "Google" },
        { value: "Passaparola", label: "Word of mouth" },
        { value: "Evento", label: "Event" },
        { value: "Altro", label: "Other" },
      ],
    },
    submit: "Send message",
    productLabel: "Enquiry about",
    productMessage: ({ title, price, url }: ProductRequest) =>
      `Hello,\nI would like to receive more information about ${title}${price ? ` (${price})` : ""}.\n\nReference: ${url}`,
  },

  success: {
    title: "Message sent | Naturalia",
    heading: "Message received",
    text: "Thank you for writing to us. <br> We will get back to you soon.",
    back: "Back to Home",
  },
} satisfies Dictionary;
