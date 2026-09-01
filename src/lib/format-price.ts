const numberFormatter = new Intl.NumberFormat("uk-UA", {
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

/**
 * Форматує ціну для UI. У БД ціна зберігається в копійках (Int): 4_299_900 -> "42 999 ₴".
 * Символ валюти додається вручну: currency-style у Node (₴) і браузерному ICU (грн)
 * рендериться по-різному, а тут вихід однаковий на сервері й клієнті.
 */
export function formatPrice(priceInKopiykas: number): string {
  return `${numberFormatter.format(priceInKopiykas / 100)} ₴`;
}
