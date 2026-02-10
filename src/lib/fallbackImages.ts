export const heroFallbacks = [
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1487014679447-9f8336841d58?auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1484417894907-623942c8ee29?auto=format&fit=crop&w=1600&q=80",
];

export const cardFallbacks = [
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=1200&q=80",
];

export const thumbFallbacks = [
  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=480&q=80",
  "https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&w=480&q=80",
  "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=480&q=80",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=480&q=80",
];

const pickFromList = (list: string[], seed?: string) => {
  if (!list.length) return "";
  if (!seed) return list[0];
  const value = seed.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return list[value % list.length];
};

export const getFallbackImage = (seed?: string, size: "hero" | "card" | "thumb" = "card") => {
  if (size === "hero") return pickFromList(heroFallbacks, seed);
  if (size === "thumb") return pickFromList(thumbFallbacks, seed);
  return pickFromList(cardFallbacks, seed);
};
