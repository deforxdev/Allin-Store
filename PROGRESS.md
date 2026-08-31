# PROGRESS.md — журнал прогресу Allin-Store

> Короткий журнал: який етап зроблено, що перевірено, що далі.
> Детальна архітектура — в [ARCHITECTURE.md](./ARCHITECTURE.md).

---

## ✅ Етап 1 — Каркас (2026-08-31)

**Мета:** магазин видно і він запускається. Без оплати, авторизації та реальної БД.

Зроблено:

- [x] Next.js 16 (App Router, TypeScript strict, Turbopack) + Tailwind CSS v4
- [x] ESLint 9 (flat config) + Prettier (+ плагін сортування Tailwind-класів)
- [x] shadcn/ui (radix-nova): Button, Card, Badge; іконки lucide-react
- [x] Framer Motion підключено (мінімум: hero-анімація, FadeIn-обгортка)
- [x] Prisma 7 + SQLite (driver adapter better-sqlite3), схема `Product`, singleton `db.ts`
- [x] Seed: 10 тестових товарів (техніка + ПЗ, 8 категорій)
- [x] Сторінки: головна (hero + 4 популярні товари), каталог (сітка + фільтр за
      категорією), сторінка товару, 404
- [x] API: `GET /api/products?category=` та `GET /api/products/[id]` (Zod-валідація запитів)
- [x] SVG-заглушки фото товарів у `public/products/`
- [x] Документи: ARCHITECTURE.md, PROGRESS.md, README.md
- [x] Git: ініціалізація, conventional-коміти, push у `origin/main`

Як перевірено:

- `npm run build` — успішно (typecheck + збірка, усі маршрути dynamic як задумано)
- `npm run lint`, `npm run format:check` — чисто
- Smoke-тест dev-сервера: `/` 200, `/products` 200 (+фільтр `?category=software` = 2 товари),
  `/api/products` 200 (10 items), невалідний запит → 400, неіснуючий товар → 404
  (сторінка і API), image-оптимізатор віддає SVG
- Візуальна перевірка в браузері: головна, каталог, сторінка товару

## 🔜 Етап 2 — Кошик (пропозиція)

- Стан кошика (Context/Zustand або cookies) + `POST/GET /api/cart`
- Кнопки «В кошик» оживають: TODO-місця вже позначені в
  `src/components/layout/site-header.tsx` і `src/features/products/components/add-to-cart-button.tsx`
- Сторінка кошика з підрахунком сум (ціни вже зберігаються в копійках)

## 🗺 Далі (орієнтовно)

- Етап 3 — авторизація (модель User, сесії, middleware)
- Етап 4 — оформлення замовлення та оплата
- Етап 5 — адмінка (CRUD товарів), реальні фото
