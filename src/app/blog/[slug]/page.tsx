import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/layout/container";
import { JsonLd } from "@/components/seo/json-ld";
import { getPost, posts, relatedPosts } from "@/content/blog";
import { siteConfig } from "@/config/site";
import { pageMeta } from "@/lib/seo";

export const instant = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return pageMeta(post.title, post.excerpt, `/blog/${post.slug}`);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();
  const related = relatedPosts(post.slug);

  return (
    <article className="bg-ivory">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: post.title,
          datePublished: post.date,
          description: post.excerpt,
          image: `${siteConfig.url}${post.image}`,
          author: { "@type": "Organization", name: siteConfig.name },
          publisher: { "@type": "Organization", name: siteConfig.name },
          mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
        }}
      />
      <Container className="py-10">
        <nav aria-label="Breadcrumb" className="text-sm text-muted">
          <Link href="/" className="hover:text-gold-ink">Home</Link>
          <span aria-hidden> / </span>
          <Link href="/blog" className="hover:text-gold-ink">Journal</Link>
          <span aria-hidden> / </span>
          <span aria-current="page">{post.title}</span>
        </nav>
        <p className="mt-6 text-xs uppercase tracking-[0.2em] text-gold-ink">{post.category} · {post.date}</p>
        <h1 className="mt-3 max-w-3xl font-serif text-5xl leading-tight">{post.title}</h1>
        <div className="relative mt-8 aspect-[16/8] overflow-hidden rounded-3xl">
          <Image src={post.image} alt={post.imageAlt} fill priority className="object-cover" sizes="100vw" />
        </div>
        <div className="mx-auto mt-10 max-w-3xl space-y-5 text-base leading-8 text-charcoal">
          {post.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </Container>
      <section className="bg-white py-14">
        <Container>
          <h2 className="font-serif text-3xl">Related reading</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/blog/${item.slug}`} className="rounded-2xl border border-line p-4 hover:border-gold">
                <p className="text-xs uppercase tracking-[0.16em] text-gold-ink">{item.category}</p>
                <h3 className="mt-2 font-serif text-2xl">{item.title}</h3>
              </Link>
            ))}
          </div>
        </Container>
      </section>
    </article>
  );
}
