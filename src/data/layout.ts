export const header = {
  upperNav: [
    { id: 1, label: "Call us", url: "tel:+10000000000", icon: null },
    { id: 2, label: "Email", url: "mailto:hello@example.com", icon: null },
  ],
  middleNav: [
    { id: "home", label: "Home", href: "/" },
    { id: "about", label: "About", href: "/about" },
    { id: "contact", label: "Contact", href: "/contact" },
  ],
  lowerNav: [
    {
      id: "services",
      label: "Services",
      href: "/services",
      subNav: [
        { id: "security", label: "Security", href: "/services/security" },
        { id: "consulting", label: "Consulting", href: "/services/consulting" },
      ],
    },
    { id: "pricing", label: "Pricing", href: "/pricing" },
  ],
};

export const header2 = {
  upperNav: header.upperNav,
  lowerNav: header.lowerNav,
};

export const footer = {
  text: "A starter template footer area. Replace this text with your company summary from Strapi.",
  list1: {
    title: "Quick Links",
    links: [
      { label: "Home", href: "/" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
  contactDetails: {
    contactNo: "+1 (000) 000-0000",
    email: "hello@example.com",
    location: "123 Starter Street\nStarter City",
  },
  socials: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    linkedin: "https://linkedin.com",
    youtube: "https://youtube.com",
    twitter: "https://x.com",
  },
};
