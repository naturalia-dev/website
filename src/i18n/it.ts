// src/i18n/it.ts
// Italian texts: the reference dictionary. en.ts must have exactly the same shape.
// Strings rendered with set:html may contain inline markup (<br>, <strong>).
export const it = {
  layout: {
    description: "Naturalia: società di ingegneria con oltre 30 anni di esperienza in elettronica. Progettiamo prodotti, soluzioni e consulenza tecnologica più green.",
    ogImageAlt: "Naturalia, green people network",
    logoAlt: "Naturalia",
    nav: {
      products: "Prodotti",
      contact: "Contatti",
    },
    menu: { open: "Apri menu", close: "Chiudi menu", nav: "Menu principale" },
    vat: "P.IVA",
  },

  home: {
    title: "Naturalia | Ingegneria elettronica, più green",
    description: "Naturalia: oltre 30 anni di ingegneria elettronica. Prodotti, soluzioni e consulenza tecnologica progettati per consumare meno. Scopri la famiglia Irry.",
    hero: {
      badge: "Ingegneria dal cuore verde",
      heading: `Tecnologia <br /> <span class="text-accent-500">a misura di natura</span>`,
      intro: "Da oltre trent'anni progettiamo e realizziamo elettronica, prodotti e soluzioni tecnologiche. Con una missione: renderli ogni giorno più green.",
      ctaProducts: "Scopri i prodotti",
      ctaContact: "Parla con noi",
    },
    services: {
      header: {
        badge: "Cosa facciamo",
        title: "Progettiamo.",
        subtitle: "Realizziamo. Consigliamo.",
        description: "Dall'idea al prodotto finito: un'unica squadra di ingegneri segue elettronica, firmware e industrializzazione, con l'efficienza energetica come requisito di progetto.",
      },
      steps: {
        engineering: {
          title: "Ingegneria elettronica",
          subtitle: "Progettazione",
          description: "Schede, firmware e sistemi su misura, dal prototipo alla produzione.",
        },
        products: {
          title: "Prodotti",
          subtitle: "Sviluppo e vendita",
          description: "Dispositivi nostri, pensati per durare e per consumare il meno possibile.",
        },
        consulting: {
          title: "Consulenza",
          subtitle: "Tecnologia",
          description: "Affianchiamo aziende e progettisti nelle scelte tecniche, con oltre 30 anni di esperienza.",
        },
      },
    },
    irry: {
      badge: "La famiglia Irry",
      title: `Irrigazione <br/> <span class="text-accent-500">intelligente</span>`,
      text: "Sistemi evoluti di controllo dell'irrigazione per uso residenziale e commerciale: risparmio di acqua ed energia, e integrazione nativa con la domotica, in particolare con <strong>Home Assistant</strong>.",
      cta: "Esplora la famiglia Irry",
    },
    mission: {
      badge: "La nostra missione",
      text: `"Ogni soluzione che progettiamo deve lasciare il mondo <br class="hidden md:block"/> un po' più verde di come l'ha trovato."`,
    },
    cta: {
      heading: `Hai un progetto <br/> <span class="text-accent-500">da realizzare?</span>`,
      button: "Contattaci",
    },
  },

  products: {
    title: "Prodotti | Naturalia",
    description: "I prodotti Naturalia: la famiglia Irry per l'irrigazione intelligente, con risparmio energetico e integrazione con Home Assistant.",
    badge: "Progettati da Naturalia",
    heading: "Prodotti",
    intro: "Dispositivi progettati e sviluppati da noi, dall'elettronica al firmware.",
    empty: "I nostri prodotti saranno presto disponibili. Contattaci per saperne di più.",
    status: { available: "Disponibile", coming_soon: "Prossimamente" },
    priceOnRequest: "Prezzo su richiesta",
    discover: "Scopri il prodotto",
    back: "Tutti i prodotti",
    highlights: "In evidenza",
    details: "Il prodotto",
    gallery: "Galleria",
    video: "Video",
    playVideo: "Guarda il video",
    lightbox: { open: "Apri la foto", close: "Chiudi", prev: "Foto precedente", next: "Foto successiva" },
    photoAlt: "foto",
    cta: {
      heading: `Interessato a <br/> <span class="text-accent-500">questo prodotto?</span>`,
      button: "Richiedi informazioni",
    },
  },

  contact: {
    title: "Contatti | Naturalia",
    description: "Contatta Naturalia per prodotti, progetti di ingegneria elettronica e consulenza tecnologica. Via Luciano Manara 17, Milano.",
    badge: "Contatti",
    heading: `Parliamo del <br /> <span class="text-accent-500">tuo progetto</span>`,
    intro: "Un prodotto Irry, un nuovo dispositivo da progettare o una consulenza: scrivici e ti risponderemo al più presto.",
    // Netlify Forms name: one form per language
    formName: "contact-it",
    honeypot: "Non compilare se sei umano:",
    name: "Nome e cognome",
    email: "Email",
    message: "Messaggio",
    // "How did you hear about us": values stay Italian in both languages, so submissions compare
    heardAbout: {
      label: "Come ci hai conosciuto?",
      placeholder: "Facoltativo",
      options: [
        { value: "Instagram", label: "Instagram" },
        { value: "TikTok", label: "TikTok" },
        { value: "Facebook", label: "Facebook" },
        { value: "Google", label: "Google" },
        { value: "Passaparola", label: "Passaparola" },
        { value: "Evento", label: "Evento" },
        { value: "Altro", label: "Altro" },
      ],
    },
    submit: "Invia messaggio",
    // Prefill from a product page ("Richiedi informazioni" → /contact/?product=<slug>)
    productLabel: "Richiesta per",
    productMessage: ({ title, price, url }: ProductRequest) =>
      `Buongiorno,\nvorrei ricevere maggiori informazioni su ${title}${price ? ` (${price})` : ""}.\n\nRiferimento: ${url}`,
  },

  success: {
    title: "Messaggio inviato | Naturalia",
    heading: "Messaggio ricevuto",
    text: "Grazie per averci scritto. <br> Ti risponderemo al più presto.",
    back: "Torna alla Home",
  },
};

export type Dictionary = typeof it;

/** Product details used to prefill the contact form */
export interface ProductRequest {
  title: string;
  price: string | null;
  url: string;
}
