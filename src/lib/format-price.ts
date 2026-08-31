const formatter = new Intl.NumberFormat("uk-UA", {
  style: "currency",
  currency: "UAH",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/** Форматує ціну для UI. У БД ціна зберігається в копійках (Int): 4_299_900 -> "42 999 ₴". */
export function formatPrice(priceInKopiykas: number): string {
  return formatter.format(priceInKopiykas / 100);
}
