"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function scrollToHash() {
  const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  if (!id) return;
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function HashScroll() {
  const pathname = usePathname();

  useEffect(() => {
    const frame = window.requestAnimationFrame(scrollToHash);
    const timer = window.setTimeout(scrollToHash, 180);
    return () => {
      window.cancelAnimationFrame(frame);
      window.clearTimeout(timer);
    };
  }, [pathname]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const anchor = (event.target as Element | null)?.closest("a");
      if (!(anchor instanceof HTMLAnchorElement)) return;
      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:")) return;
      let url: URL;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin || !url.hash) return;
      if (url.pathname !== window.location.pathname) return;
      const id = decodeURIComponent(url.hash.slice(1));
      const target = document.getElementById(id);
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.history.pushState(null, "", `${url.pathname}${url.search}#${id}`);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
