# ARCHITECTURE.md — Allin-Store

> Головний документ проєкту. Написаний так, щоб новий розробник або AI зрозумів
> проєкт із цього файлу, не перечитуючи весь код. **Оновлюй після кожної суттєвої зміни.**

## 1. Що це

**Allin-Store** — інтернет-магазин техніки та програмного забезпечення (Next.js fullstack).
Мова інтерфейсу — українська.

**Поточний стан: Етап 1 «Каркас» — ЗАВЕРШЕНО.**
Працює: перегляд товарів (головна, каталог з фільтром за категорією, сторінка товару),
REST API для товарів, Prisma + SQLite з seed-даними.
**Ще немає**: кошика, авторизації, оплати, реальних фото (див. розділ 9).

## 2. Швидкий старт

```bash
npm install            # встановити залежності
npm run db:push        # створити SQLite-БД зі схеми (prisma/dev.db → ./dev.db у корені)
npm run db:seed        # засіяти 10 тестових товарів
npm run dev            # http://localhost:3000
```

Інші команди: `npm run build` (prod-збірка + typecheck), `npm run lint`, `npm run format`,
`npm run db:studio` (GUI для БД).

> ⚠️ У цьому середовищі npm блокує install-скрипти. Після `npm install` виконай
> `npm approve-scripts better-sqlite3 esbuild @prisma/engines prisma`, інакше нативний
> драйвер SQLite не збереться (політика записана в `allowScripts` у package.json).

## 3. Стек

| Шар       | Технологія                                                                                                |
| --------- | --------------------------------------------------------------------------------------------------------- |
| Фронт     | Next.js 16 (App Router, Turbopack), React 19, TypeScript 5 (strict)                                       |
| Стилі     | Tailwind CSS v4 (CSS-first конфіг у `src/app/globals.css`)                                                |
| UI        | shadcn/ui — стиль `radix-nova` (див. `components.json`), іконки lucide-react                              |
| Анімації  | Framer Motion (мінімально: `FadeIn`, hero)                                                                |
| Бекенд    | Next.js Route Handlers (`src/app/api/**`)                                                                 |
| Дані      | Prisma 7 (новий `prisma-client` генератор) + SQLite через driver adapter `@prisma/adapter-better-sqlite3` |
| Валідація | Zod 4 (параметри запитів)                                                                                 |
| Якість    | ESLint 9 (flat config) + Prettier + prettier-plugin-tailwindcss                                           |

Prisma 7 — не «той Prisma, що в старих туторіалах»: конфіг CLI лежить у `prisma7.config.ts`
(не в schema.prisma), клієнт генерується в `src/generated/prisma`, а `PrismaClient`
**обов'язково** створюється з driver-адаптером.

## 4. Структура папок

```
E:\Allin-Store
├── prisma/
│   ├── schema.prisma          # схеми БД (модель Product)
│   └── seed.ts                # тестові товари (npm run db:seed)
├── prisma7.config.ts          # конфіг Prisma CLI: schema, DATABASE_URL, seed-команда
├── public/products/*.svg      # згенеровані SVG-заглушки фото товарів (Етап 1)
├── scripts/                   # (порожньо) одноразові утиліти
├── src/
│   ├── app/                   # App Router: сторінки + API
│   │   ├── layout.tsx         # корінь: шапка/футер, шрифт Inter (cyrillic), metadata
│   │   ├── page.tsx           # Головна: hero + «Популярні товари» (4 шт.)
│   │   ├── not-found.tsx      # 404
│   │   ├── globals.css        # Tailwind v4 + shadcn-тема (oklch-змінні)
│   │   ├── products/
│   │   │   ├── page.tsx       # Каталог: сітка + пілюлі фільтра ?category=
│   │   │   └── [id]/page.tsx  # Сторінка товару (+ generateMetadata)
│   │   └── api/products/
│   │       ├── route.ts       # GET /api/products?category=
│   │       └── [id]/route.ts  # GET /api/products/[id]
│   ├── components/            # спільні компоненти
│   │   ├── ui/                # shadcn/ui (button, card, badge) — через `npx shadcn add`
│   │   ├── layout/            # site-header, site-footer
│   │   ├── home/hero.tsx      # hero-банер (client, Framer Motion)
│   │   └── motion/fade-in.tsx # обгортка для м'якої появи блоків (client)
│   ├── features/products/     # фіча «товари» — уся доменна логіка тут
│   │   ├── components/        # product-card, product-grid, add-to-cart-button
│   │   ├── queries.ts         # getProducts / getProductById (Prisma + React cache())
│   │   ├── schemas.ts         # Zod-схеми запитів
│   │   └── categories.ts      # довідник категорій (slug ↔ українська назва)
│   ├── lib/
│   │   ├── db.ts              # singleton PrismaClient (адаптер better-sqlite3)
│   │   ├── format-price.ts    # форматування ціни з копійок у "42 999 ₴"
│   │   └── utils.ts           # cn() від shadcn
│   ├── types/product.ts       # тип Product = PrismaProduct (джерело правди — схема)
│   └── generated/prisma/      # ЗГЕНЕРОВАНИЙ клієнт Prisma — не редагувати, у git не потрапляє
├── dev.db                     # SQLite-файл (gitignored)
├── ARCHITECTURE.md, PROGRESS.md, README.md
└── .env                       # DATABASE_URL (gitignored; приклад — .env.example)
```

## 5. Потік даних

```
Сторінка (Server Component, force-dynamic)
   → src/features/products/queries.ts  (getProducts / getProductById, React cache())
      → src/lib/db.ts  (Prisma singleton + better-sqlite3 adapter)
         → SQLite (./dev.db)

Клієнт/fetch → GET /api/products?category=…
   → Zod-валідація (features/products/schemas.ts)
      → ті самі queries.ts → NextResponse.json
```

Правила:

- **Сторінки читають БД напряму** через `queries.ts` (не через власний API) — це канонічний
  стиль App Router. API-роути існують для майбутнього клієнтського коду (кошик і т.д.).
- На кожній сторінці, що читає БД, стоїть `export const dynamic = "force-dynamic"` —
  інакше Next 16 запікає дані в статику під час build. Коли з'явиться кешування —
  замінимо на ISR/`cacheComponents` свідомо.
- Вхідні дані API **завжди** валідуються Zod-схемами з `features/*/schemas.ts`.

## 6. Ключові рішення

1. **Ціна зберігається в копійках (`Int`)**: `42999 грн → 4_299_900`. Без округлень
   floating-point, готово до оплат. Для показу — `formatPrice()` з `lib/format-price.ts`.
2. **Категорія — поки `string`-slug** (`"laptops"`, `"software"`…). Словник для UI —
   `features/products/categories.ts`. На етапі з адмінкою можна винести в окрему таблицю.
3. **Prisma 7 (остання стабільна лінія)**: новий генератор `prisma-client` з output у
   `src/generated/prisma`; типи імпортуються як `@/generated/prisma/client`. CLI-конфіг —
   `prisma7.config.ts` (URL БД + seed-команда). У схемі `datasource` **без** `url`.
4. **SQLite через driver adapter**: `db.ts` створює `PrismaClient` з
   `new PrismaBetterSqlite3({ url })`. `DATABASE_URL="file:./dev.db"` резолвиться
   відносно кореня проєкту — і для CLI, і для сервера.
5. **Міграцій немає**: на Етапі 1 схему розвиваємо через `npm run db:push` + `db:seed`
   (seed робить `deleteMany` + `createMany`, тобто перестворює дані). Міграції заведемо,
   коли даними почне керувати користувач (замовлення/користувачі).
6. **Фото — локальні SVG-заглушки** в `public/products/` (генерувалися одноразовим
   скриптом). `next/image` працює з ними завдяки `images.dangerouslyAllowSVG: true` у
   `next.config.ts`. На етапі реальних фото — просто замінити `imageUrl` у БД.
7. **Шрифт Inter** з підмножиною `cyrillic` — Geist не має кирилиці, а UI українською.
8. **Типи**: доменні типи ре-експортяться з Prisma-схеми (`src/types/product.ts`) —
   єдине джерело правди, без ручних дублів.

## 7. Рецепти («як додати…»)

**…нову сторінку**: створи `src/app/<шлях>/page.tsx`. Якщо читаєш БД — додай
`export const dynamic = "force-dynamic"` і бери дані з `features/*/queries.ts`.
Метадані: `export const metadata = { title: "..." }` (шаблон `%s | Allin-Store` вже в layout).

**…нову модель БД**: опиши модель у `prisma/schema.prisma` → `npm run db:push` →
додай seed у `prisma/seed.ts` → тип ре-експортни в `src/types/<назва>.ts` →
queries в `src/features/<фіча>/queries.ts`.

**…новий API endpoint**: `src/app/api/<ресурс>/route.ts`. Валідація входу — Zod-схема з
`features/*/schemas.ts` (`safeParse` → 400 з `issues`). Дивись приклад `api/products/route.ts`.

**…shadcn-компонент**: `npx shadcn@latest add <component>` (конфіг уже в `components.json`,
компоненти кладуться в `src/components/ui/`).

**…категорію товарів**: додай запис у `CATEGORIES` (`features/products/categories.ts`)
та товары з цим slug у `prisma/seed.ts` → `npm run db:seed`.

**…порожній seed → чиста БД**: `npm run db:push && npm run db:seed`.

## 8. Конвенції

- Файли та папки — kebab-case; компоненти — PascalCase-іменування функцій.
- Шлях-аліас `@/*` → `src/*`.
- Серверні дані не пробрасываются в client-компоненти без потреби; client-компоненти
  (`"use client"`) зараз: hero, FadeIn, AddToCartButton.
- Коміти — Conventional Commits (`feat:`, `chore:`, `docs:`, `fix:`).
- Перед комітом: `npm run lint && npm run format` (Prettier сортує і Tailwind-класи).

## 9. Що навмисно відсутнє і де точки розширення

| Майбутнє                   | Де розширювати                                                                                                                             |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Кошик** (наступний етап) | TODO-мітки в `site-header.tsx` (іконка) та `add-to-cart-button.tsx`; API — новий `src/app/api/cart/**`; стан — Context/Zustand або cookies |
| **Авторизація**            | нова фіча `src/features/auth`, модель `User` у схемі, middleware                                                                           |
| **Оплата**                 | ціни вже в копійках (Int) — суми для платіжних API готові                                                                                  |
| **Замовлення**             | моделі `Order`/`OrderItem`, `features/orders`                                                                                              |
| **Реальні фото**           | замінити `imageUrl` у БД на зовнішні URL або файли в `public/`                                                                             |
| **Адмінка**                | захищена група маршрутів `(admin)`, CRUD API                                                                                               |

## 10. Відомі особливості

- `AGENTS.md` / `CLAUDE.md` у корені — службові файли Next.js для AI-агентів
  (перестворюються `next dev`); коміть їх, щоб тримати дерево чистим.
- Next 16: `params`/`searchParams` — **Promise** (робити `await`); для типів є глобальні
  хелпери `PageProps<"/products/[id]">` та `RouteContext<"/api/products/[id]">`
  (генеруються `next typegen` — запускається автоматично у `dev`/`build`).
- ESLint у Next 16 не входить у `next build` — запускати `npm run lint` окремо.
