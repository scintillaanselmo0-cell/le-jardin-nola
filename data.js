/* =============================================================================
   LE JARDIN — DATA.JS
   FONTE UNICA DI VERITÀ per l'intero sito (splash + Nouveau + Bistrot).
   Modifica SOLO questo file per aggiornare testi, contatti, orari, social,
   immagini, video e voci di menu. Tutte le pagine leggono da qui.
   Ultima riga: window.DATA = DATA;  (NON rimuovere)
   ========================================================================== */

const DATA = {

  /* ==========================================================================
     SHARED — dati comuni alle due anime (stessa location, stesso indirizzo)
     ====================================================================== */
  SHARED: {
    brand: "Le Jardin",
    tagline: "Cocktail Bar & Bistrot",
    address: "Via Marco Clodio Marcello 7, Nola (NA)",
    addressLocality: "Nola",
    addressRegion: "NA",
    postalCode: "80035",
    country: "IT",
    // Google Maps: link diretto alla ricerca dell'indirizzo
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=Le+Jardin+Via+Marco+Clodio+Marcello+7+Nola+NA",
    mapsEmbed: "https://www.google.com/maps?q=Via+Marco+Clodio+Marcello+7,+Nola+NA&output=embed",
    // Telefono
    phoneDisplay: "081 1786 8668",
    phoneTel: "+3908117868668",          // usato in href="tel:"
    whatsappNumber: "3908117868668",     // usato in https://wa.me/<numero>
    // Social del brand
    facebook: "https://www.facebook.com/p/Le-jardin-Nouveau-61557852314824/"
  },

  /* ==========================================================================
     NOUVEAU — COCKTAIL BAR (spazio esterno / giardino)
     ====================================================================== */
  NOUVEAU: {
    id: "nouveau",
    label: "Nouveau",
    kicker: "Cocktail Bar",
    name: "Le Jardin — Nouveau",
    shortName: "Nouveau",
    heroTitle: "Nouveau",
    heroSubtitle: "Cocktail Bar",
    heroClaim: "Aperti tutti i giorni dalle ore 20:00",

    // ---- Orari per badge Aperto/Chiuso (timezone Europe/Rome) ----
    // openDays: 0=Dom,1=Lun,...,6=Sab  |  finestra 20:00 -> 02:00 (scavalca mezzanotte)
    hours: {
      openDays: [0, 1, 2, 3, 4, 5, 6],   // tutti i giorni
      openHour: 20, openMinute: 0,
      closeHour: 2,  closeMinute: 0,      // chiusura a notte inoltrata (giorno dopo)
      humanLine: "Tutti i giorni · dalle 20:00"
    },

    // ---- Social ----
    instagram: "https://www.instagram.com/lejardindenouveau/",
    instagramHandle: "@lejardindenouveau",
    facebook: "https://www.facebook.com/p/Le-jardin-Nouveau-61557852314824/",

    // ---- Menu ----
    // Pattern factory (Bonsai): pulsante che apre il menu esterno in nuova scheda.
    // Per passare in futuro al PDF allegato, basta valorizzare menuPdf e il sito
    // userà quello automaticamente.
    menuUrl: "https://www.wearefactory.it/menu/partners.php?n=Le+Jardin+de+Nouveau",
    menuPdf: "", // es: "assets/menu/nouveau-menu.pdf"  <-- se valorizzato ha priorità

    // ---- Media ----
    heroVideo: "assets/video/nouveau-hero.mp4",
    heroPoster: "assets/poster/nouveau-hero.jpg",
    ogImage: "assets/img/og-nouveau.jpg",

    // ---- Concept / Atmosfera ----
    concept: {
      title: "Un giardino che si accende di notte",
      lead: "Sotto le fronde e le luci sospese, Nouveau è il cocktail bar all'aperto de Le Jardin.",
      body: "Un salotto botanico dove il verde incontra il cristallo: daybed, specchi tra gli alberi e una miscelazione curata nel dettaglio. Il posto giusto per un aperitivo lungo o un dopocena sotto le stelle, ogni sera dalle 20:00.",
      video: "assets/video/nouveau-location.mp4",
      poster: "assets/poster/nouveau-location.jpg"
    },

    // ---- Signature / Miscelazione ----
    signature: {
      title: "La miscelazione",
      lead: "Signature drink e grandi classici, costruiti a mano.",
      video: "assets/video/nouveau-bartender.mp4",
      poster: "assets/poster/nouveau-bartender.jpg",
      // Voci illustrative dell'atmosfera drink (il menu completo è al link esterno)
      highlights: [
        { name: "Signature del giardino", desc: "Note botaniche, agrumi disidratati, freschezza di stagione." },
        { name: "Coupe d'autore", desc: "Eleganza classica, equilibrio e beva pulita." },
        { name: "Twist & Classici", desc: "I grandi intramontabili rivisitati dal nostro bancone." }
      ]
    },

    // ---- Galleria ----
    gallery: [
      { src: "assets/img/nouveau-cocktail-1.jpg", alt: "Cocktail rosso con agrume disidratato" },
      { src: "assets/img/nouveau-cocktail-2.jpg", alt: "Coupe con guarnizione di menta" },
      { src: "assets/img/nouveau-location-1.jpg", alt: "Daybed nel giardino esterno" },
      { src: "assets/img/nouveau-location-2.jpg", alt: "Specchio tra gli alberi del giardino" },
      { src: "assets/poster/nouveau-cocktail.jpg", alt: "Cocktail servito nel bicchiere di cristallo" }
    ],

    // ---- CTA / Conversione ----
    ctaPrimary: "Prenota il tuo tavolo in giardino",
    whatsappText: "Ciao Le Jardin Nouveau! Vorrei prenotare un tavolo in giardino. " +
                  "Data: __ · Orario: __ · Persone: __ . Grazie!"
  },

  /* ==========================================================================
     BISTROT — cucina (sale interne)
     ====================================================================== */
  BISTROT: {
    id: "bistrot",
    label: "Bistrot",
    kicker: "Bistrot",
    name: "Le Jardin — Bistrot",
    shortName: "Bistrot",
    heroTitle: "Bistrot",
    heroSubtitle: "Cucina",
    heroClaim: "Aperti dal martedì alla domenica dalle ore 20:00",

    // ---- Orari per badge Aperto/Chiuso (timezone Europe/Rome) ----
    // Bistrot: mar-dom (lunedì chiuso). Finestra 20:00 -> 00:30 (scavalca mezzanotte).
    hours: {
      openDays: [2, 3, 4, 5, 6, 0],   // mar,mer,gio,ven,sab,dom  (lunedì=1 chiuso)
      openHour: 20, openMinute: 0,
      closeHour: 0,  closeMinute: 30,
      humanLine: "Martedì – Domenica · dalle 20:00 · Lunedì chiuso"
    },

    // ---- Social ----
    instagram: "https://www.instagram.com/lejardin_bistrot/",
    instagramHandle: "@lejardin_bistrot",
    facebook: "https://www.facebook.com/nouveauelementididesign/",

    // ---- Menu ----
    // NON ANCORA DISPONIBILE. Stato "in arrivo".
    // Per pubblicarlo: valorizza menuCategories (o menuPdf) qui sotto,
    // NON serve toccare l'HTML.
    menuUrl: "",
    menuPdf: "", // es: "assets/menu/bistrot-menu.pdf"
    menuComingSoon: true,
    // Struttura pronta: array di categorie con piatti. Lasciato vuoto finché non disponibile.
    menuCategories: [
      // {
      //   category: "Antipasti",
      //   items: [
      //     { name: "Nome piatto", desc: "Descrizione breve", price: "€ 00" }
      //   ]
      // },
    ],

    // ---- Media ----
    heroVideo: "assets/video/bistrot-hero.mp4",
    heroPoster: "assets/poster/bistrot-hero.jpg",
    ogImage: "assets/img/og-bistrot.jpg",

    // ---- Concept cucina ----
    concept: {
      title: "La cucina del giardino",
      lead: "Sale interne dal fascino intimo, tra archi, cristalli e luci calde.",
      body: "Il Bistrot è l'anima gastronomica de Le Jardin: una cucina curata, materie prime scelte e una mise en place raffinata. Un ambiente accogliente dove cenare con calma, dal martedì alla domenica dalle 20:00.",
      image: "assets/img/bistrot-interior.jpg"
    },

    // ---- Galleria ----
    gallery: [
      { src: "assets/img/bistrot-food-2.jpg", alt: "Piatto gourmet impiattato" },
      { src: "assets/img/bistrot-food-3.jpg", alt: "Primo piatto con zucchine e crema" },
      { src: "assets/img/bistrot-food-1.jpg", alt: "Selezione di finger food e antipasti" },
      { src: "assets/img/bistrot-table.jpg", alt: "Tavolo apparecchiato con fiori" },
      { src: "assets/img/bistrot-interior.jpg", alt: "Interno del bistrot con lampadario" }
    ],

    // ---- Prenotazione (form -> WhatsApp) ----
    ctaPrimary: "Riserva il tuo tavolo",
    reservation: {
      title: "Riserva il tuo tavolo",
      lead: "Compila i campi: ti apriremo WhatsApp con il riepilogo pronto da inviare.",
      // Il messaggio viene assemblato in script.js con i valori del form.
      whatsappIntro: "Ciao Le Jardin Bistrot! Vorrei prenotare un tavolo."
    },
    whatsappText: "Ciao Le Jardin Bistrot! Vorrei prenotare un tavolo. " +
                  "Data: __ · Orario: __ · Persone: __ . Grazie!"
  }
};

/* NON rimuovere: espone i dati globalmente per tutte le pagine */
window.DATA = DATA;
