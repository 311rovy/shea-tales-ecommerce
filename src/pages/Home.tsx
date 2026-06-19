import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "../router";
import { galleryImages, products, rawShea, ritualSteps } from "../data";
import type { AppOutletContext } from "../types";

type Props = { ctx: AppOutletContext };

const instagramImages = [
  "/Template-1/assets/brand-lifestyle-ritual.png",
  "/Template-1/assets/soapsheatales.png",
  "/Template-1/assets/brand-ritual-textures.png",
  "/Template-1/assets/lotionsheatales.png",
  "/Template-1/assets/brand-shea-source.png",
  "/Template-1/assets/lipbumsheatales.png",
];

export default function Home({ ctx }: Props) {
  const { addToCart, addBundle, setQuizOpen } = ctx;

  return (
    <div className="page-fade">
      {/* Hero */}
      <section className="hero-section">
        <video autoPlay loop muted playsInline src="/Template-1/assets/head.mp4" />
        <div className="hero-overlay" />
        <div className="hero-content reveal">
          <span>Ghanaian shea butter skincare</span>
          <h1>Shea Tales</h1>
          <p>Daily skin rituals shaped by craft, comfort, and raw golden butter.</p>
          <Link to="/shop" className="hero-cta">
            Enter the Ritual <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* Manifesto lines */}
      <section className="manifesto-lines-section">
        <div className="manifesto-eyebrow reveal">
          <p className="eyebrow">Brand Manifesto</p>
          <h2>Not clean beauty as a trend. Care as a memory.</h2>
        </div>
        <div className="manifesto-lines">
          {[
            "Shea Tales begins with the butter.",
            "A raw, golden ingredient with a long memory.",
            "Made by hands that know patience.",
            "Used by skin that asks for softness.",
          ].map((line) => (
            <h1 className="line-reveal" key={line}>{line}</h1>
          ))}
        </div>
      </section>

      {/* Ritual teaser */}
      <section className="ritual-teaser">
        <div className="ritual-teaser-head reveal">
          <p className="eyebrow">The Ritual</p>
          <h2>Cleanse. Soften. Seal.</h2>
          <p>Three everyday products, one complete shea routine.</p>
          <div className="ritual-teaser-actions">
            <button onClick={addBundle}>Add Complete Ritual — $61.97</button>
            <Link to="/shop">Explore Products <ArrowRight size={16} /></Link>
          </div>
        </div>
        <div className="ritual-stage">
          {ritualSteps.map((step, index) => (
            <article
              className="ritual-card stagger"
              style={{ transitionDelay: `${index * 120}ms` }}
              key={step.title}
            >
              <img src={step.image} alt={`${step.title} ritual step`} />
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Raw Shea spotlight */}
      <section id="page4" className="spotlight-section">
        <video autoPlay muted loop playsInline src="/Template-1/assets/841b3aa6ab3247b89c067144fcd7f099.webm" />
        <div className="spotlight-content reveal">
          <h2>Raw Shea</h2>
          <p>The origin product — 250g</p>
          <strong>$42.00</strong>
          <button onClick={() => addToCart(rawShea)}>Add to Bag</button>
        </div>
        <div className="orbit orbit-one" />
        <div className="orbit orbit-two" />
      </section>

      {/* Reviews */}
      <section className="reviews-section">
        {[
          { text: "\"It feels like a brand with a real story, not just another body care line.\"", author: "Amara K. / verified order" },
          { text: "\"The ritual makes sense. Soap, lotion, balm. Nothing extra, everything useful.\"", author: "Nia B. / complete ritual set" },
          { text: "\"The textures are beautiful, and the sourcing story makes the products feel grounded.\"", author: "Lena T. / raw shea customer" },
        ].map((r) => (
          <div className="review-card reveal" key={r.author}>
            <Sparkles size={28} />
            <p>{r.text}</p>
            <span>{r.author}</span>
          </div>
        ))}
      </section>

      {/* Gallery slider */}
      <section id="page5">
        <h1 className="reveal">Stories in Skin.</h1>
        <div className="swipper">
          <div className="swiper-slide">
            {[...galleryImages, ...galleryImages].map((image, index) => (
              <img src={image} alt="Shea Tales brand and product story" key={`${image}-${index}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Instagram placeholder */}
      <section className="instagram-section">
        <div className="instagram-head reveal">
          <p className="eyebrow">Follow along</p>
          <h2>@sheatales</h2>
          <p>Real rituals. Real textures. Daily skin stories from the community.</p>
        </div>
        <div className="instagram-grid reveal">
          {instagramImages.map((src, i) => (
            <div className="instagram-cell" key={i}>
              <img src={src} alt={`Shea Tales on Instagram ${i + 1}`} loading="lazy" />
              <div className="instagram-hover">
                <Sparkles size={20} />
              </div>
            </div>
          ))}
        </div>
        <a className="instagram-cta" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          View Profile <ArrowRight size={16} />
        </a>
      </section>

      {/* Newsletter */}
      <section id="contact" className="contact-section">
        <div className="contact-copy reveal">
          <p className="eyebrow">The Softness List</p>
          <h2>Restocks, rituals, and small-batch drops.</h2>
        </div>
        <form className="newsletter reveal" onSubmit={(e) => e.preventDefault()}>
          <input type="email" placeholder="Email address" aria-label="Email address" />
          <button type="button" onClick={() => setQuizOpen(true)}>
            Join
          </button>
        </form>
      </section>
    </div>
  );
}
