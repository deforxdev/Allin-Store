// Seed для локальної розробки: перестворює таблицю Product тестовими товарами.
// Запуск: npm run db:seed (prisma db seed -> tsx prisma/seed.ts)
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "../src/generated/prisma/client";

const prisma = new PrismaClient({
  adapter: new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" }),
});

// Ціни в копійках: 42_999 грн -> 4_299_900 коп.
const products = [
  {
    name: 'Ноутбук ZenBook Pro 15" OLED',
    price: 4_299_900,
    description:
      'Легкий алюмінієвий ноутбук з 15,6" OLED-екраном 3.2K, процесором Intel Core Ultra 7 та автономністю до 14 годин. Для роботи, навчання й творчості.',
    imageUrl: "/products/zenbook-pro-15.svg",
    category: "laptops",
  },
  {
    name: "Смартфон Nova X12 256 ГБ",
    price: 2_499_900,
    description:
      'Прапорцевий смартфон з 6,7" AMOLED-екраном 120 Гц, основною каметою 108 Мп з оптичною стабілізацією та швидкою зарядкою 80 Вт.',
    imageUrl: "/products/nova-x12.svg",
    category: "smartphones",
  },
  {
    name: "Планшет TabFlow 11 Wi-Fi",
    price: 1_599_900,
    description:
      'Універсальний планшет з 11" екраном 2.8K, підтримкою стилуса та клавіатури-чохла. Підійде для навчання, читання й малювання.',
    imageUrl: "/products/tabflow-11.svg",
    category: "tablets",
  },
  {
    name: "Бездротові навушники AuraSound Q7",
    price: 499_900,
    description:
      "Навушники з активним шумозаглушенням, до 30 годин автономності та багатоточковим підключенням до двох пристроїв одночасно.",
    imageUrl: "/products/aurasound-q7.svg",
    category: "audio",
  },
  {
    name: 'Монітор PixelView 27" 4K IPS',
    price: 1_199_900,
    description:
      "27-дюймовий IPS-монітор з роздільною здатністю 4K, охопленням 99% sRGB та USB-C з живленням 65 Вт — один кабель для зображення й зарядки ноутбука.",
    imageUrl: "/products/pixelview-27.svg",
    category: "monitors",
  },
  {
    name: "Механічна клавіатура KeyForge RGB",
    price: 289_900,
    description:
      "Компактна 75%-клавіатура з hot-swap перемикачами, RGB-підсвіткою та дротовим і бездротовим режимами підключення.",
    imageUrl: "/products/keyforge-rgb.svg",
    category: "accessories",
  },
  {
    name: "Ігрова миша SwiftMouse Pro",
    price: 179_900,
    description:
      "Легка (58 г) ігрова миша з сенсором на 26 000 DPI, часом відгуку 1 мс та зарядом на понад 80 годин гри.",
    imageUrl: "/products/swiftmouse-pro.svg",
    category: "accessories",
  },
  {
    name: "SSD-накопичувач DataVault 1 ТБ NVMe",
    price: 329_900,
    description:
      "NVMe SSD формату M.2 зі швидкістю читання до 7 000 МБ/с — для швидкої системи, сучасних ігор і роботи з великими файлами.",
    imageUrl: "/products/datavault-1tb.svg",
    category: "storage",
  },
  {
    name: "Windows 11 Pro — ключ активації",
    price: 549_900,
    description:
      "Ліцензійний ключ Windows 11 Pro на 1 пристрій. Миттєва доставка на email, офіційна активація та гарантія.",
    imageUrl: "/products/windows-11-pro.svg",
    category: "software",
  },
  {
    name: "SafeGuard Total Security — 1 рік (5 пристроїв)",
    price: 129_900,
    description:
      "Річна передплата на антивірус для 5 пристроїв: захист від вірусів, фішингу та програм-вимагачів, батьківський контроль і VPN.",
    imageUrl: "/products/safeguard-total.svg",
    category: "software",
  },
];

async function main() {
  await prisma.product.deleteMany();
  await prisma.product.createMany({ data: products });
  console.log(`Засіяно ${products.length} товарів.`);
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
