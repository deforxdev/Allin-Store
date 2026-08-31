# Allin-Store 🛒

Інтернет-магазин техніки та програмного забезпечення (українською). Fullstack на Next.js.

**Поточний стан:** Етап 1 «Каркас» — каталог працює, кошик/авторизація/оплата на наступних етапах.

## Швидкий старт

```bash
npm install
npm run db:push    # створити SQLite-БД зі схеми Prisma
npm run db:seed    # засіяти 10 тестових товарів
npm run dev        # → http://localhost:3000
```

> Якщо npm блокує install-скрипти: `npm approve-scripts better-sqlite3 esbuild @prisma/engines prisma`

## Скрипти

| Команда             | Дія                                       |
| ------------------- | ----------------------------------------- |
| `npm run dev`       | dev-сервер (http://localhost:3000)        |
| `npm run build`     | prod-збірка + typecheck                   |
| `npm run lint`      | ESLint                                    |
| `npm run format`    | Prettier (write, сортує і Tailwind-класи) |
| `npm run db:push`   | застосувати схему Prisma до SQLite        |
| `npm run db:seed`   | засіяти тестові товари                    |
| `npm run db:studio` | Prisma Studio (GUI для БД)                |

## Стек

Next.js 16 · React 19 · TypeScript (strict) · Tailwind CSS v4 · shadcn/ui ·
Framer Motion · Prisma 7 + SQLite · Zod · ESLint + Prettier

## Документація

- **[ARCHITECTURE.md](./ARCHITECTURE.md)** — стек, структура папок, потік даних, рецепти «як додати…», точки розширення. Почни з нього.
- **[PROGRESS.md](./PROGRESS.md)** — журнал етапів: що зроблено, що далі.
