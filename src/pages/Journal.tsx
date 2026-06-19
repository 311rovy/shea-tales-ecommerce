import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "../router";
import { journalPosts } from "../data";

const categories = ["All", "Ingredient Notes", "Ritual", "Source"];

export default function Journal() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? journalPosts
    : journalPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="page-fade">
      {/* Interior hero */}
      <section className="interior-hero">
        <div className="interior-hero-content reveal">
          <p className="eyebrow">Shea Journal</p>
          <h1>Notes from the ritual.</h1>
          <p>Ingredients, sourcing stories, and the craft behind every product.</p>
        </div>
      </section>

      {/* Category filter */}
      <section className="journal-section">
        <div className="journal-head reveal">
          <p className="eyebrow">Shea Journal</p>
          <h2>Notes from the ritual.</h2>
        </div>

        <div className="category-filter reveal">
          {categories.map((cat) => (
            <button
              className={`category-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
              key={cat}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="journal-grid">
          {filtered.map((post, index) => (
            <article
              className="journal-card stagger"
              style={{ transitionDelay: `${index * 110}ms` }}
              key={post.slug}
            >
              <img src={post.image} alt={post.title} />
              <div>
                <div className="journal-card-meta">
                  <span>{post.category}</span>
                  <span className="journal-read-time">{post.readTime}</span>
                </div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <Link to={`/journal/${post.slug}`}>
                  Read Note <ArrowRight size={16} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Newsletter */}
      <section id="contact" className="contact-section">
        <div className="contact-copy reveal">
          <p className="eyebrow">Stay in the ritual</p>
          <h2>New notes, every small batch.</h2>
        </div>
        <form className="newsletter reveal" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Email address" aria-label="Email address" />
          <button type="submit">Join</button>
        </form>
      </section>
    </div>
  );
}
