import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="font-heading text-7xl font-semibold text-muted-foreground/40">404</p>
      <h1 className="mt-4 font-heading text-2xl font-semibold">Сторінку не знайдено</h1>
      <p className="mt-2 max-w-md text-muted-foreground">
        Можливо, товар був видалений або посилання вказує неіснуючу сторінку.
      </p>
      <Button asChild className="mt-8">
        <Link href="/">На головну</Link>
      </Button>
    </div>
  );
}
