// Довідник категорій: slug зберігається в БД, label — для відображення в UI.
export const CATEGORIES = [
  { slug: "laptops", label: "Ноутбуки" },
  { slug: "smartphones", label: "Смартфони" },
  { slug: "tablets", label: "Планшети" },
  { slug: "audio", label: "Аудіо" },
  { slug: "monitors", label: "Монітори" },
  { slug: "accessories", label: "Аксесуари" },
  { slug: "storage", label: "Накопичувачі" },
  { slug: "software", label: "Програми" },
] as const;

export type Category = (typeof CATEGORIES)[number];

const CATEGORY_LABELS = new Map<string, string>(
  CATEGORIES.map((category) => [category.slug, category.label]),
);

export function categoryLabel(slug: string): string {
  return CATEGORY_LABELS.get(slug) ?? slug;
}
