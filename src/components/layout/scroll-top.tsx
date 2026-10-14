"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      className="fixed bottom-[max(1.25rem,env(safe-area-inset-bottom))] right-[max(9.75rem,calc(env(safe-area-inset-right)+9.75rem))] z-40 inline-flex size-11 items-center justify-center rounded-full bg-gold text-ink shadow-lg hover:bg-gold-deep"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <ArrowUp className="size-5" />
    </button>
  );
}
