import { useState } from "react";
import { ArrowRight, Heart, RotateCcw, Search, ShieldCheck, Truck } from "lucide-react";
import { products, rawShea } from "../data";
import type { AppOutletContext } from "../types";
import Picture from "../components/Picture";

type Props = {
  ctx: AppOutletContext;
  openFaq: number;
  setOpenFaq: (i: number) => void;
};

const allProducts = [...products, rawShea];
const filters = ["All", "Cleanse", "Soften", "Seal", "Restore"];

export default function Shop({ ctx, openFaq, setOpenFaq }: Props) {
  const { addToCart, addBundle, toggleWishlist, setSelectedProduct, setQuizOpen, wishlist, stockMap } = ctx;
  const [shopFilter, setShopFilter] = useState("All");

  const filtered = shopFilter === "All" ? allProducts : allProducts.filter((p) => p.step === shopFilter);

  return (
    <div className="page-fade">
      {/* Interior page hero */}
      <section className="interior-hero">
        <div className="interior-hero-content reveal">
          <p className="eyebrow">The Core Collection</p>
          <h1>Shop the Ritual</h1>
          <p>Three products with a point of view. One complete shea routine.</p>
        </div>
      </section>

      {/* Free shipping bar */}
      <div className="shipping-bar">
        <Truck size={16} /> Free shipping on all orders over $50 &nbsp;·&nbsp; <span onClick={() => setQuizOpen(true)} style={{ cursor: "pointer", textDecoration: "underline" }}>Not sure where to start? Take the quiz</span>
      </div>

      {/* Shop tools */}
      <section id="page3" className="shop-section">
        <div className="page3-top reveal">
          <h4>Shop the Ritual <span>Core Collection</span></h4>
          <h2>Products with a</h2>
          <h2>Point of View</h2>
        </div>

        <div className="shop-tools reveal" aria-label="Shop filters">
          <div className="search-pill">
            <Search size={18} />
            <span>Search shea rituals</span>
          </div>
          {filters.map((f) => (
            <button
              className={shopFilter === f ? "active" : ""}
              onClick={() => setShopFilter(f)}
              key={f}
            >
              {f}
            </button>
          ))}
        </div>

        <p className="product-count reveal">{filtered.length} product{filtered.length !== 1 ? "s" : ""}</p>

        <div className="page3-elem">
          {filtered.map((product) => (
            <article className="box product-card reveal" key={product.id}>
              <button
                className={`wishlist ${wishlist.includes(product.id) ? "active" : ""}`}
                onClick={() => toggleWishlist(product.id)}
                aria-label={`Save ${product.name}`}
              >
                <Heart size={20} />
              </button>
              <div className="product-info">
                <span>{product.step}</span>
                <h1>{product.shortName}</h1>
                <p className="product-story">{product.story}</p>
                <p className="product-price">${product.price.toFixed(2)}</p>
                <div className="product-actions">
                  <button
                    onClick={() => addToCart(product)}
                    disabled={stockMap[product.id] === 0}
                  >
                    {stockMap[product.id] === 0 ? "Out of Stock" : "Add to Bag"}
                  </button>
                  <button onClick={() => setSelectedProduct(product)}>View Ritual</button>
                </div>
              </div>
              <Picture src={product.image} alt={product.name} width={500} height={625} />
              <video autoPlay loop muted playsInline preload="metadata" src={product.video} />
            </article>
          ))}
        </div>
      </section>

      {/* Bundle CTA */}
      <section className="bundle-section reveal">
        <div className="bundle-copy">
          <p className="eyebrow">Complete Ritual</p>
          <h2>Cleanse. Soften. Seal.</h2>
          <p>All three steps together — the full shea ritual at one price.</p>
          <button onClick={addBundle}>Add Complete Ritual — $61.97 <ArrowRight size={16} /></button>
        </div>
        <Picture src="/Template-1/assets/brand-ritual-textures.png" alt="Complete Shea Tales ritual" width={400} height={600} />
      </section>

      {/* Texture section */}
      <section className="texture-section">
        <div className="texture-copy reveal">
          <p className="eyebrow">Texture Study</p>
          <h2>Butter, balm, lather, lotion.</h2>
          <p>
            The brand presence lives in the material details: the gloss of balm,
            the density of raw shea, the soft drag of lotion, and the creamy bar lather.
          </p>
        </div>
        <div className="texture-media reveal">
          <Picture src="/Template-1/assets/brand-ritual-textures.png" alt="Shea butter textures" width={400} height={600} />
        </div>
      </section>

      {/* Trust cards */}
      <section className="care-section">
        <article className="care-card reveal">
          <Truck size={26} />
          <h3>Shipping</h3>
          <p>Orders leave in 2-3 business days. Shipping is free when the bag reaches $50.</p>
        </article>
        <article className="care-card reveal">
          <RotateCcw size={26} />
          <h3>Returns</h3>
          <p>Unopened products can return within 30 days. Damaged arrivals are replaced immediately.</p>
        </article>
        <article className="care-card reveal">
          <ShieldCheck size={26} />
          <h3>Skin promise</h3>
          <p>Short ingredient lists, no sulfates, no parabens, and patch-test friendly guidance.</p>
        </article>
      </section>

      {/* Scrolling text */}
      <section id="page3-5">
        <div className="border" />
        <div className="elements">
          {[
            "Free shipping on all orders over $50.",
            "Raw shea butter leads every formula.",
            "Ethically sourced through women-led craft.",
            "No parabens. No sulfates. No noise.",
            "Small rituals, made for daily skin.",
            "This is Shea Tales.",
          ].map((line) => (
            <h1 className="line-reveal" key={line}>{line}</h1>
          ))}
        </div>
        <div className="head reveal">
          <h1>Limited Edition</h1>
          <h1>Market Basket Gift Sets</h1>
        </div>
      </section>
    </div>
  );
}
