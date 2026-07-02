import { useEffect, useRef } from "react";
import { ArrowRight, Sparkles, Leaf, Heart, Star, Truck } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "../router";
import { galleryImages, ritualSteps } from "../data";
import type { AppOutletContext } from "../types";
import Picture from "../components/Picture";

type Props = { ctx: AppOutletContext };

const instagramImages = [
  "/Template-1/assets/brand-lifestyle-ritual.png",
  "/Template-1/assets/soapsheatales.png",
  "/Template-1/assets/brand-ritual-textures.png",
  "/Template-1/assets/lotionsheatales.png",
  "/Template-1/assets/brand-shea-source.png",
  "/Template-1/assets/lipbumsheatales.png",
];

const trustStats = [
  { icon: Leaf, value: "100%", label: "Raw, unrefined shea" },
  { icon: Heart, value: "Women-led", label: "Ghanaian cooperatives" },
  { icon: Star, value: "4.9 / 5", label: "From verified rituals" },
  { icon: Truck, value: "2–3 days", label: "Careful studio dispatch" },
];

const sheaActives = [
  { title: "Vitamins A, E & F", copy: "The trio that keeps skin supple, calm, and shielded from daily wear." },
  { title: "Deep, lasting moisture", copy: "Fatty acids that sink past the surface and hold water where skin needs it." },
  { title: "Barrier repair", copy: "Rebuilds the skin barrier softened by weather, water, and time." },
  { title: "Nothing extra", copy: "No parabens, no sulfates, no fillers — just butter with a long memory." },
];

export default function Home({ ctx }: Props) {
  const { setQuizOpen } = ctx;

  const heroRef = useRef<HTMLElement>(null);
  const heroVideoRef = useRef<HTMLVideoElement>(null);

  // Scroll-linked parallax: the hero video plus any [.parallax-img] editorial
  // image. Each carries overscan (scale) so the drift never exposes an edge.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const c = gsap.context(() => {
      gsap.fromTo(
        heroVideoRef.current,
        { yPercent: -6, scale: 1.15 },
        {
          yPercent: 12, scale: 1.15, ease: "none",
          scrollTrigger: { trigger: heroRef.current, start: "top top", end: "bottom top", scrub: true },
        }
      );
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((el) => {
        gsap.fromTo(
          el,
          { yPercent: -9, scale: 1.16 },
          {
            yPercent: 9, scale: 1.16, ease: "none",
            scrollTrigger: { trigger: el.closest("section") ?? el, start: "top bottom", end: "bottom top", scrub: true },
          }
        );
      });
    });
    return () => c.revert();
  }, []);

  return (
    <div className="page-fade">
      {/* Hero */}
      <section className="hero-section" ref={heroRef}>
        <video ref={heroVideoRef} autoPlay loop muted playsInline src="/Template-1/assets/head.mp4" />
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
        <div className="manifesto-top">
          <div className="manifesto-main">
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
              ].map((line, i) => (
                <span className="line-mask" key={line}>
                  <h1 className="line-reveal" style={{ transitionDelay: `${i * 80}ms` }}>{line}</h1>
                </span>
              ))}
            </div>
          </div>
          <aside className="manifesto-aside reveal">
            <p>
              We didn't set out to chase a trend. We set out to bottle a feeling most of us
              first knew as children — skin that's cared for, softened, and safe. Every batch
              is small, every ingredient earns its place, and nothing is added to impress a label.
            </p>
            <ul className="manifesto-values">
              <li>Raw &amp; unrefined</li>
              <li>Women-led sourcing</li>
              <li>Small-batch</li>
              <li>Made in Ghana</li>
            </ul>
            <p className="manifesto-sign">— Selina, Founder</p>
          </aside>
        </div>
      </section>

      {/* Full-bleed brand statement */}
      <section className="statement-band">
        <div className="pic-parallax">
          <Picture src="/Template-1/assets/brand-lifestyle-ritual.png" alt="A quiet daily shea ritual" width={1600} height={900} className="parallax-img" />
        </div>
        <div className="statement-overlay" />
        <div className="statement-copy reveal">
          <p className="eyebrow">Care as a memory</p>
          <h2>Slow skincare, made to be felt — never rushed.</h2>
          <p>A few honest products, used with intention. That's the whole idea.</p>
        </div>
      </section>

      {/* Trust / stats bar */}
      <section className="trust-bar">
        {trustStats.map((stat) => (
          <div className="trust-cell reveal" key={stat.label}>
            <stat.icon size={22} strokeWidth={1.3} />
            <strong>{stat.value}</strong>
            <span>{stat.label}</span>
          </div>
        ))}
      </section>

      {/* Ingredient benefits split */}
      <section className="ingredient-split">
        <div className="ingredient-media reveal">
          <div className="pic-parallax">
            <Picture src="/Template-1/assets/brand-ritual-textures.png" alt="Raw whipped shea butter texture" width={800} height={1000} className="parallax-img" />
          </div>
          <span className="ingredient-badge">Nut to butter,<br />nothing lost.</span>
        </div>
        <div className="ingredient-copy reveal">
          <p className="eyebrow">What's inside</p>
          <h2>One ingredient, patiently understood.</h2>
          <p className="ingredient-lede">
            Every Shea Tales formula begins with raw, unrefined shea butter — whipped by hand,
            never bleached or deodorised, so the vitamins that make it work stay exactly where they belong.
          </p>
          <div className="ingredient-list">
            {sheaActives.map((active, i) => (
              <div className="ingredient-item reveal" key={active.title} style={{ transitionDelay: `${i * 70}ms` }}>
                <span className="ingredient-num">0{i + 1}</span>
                <div>
                  <h3>{active.title}</h3>
                  <p>{active.copy}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Ritual teaser */}
      <section className="ritual-teaser">
        <div className="ritual-teaser-head reveal">
          <p className="eyebrow">The Ritual</p>
          <h2>Cleanse. Soften. Seal.</h2>
          <p>Three everyday products, one complete shea routine.</p>
          <div className="ritual-teaser-actions">
            <Link to="/shop" className="ritual-shop-link">Shop the Ritual <ArrowRight size={16} /></Link>
          </div>
        </div>
        <div className="ritual-stage">
          {ritualSteps.map((step, index) => (
            <article
              className="ritual-card stagger"
              style={{ transitionDelay: `${index * 120}ms` }}
              key={step.title}
            >
              <Picture src={step.image} alt={`${step.title} ritual step`} width={500} height={625} />
              <span>0{index + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.copy}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Shop lead — invitation to the shop, no products on home */}
      <section className="shop-lead">
        <div className="shop-lead-inner reveal">
          <p className="eyebrow">The Collection</p>
          <h2>Four products. One complete ritual.</h2>
          <p>Soap, lotion, lip balm, and raw shea butter — everything you need to cleanse, soften, and seal. Meet the full collection in the shop.</p>
          <Link to="/shop" className="shop-lead-btn">Explore the Shop <ArrowRight size={18} /></Link>
        </div>
      </section>

      {/* Editorial pictorial — The Source */}
      <section className="editorial-split">
        <div className="editorial-copy reveal">
          <p className="eyebrow">The Source</p>
          <h2>From Ghana's shea belt to your skin.</h2>
          <p>
            Our butter is crafted by women's cooperatives in northern Ghana, where shea has been
            harvested, cracked, roasted, and whipped by hand for generations. Buying it fairly keeps
            that craft — and the women who hold it — at the centre of everything we make.
          </p>
          <Link to="/story" className="editorial-link">Read our story <ArrowRight size={16} /></Link>
        </div>
        <div className="editorial-media reveal">
          <div className="pic-parallax tall">
            <Picture src="/Template-1/assets/brand-shea-source.png" alt="Shea harvest in northern Ghana" width={820} height={1040} className="parallax-img" />
          </div>
        </div>
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
              <Picture src={image} alt="Shea Tales brand and product story" key={`${image}-${index}`} width={600} height={400} />
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
              <Picture src={src} alt={`Shea Tales on Instagram ${i + 1}`} width={400} height={400} />
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
