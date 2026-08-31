export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-1 px-4 py-8 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} Allin-Store — техніка та софт.</p>
        <p>Працюємо та доставляємо по всій Україні.</p>
      </div>
    </footer>
  );
}
