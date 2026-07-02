import { ArrowLeft, ArrowRight, Share2 } from "lucide-react";
import { Link } from "../router";
import { journalPosts, products, rawShea } from "../data";
import { formatPrice } from "../currency";
import type { AppOutletContext } from "../types";
import Picture from "../components/Picture";

type Props = { slug: string; ctx: AppOutletContext };

const allProducts = [...products, rawShea];

export default function JournalArticle({ slug, ctx }: Props) {
  const { addToCart, pushToast } = ctx;
  const post = journalPosts.find((p) => p.slug === slug);
  const relatedProduct = post?.relatedProductId
    ? allProducts.find((p) => p.id === post.relatedProductId)
    : null;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: post?.title ?? "Shea Journal", url }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      pushToast("Article link copied");
    }
  };

  if (!post) {
    return (
      <div className="page-fade article-not-found">
        <h2>Article not found.</h2>
        <Link to="/journal">← Back to Journal</Link>
      </div>
    );
  }

  return (
    <div className="page-fade">
      {/* Article hero */}
      <section className="article-hero">
        <Picture src={post.image} alt={post.title} width={1536} height={1024} priority />
        <div className="article-hero-scrim" />
        <div className="article-hero-content">
          <div className="article-meta">
            <Link to="/journal" className="article-back"><ArrowLeft size={16} /> Journal</Link>
            <span className="article-category">{post.category}</span>
            <span className="article-read-time">{post.readTime}</span>
          </div>
          <h1>{post.title}</h1>
        </div>
      </section>

      {/* Article body */}
      <article className="article-body">
        <p className="article-excerpt">{post.excerpt}</p>

        {post.body.map((section, i) => (
          <div className="article-section" key={i}>
            {section.heading && <h2>{section.heading}</h2>}
            <p>{section.text}</p>
          </div>
        ))}

        {/* Share row */}
        <div className="article-share">
          <span>Share this note</span>
          <button onClick={handleShare} className="share-pill">
            <Share2 size={16} /> Share article
          </button>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="share-pill"
          >
            Post on X
          </a>
        </div>
      </article>

      {/* Related product */}
      {relatedProduct && (
        <section className="article-related">
          <p className="eyebrow">Referenced in this note</p>
          <div className="article-related-card">
            <Picture src={relatedProduct.image} alt={relatedProduct.name} width={500} height={625} />
            <div>
              <span>{relatedProduct.step}</span>
              <h3>{relatedProduct.name}</h3>
              <p>{relatedProduct.story}</p>
              <p className="article-related-price">{formatPrice(relatedProduct.price)}</p>
              <button onClick={() => addToCart(relatedProduct)}>Add to Bag</button>
            </div>
          </div>
        </section>
      )}

      {/* Back + next articles */}
      <section className="article-nav-row">
        <Link to="/journal" className="article-back-full">
          <ArrowLeft size={18} /> Back to Journal
        </Link>
        <div className="article-other-posts">
          {journalPosts
            .filter((p) => p.slug !== slug)
            .slice(0, 2)
            .map((p) => (
              <Link to={`/journal/${p.slug}`} key={p.slug} className="article-other-card">
                <Picture src={p.image} alt={p.title} width={600} height={400} />
                <div>
                  <span>{p.category} · {p.readTime}</span>
                  <h4>{p.title}</h4>
                </div>
                <ArrowRight size={16} />
              </Link>
            ))}
        </div>
      </section>
    </div>
  );
}
