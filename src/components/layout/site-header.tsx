import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CartLink } from "@/features/cart/components/cart-link";

const NAV_LINKS = [
  { href: "/", label: "Головна" },
  { href: "/products", label: "Каталог" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="font-heading text-lg font-semibold tracking-tight">
          Allin<span className="text-muted-foreground">-Store</span>
        </Link>
        <nav className="flex items-center gap-1" aria-label="Головна навігація">
          {NAV_LINKS.map((link) => (
            <Button key={link.href} asChild variant="ghost" size="sm">
              <Link href={link.href}>{link.label}</Link>
            </Button>
          ))}
          <CartLink />
        </nav>
      </div>
    </header>
  );
}
