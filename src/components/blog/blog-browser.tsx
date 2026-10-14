"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { blogCategories, posts } from "@/content/blog";
import { cn } from "@/lib/utils";

export function BlogBrowser() {
  const [category, setCategory] = useState<(typeof blogCategories)[number]>("All Posts");
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return posts.filter((post) => {
      const categoryMatch = category === "All Posts" || post.category === category;
      const text = `${post.title} ${post.excerpt} ${post.category}`.toLowerCase();
      return categoryMatch && (!needle || text.includes(needle));
    });
  }, [category, query]);

  const featured = !query && category === "All Posts" ? filtered[0] : undefined;
  const rest = featured ? filtered.slice(1) : filtered;
  const pageSize = 4;
  const pages = Math.max(1, Math.ceil(rest.length / pageSize));
  const safePage = Math.min(page, pages);
  const slice = rest.slice((safePage - 1) * pageSize, safePage * pageSize);
  const counts = blogCategories.map((item) => ({
    item,
    count: item === "All Posts" ? posts.length : posts.filter((post) => post.category === item).length,
  }));

  return (
    <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
      <div>
        <div className="flex gap-2 overflow-x-auto pb-2" role="tablist" aria-label="Article categories">
          {blogCategories.map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              onClick={() => {
                setCategory(item);
                setPage(1);
              }}
              className={cn("shrink-0 rounded-full px-4 py-2 text-sm", category === item ? "bg-gold text-ink" : "bg-white")}
            >
              {item}
            </button>
          ))}
        </div>

        {featured ? (
          <article className="mt-6 overflow-hidden rounded-3xl bg-white shadow-sm">
            <Link href={`/blog/${featured.slug}`} className="relative block aspect-[16/8]">
              <Image src={featured.image} alt={featured.imageAlt} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 60vw" />
            </Link>
            <div className="p-6">
              <p className="text-xs uppercase tracking-[0.2em] text-gold-ink">{featured.category} · {featured.date}</p>
              <h2 className="mt-2 font-serif text-4xl">{featured.title}</h2>
              <p className="mt-3 leading-7 text-muted">{featured.excerpt}</p>
              <Link href={`/blog/${featured.slug}`} className="mt-4 inline-flex text-sm text-gold-ink">Read More</Link>
            </div>
          </article>
        ) : null}

        <div className="mt-6 grid gap-5 sm:grid-cols-2">
          {slice.map((post) => (
            <article key={post.slug} className="overflow-hidden rounded-2xl bg-white shadow-sm">
              <Link href={`/blog/${post.slug}`} className="relative block aspect-[16/10]">
                <Image src={post.image} alt={post.imageAlt} fill className="object-cover" sizes="(max-width: 768px) 100vw, 30vw" />
              </Link>
              <div className="p-4">
                <p className="text-xs uppercase tracking-[0.16em] text-gold-ink">{post.category}</p>
                <h2 className="mt-2 font-serif text-2xl">{post.title}</h2>
                <p className="mt-2 text-sm leading-6 text-muted">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-3 inline-flex text-sm text-gold-ink">Read More</Link>
              </div>
            </article>
          ))}
        </div>
        {filtered.length === 0 ? <p className="mt-6 text-sm text-muted">No articles match that search.</p> : null}
        {pages > 1 ? (
          <div className="mt-6 flex gap-2">
            {Array.from({ length: pages }, (_, index) => index + 1).map((number) => (
              <button
                key={number}
                type="button"
                aria-current={number === safePage ? "page" : undefined}
                onClick={() => setPage(number)}
                className={cn("size-10 rounded-full text-sm", number === safePage ? "bg-gold text-ink" : "bg-white")}
              >
                {number}
              </button>
            ))}
          </div>
        ) : null}
      </div>
      <aside className="space-y-6">
        <form
          className="flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            setQuery(String(data.get("q") ?? ""));
            setPage(1);
          }}
        >
          <label className="sr-only" htmlFor="blog-search">Search articles</label>
          <input id="blog-search" name="q" placeholder="Search articles" className="h-11 flex-1 rounded-full border border-line bg-white px-4 text-sm" />
          <button type="submit" className="h-11 rounded-full bg-gold px-4 text-sm text-ink">Search</button>
        </form>
        <div className="rounded-2xl bg-white p-5">
          <h2 className="font-serif text-2xl">Categories</h2>
          <ul className="mt-3 space-y-2 text-sm">
            {counts.map(({ item, count }) => (
              <li key={item}>
                <button type="button" className="flex w-full justify-between hover:text-gold-ink" onClick={() => { setCategory(item); setPage(1); }}>
                  <span>{item}</span><span>{count}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl bg-white p-5">
          <h2 className="font-serif text-2xl">Popular posts</h2>
          <ul className="mt-4 space-y-4">
            {posts.slice(0, 4).map((post) => (
              <li key={post.slug}>
                <Link href={`/blog/${post.slug}`} className="flex gap-3">
                  <span className="relative size-16 shrink-0 overflow-hidden rounded-lg">
                    <Image src={post.image} alt="" fill className="object-cover" sizes="64px" />
                  </span>
                  <span>
                    <span className="block text-sm font-medium leading-5">{post.title}</span>
                    <span className="text-xs text-muted">{post.date}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
}
