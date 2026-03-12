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
      "Our legal team provides comprehensive real estate law expertise, ensuring every transaction is secure, compliant, and fully protected from risk.",
    image:
      "https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg?auto=compress&cs=tinysrgb&w=1200",
    subtitle: "Securing Purchases and Sales",
    subServices: [
      {
        title: "Drafting, Reviewing, and Amending Contracts",
        bullets: [
          "Drafting of bespoke contracts, in-depth analysis of existing clauses, and adaptation according to needs or legal changes.",
          "Explanation of risks, protection of the client's interests.",
          "(Sales agreements (compromis de vente), options to purchase, reservation contracts, etc.)",
        ],
      },
      {
        title: "Drafting and Securing Leases (Residential, Commercial)",
        bullets: [
          "Tailor-made rental contracts adapted to the specific case, protective clauses, and legal compliance. Enhanced security.",
        ],
      },
      {
        title: "Legal and Real Estate Strategy Consulting",
        bullets: [
          "Thanks to our combined expertise in law and real estate, we support you on all strategic aspects. Our bespoke approach helps you optimize every decision, anticipate risks, and realize your projects with complete confidence.",
        ],
      },
      {
        title: "Comprehensive Due Diligence & Title Verification",
        bullets: [
          "In-depth analysis of titles, easements, urban planning, and compliance. No hidden risks: we validate the reliability of your acquisition before any commitment.",
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
        title: "Real Estate Purchase Support",
        bullets: [
          "From targeted searches (on & off-market) to the final signature, we identify the best opportunities and secure every step. You save time, negotiate at the best price, and invest with complete peace of mind.",
        ],
      },
      {
        title: "Real Estate Sales Support",
        bullets: [
          "Accurate valuation, premium marketing strategy, management of viewings, and negotiations. Your property sells quickly, at the right price, through a fluid and confidential process.",
        ],
      },
      {
        title: "Rental Support",
        bullets: ["File analysis, etc. / listing and placement."],
      },
      {
        title: "Valuation & Market Analysis",
        bullets: [
          "Professional estimation based on local and European data. Make informed decisions: buy, sell, or hold at the optimal time.",
        ],
      },
      {
        title: "Real Estate Investment Consulting",
        bullets: [
          "Profitability analysis, selection of opportunities, and long-term wealth strategy. We transform your projects into high-performing and secure investments.",
        ],
      },
    ],
  },
]
