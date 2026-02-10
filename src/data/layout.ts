export const header = {
  upperNav: [],
  middleNav: [
    { id: "home", label: "Home", href: "/" },
    { id: "blog", label: "Blog", href: "/blog" },
    { id: "about", label: "About", href: "/about" },
    { id: "contact", label: "Contact", href: "/contact" },
  ],
  lowerNav: [],
};

export const header2 = {
  upperNav: header.upperNav,
  lowerNav: header.lowerNav,
};

export const footer = {
  text: "A blog about thoughtful building, writing, and creativity. Replace this with your Strapi global settings.",
  list1: {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "Blog", href: "/blog" },
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
