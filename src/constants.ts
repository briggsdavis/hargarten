export const THEME = {
  primary: "#163b0f",
  parchment: "#fbf6f1",
}

export const PROPERTIES = [
  {
    id: "1",
    title: "The Penthouse Suite",
    price: "4.2M",
    sqm: "320",
    type: "Sale",
    status: "Available",
    location: "Luxembourg City",
    bedrooms: 4,
    bathrooms: 3,
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200",
    amenities: ["Private Elevator", "Roof Terrace", "Wine Cellar"],
    description:
      "A masterpiece of modern architecture offering horizon-deep views and expansive ceilings.",
  },
  {
    id: "2",
    title: "Sky Loft Residence",
    price: "1.8M",
    sqm: "180",
    type: "Sale",
    status: "Available",
    location: "Kirchberg",
    bedrooms: 2,
    bathrooms: 2,
    image:
      "https://images.pexels.com/photos/1643384/pexels-photo-1643384.jpeg?auto=compress&cs=tinysrgb&w=1200",
    amenities: ["Floor-to-ceiling Windows", "Smart Home", "Concierge"],
    description:
      "Contemporary living at its finest, located in the heart of the financial district.",
  },
  {
    id: "3",
    title: "Garden Duplex",
    price: "2.5M",
    sqm: "240",
    type: "Rent",
    status: "Available",
    location: "Limpertsberg",
    bedrooms: 3,
    bathrooms: 2,
    image:
      "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&w=1200",
    amenities: ["Private Garden", "Double Garage", "Fireplace"],
    description: "A serene oasis combining historical charm with modern luxury.",
  },
  {
    id: "4",
    title: "Forest Edge Villa",
    price: "5.5M",
    sqm: "450",
    type: "Sale",
    status: "Reserved",
    location: "Senningerberg",
    bedrooms: 5,
    bathrooms: 4,
    image:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
    amenities: ["Infinity Pool", "Home Cinema", "Guest House"],
    description: "Ultimate privacy meets sophisticated design in this forest-side retreat.",
  },
]

export const SERVICES = [
  {
    title: "Real Estate Legal Services",
    overview:
      "At Hargarten-Properties, we bridge the gap between legal mastery and real estate market expertise within a single firm. This unique synergy allows us to guide our clients through every phase of their property journey: acquisition, sale, leasing, or investment. Through this integrated approach, you benefit from bespoke advisory, informed decision-making, and unparalleled security in all your real estate transactions.",
    image:
      "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1200",
    subtitle: "Securing Purchases and Sales",
    subServices: [
      {
        title: "Drafting, Reviewing, and Negotiating Contracts",
        bullets: [
          "Crafting bespoke agreements, performing rigorous clause analysis, and adapting contracts to reflect regulatory changes or specific client needs.",
          "Identifying risks and ensuring your interests are fully protected.",
          "(Sales agreements, purchase offers, reservation contracts, etc.)",
        ],
      },
      {
        title: "Structuring and Securing Lease Agreements",
        bullets: [
          "Custom residential and commercial leases tailored to specific requirements, featuring robust protective clauses and guaranteed legal compliance.",
        ],
      },
      {
        title: "Strategic Legal & Property Consulting",
        bullets: [
          "Leveraging our dual expertise to provide high-level strategic guidance. Our personalized approach helps you optimize decision-making, mitigate risk, and execute your vision with absolute confidence.",
        ],
      },
      {
        title: "Comprehensive Due Diligence & Title Verification",
        bullets: [
          "Exhaustive analysis of property titles, easements, zoning, and compliance. We ensure there are no hidden liabilities, validating the integrity of your acquisition before you commit.",
        ],
      },
      {
        title: "Real Estate Litigation & Dispute Resolution",
        bullets: [
          "In the event of a conflict—such as latent defects (vices cachés), rent arrears, or co-ownership disputes—we intervene with discretion and expertise. From amicable negotiations and strategic mediation to court representation, we protect your interests with a pragmatic, results-driven approach.",
        ],
      },
    ],
  },
  {
    title: "Real Estate Services",
    overview:
      "From acquisition to sale, our agency delivers end-to-end real estate services across Luxembourg's premium market, combining local expertise with a personalised approach.",
    image: "/realestateagency.jpg",
    subtitle: null,
    subServices: [
      {
        title: "Buyer Representation & Acquisition",
        bullets: [
          "From targeted searches (including off-market opportunities) to the final closing, we identify prime assets and secure every step of the process. Save time, negotiate from a position of strength, and invest with peace of mind.",
        ],
      },
      {
        title: "Seller Representation & Listing Services",
        bullets: [
          "Precise market valuations, bespoke marketing strategies, and expert negotiation. We ensure your property is sold at its true value, maintaining total confidentiality throughout a seamless process.",
        ],
      },
      {
        title: "Leasing & Asset Management",
        bullets: [
          "From property placement to drafting secure, bespoke leases, we combine market knowledge with legal precision. We focus on rigorous tenant screening and asset optimization to ensure a stable, profitable return.",
        ],
      },
      {
        title: "Market Analysis & Professional Valuation",
        bullets: [
          "Data-driven valuations based on local and European market trends. We empower you to make informed decisions on whether to buy, sell, or hold at the optimal moment.",
        ],
      },
      {
        title: "Real Estate Investment Strategy",
        bullets: [
          "Yield analysis, opportunity sourcing, and long-term portfolio strategy. We transform your objectives into high-performing, secure real estate investments.",
        ],
      },
    ],
    localizedSubServices: {
      fr: [
        {
          title: "Accompagnement à l'Achat immobilier",
          bullets: [
            "De la recherche ciblée (on & off-market) à la signature finale, nous identifions les meilleures opportunités et sécurisons chaque étape. Vous gagnez du temps, négociez au meilleur prix et investissez en toute sérénité.",
          ],
        },
        {
          title: "Accompagnement à la Vente immobilière",
          bullets: [
            "Estimation précise et réaliste, stratégie de mise en marché ciblée, gestion des visites et négociations efficaces. Votre bien se vend au juste prix, de manière fluide et confidentielle, avec un accompagnement attentif à chaque étape.",
          ],
        },
        {
          title: "Accompagnement à la location immobilière",
          bullets: [
            "De la mise en location de vos biens à la signature de baux sur mesure, nous combinons expertise immobilière et rédaction contractuelle sécurisée. Sélection rigoureuse des locataires, valorisation optimale de votre patrimoine et protection juridique complète pour des locations sereines et rentables.",
          ],
        },
        {
          title: "Évaluation & Analyse de Marché",
          bullets: [
            "Estimation professionnelle basée sur les données locales et européennes. Prenez des décisions éclairées : acheter, vendre ou conserver au moment optimal.",
          ],
        },
        {
          title: "Conseil en Investissement Immobilier",
          bullets: [
            "Analyse de rentabilité, sélection d'opportunités, stratégie patrimoniale à long terme. Nous transformons vos projets en investissements performants et sécurisés.",
          ],
        },
      ],
    },
  },
]
