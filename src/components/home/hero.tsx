"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const HIGHLIGHTS = [
  "Гарантія 12 місяців",
  "Доставка по всій Україні",
  "Лише ліцензійне ПЗ",
] as const;

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-primary text-primary-foreground">
      {/* Декоративні світлові плями на темному тлі. */}
      <div
        aria-hidden
        className="absolute -top-32 right-0 size-[480px] rounded-full bg-white/5 blur-3xl"
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -left-20 size-[420px] rounded-full bg-white/5 blur-3xl"
      />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative mx-auto w-full max-w-6xl px-4 py-20 sm:px-6 sm:py-28"
      >
        <div className="max-w-2xl">
          <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-medium tracking-wide">
            Нові надходження щотижня
          </span>
          <h1 className="mt-5 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            Техніка та софт — все в одному місці
          </h1>
          <p className="mt-4 text-base text-primary-foreground/70 sm:text-lg">
            Ноутбуки, смартфони, гаджети та ліцензійне програмне забезпечення з доставкою по
            Україні.
          </p>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            className="mt-8"
          >
            <Button
              asChild
              size="lg"
              className="h-11 bg-primary-foreground px-6 text-base text-primary hover:bg-primary-foreground/90"
            >
              <Link href="/products">Перейти до каталогу</Link>
            </Button>
          </motion.div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-primary-foreground/60">
            {HIGHLIGHTS.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
}
