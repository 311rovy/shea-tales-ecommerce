import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  Menu,
  Minus,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Truck,
  X,
} from "lucide-react";

type Product = {
  id: string;
  name: string;
  shortName: string;
  step: string;
  price: number;
  size: string;
  skinType: string;
  scent: string;
  texture: string;
  image: string;
  video: string;
  story: string;
  details: string;
  howToUse: string;
  ingredients: string[];
  benefits: string[];
};

type CartItem = Product & {
  quantity: number;
};

const products: Product[] = [
  {
    id: "shea-soap",
    name: "Shea Butter Soap",
    shortName: "Shea Soap",
    step: "Cleanse",
    price: 18.99,
    size: "130g",
    skinType: "Normal, dry, and sensitive-feeling skin",
    scent: "Soft cocoa and clean clay",
    texture: "Creamy bar lather",
    image: "/Template-1/assets/shea-butter-soap.png",
    video: "/Template-1/assets/video1.mp4",
    story: "A creamy cleansing bar made with shea butter and plant-based oils.",
    details:
      "The first ritual step. A gentle face, hand, and body bar that lathers softly, rinses clean, and leaves skin comfortable instead of tight.",
    howToUse: "Massage into wet skin, build a creamy lather, then rinse. Let the bar dry between uses.",
    ingredients: ["Shea butter", "Olive oil", "Castor oil", "Kaolin clay", "Cocoa pod ash"],
    benefits: ["Creamy lather", "Plant-based oils", "Low-waste bar", "Comfort cleanse"],
  },
  {
    id: "shea-lotion",
    name: "Shea Butter Lotion",
    shortName: "Shea Lotion",
    step: "Soften",
    price: 29.99,
    size: "240ml",
    skinType: "Daily body care and dry skin",
    scent: "Warm, clean, barely-there",
    texture: "Silky lotion",
    image: "/Template-1/assets/shea-butter-lotion.png",
    video: "/Template-1/assets/video1.mp4",
    story: "A silky daily lotion blended with shea butter for soft, lasting moisture.",
    details:
      "The everyday layer. Light enough for morning, rich enough for dry evenings, and made for arms, legs, hands, and every spot that needs a soft reset.",
    howToUse: "Apply after cleansing while skin is slightly damp. Layer more on elbows, knees, and hands.",
    ingredients: ["Raw shea butter", "Coconut oil", "Aloe leaf", "Vitamin E", "Baobab oil"],
    benefits: ["Fast-absorbing", "Daily body care", "Comforts dry skin", "Soft satin finish"],
  },
  {
    id: "shea-lip-balm",
    name: "Shea Butter Lip Balm",
    shortName: "Lip Balm",
    step: "Seal",
    price: 12.99,
    size: "12g",
    skinType: "Dry lips and on-the-go comfort",
    scent: "Natural cocoa butter",
    texture: "Creamy balm",
    image: "/Template-1/assets/shea-butter-lip-balm.png",
    video: "/Template-1/assets/video2.mp4",
    story: "A creamy shea balm that keeps lips smooth, soft, and comforted.",
    details:
      "The pocket ritual. A clean-glide balm with a soft natural finish, built for dry air, long days, and small moments of care.",
    howToUse: "Swipe onto lips whenever they feel dry. Press a little over cuticles for emergency softness.",
    ingredients: ["Shea butter", "Beeswax", "Jojoba oil", "Cocoa butter", "Moringa oil"],
    benefits: ["Pocket ready", "Soft natural finish", "No heavy scent", "Comforting seal"],
  },
];

const faqs = [
  {
    question: "When will my order ship?",
    answer: "Orders ship in 2-3 business days. Free shipping applies to orders over $50.",
  },
  {
    question: "Is everything made with real shea butter?",
    answer: "Yes. Every product is built around shea butter sourced through women-led Ghanaian cooperatives.",
  },
  {
    question: "What is the return policy?",
    answer: "Unopened products can be returned within 30 days. If something arrives damaged, we make it right.",
  },
  {
    question: "Can I use these on sensitive skin?",
    answer: "The formulas are intentionally simple and gentle, but patch test first if your skin reacts easily.",
  },
];

const ritualSteps = [
  {
    title: "Cleanse",
    copy: "A creamy soap ritual that respects the skin barrier before anything else touches it.",
    image: "/Template-1/assets/shea-butter-soap.png",
  },
  {
    title: "Soften",
    copy: "A daily shea lotion for the quiet work of keeping skin comfortable from morning to night.",
    image: "/Template-1/assets/shea-butter-lotion.png",
  },
  {
    title: "Seal",
    copy: "A balm for lips, cuticles, and small dry places that ask for care throughout the day.",
    image: "/Template-1/assets/shea-butter-lip-balm.png",
  },
];

const brandValues = [
  "Raw shea first",
  "Women-led sourcing",
  "Skin comfort over trends",
  "Small-batch restraint",
];

const galleryImages = [
  "/Template-1/assets/brand-shea-source.png",
  "/Template-1/assets/brand-ritual-textures.png",
  "/Template-1/assets/brand-lifestyle-ritual.png",
  "/Template-1/assets/shea-butter-lotion.png",
  "/Template-1/assets/shea-butter-lip-balm.png",
  "/Template-1/assets/shea-butter-soap.png",
];

const menuLinks = [
  {
    label: "Manifesto",
    href: "#manifesto",
    image: "/Template-1/assets/brand-lifestyle-ritual.png",
    copy: "The emotional world of Shea Tales.",
  },
  {
    label: "Ritual",
    href: "#ritual",
    image: "/Template-1/assets/brand-ritual-textures.png",
    copy: "Cleanse, soften, and seal.",
  },
  {
    label: "Source",
    href: "#source",
    image: "/Template-1/assets/brand-shea-source.png",
    copy: "From Ghanaian shea craft to daily skin care.",
  },
  {
    label: "Shop",
    href: "#page3",
    image: "/Template-1/assets/shea-butter-lotion.png",
    copy: "The core three products.",
  },
  {
    label: "Journal",
    href: "#journal",
    image: "/Template-1/assets/shea-butter-soap.png",
    copy: "Stories, formulas, and rituals.",
  },
];

const quizOptions = [
  {
    id: "cleanse",
    label: "I want a softer cleanse",
    result: "shea-soap",
  },
  {
    id: "dryness",
    label: "My body skin feels dry",
    result: "shea-lotion",
  },
  {
    id: "lips",
    label: "My lips need comfort",
    result: "shea-lip-balm",
  },
  {
    id: "whole-ritual",
    label: "I want the whole ritual",
    result: "bundle",
  },
];

const journalPosts = [
  {
    title: "Why Raw Shea Feels Different",
    category: "Ingredient Notes",
    image: "/Template-1/assets/brand-shea-source.png",
    copy: "The density, slip, and softness of shea butter begin long before it reaches the jar.",
  },
  {
    title: "The Cleanse / Soften / Seal Method",
    category: "Ritual",
    image: "/Template-1/assets/brand-ritual-textures.png",
    copy: "A three-step body ritual made for real mornings, long days, and dry-skin evenings.",
  },
  {
    title: "From Nut to Butter",
    category: "Source",
    image: "/Template-1/assets/brand-lifestyle-ritual.png",
    copy: "Gather, roast, grind, knead, and finish: the process behind the Shea Tales standard.",
  },
];

function App() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [openFaq, setOpenFaq] = useState(0);
  const [shopFilter, setShopFilter] = useState("All");
  const [activeMenuImage, setActiveMenuImage] = useState(menuLinks[0].image);
  const [quizChoice, setQuizChoice] = useState(quizOptions[0].id);

  const rawShea: Product = {
    id: "raw-shea-250",
    name: "Raw Shea Butter 250g",
    shortName: "Raw Shea",
    step: "Restore",
    price: 42,
    size: "250g",
    skinType: "Very dry skin, body, and hair",
    scent: "Naturally nutty",
    texture: "Dense golden butter",
    image: "/Template-1/assets/brand-ritual-textures.png",
    video: "/Template-1/assets/841b3aa6ab3247b89c067144fcd7f099.webm",
    story: "Unrefined shea butter made by women-led cooperatives in Ghana.",
    details: "A dense, golden butter for deep body moisture, protective styling, and overnight skin care.",
    howToUse: "Warm a pea-sized amount between palms, press into dry skin, or melt through hair ends.",
    ingredients: ["Unrefined shea butter"],
    benefits: ["Single ingredient", "Deep moisture", "Traditional craft", "Multi-use"],
  };

  const filteredProducts = shopFilter === "All"
    ? products
    : products.filter((product) => product.step === shopFilter);
  const selectedQuiz = quizOptions.find((option) => option.id === quizChoice) ?? quizOptions[0];
  const quizProduct = products.find((product) => product.id === selectedQuiz.result);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [cart],
  );
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 6.95;
  const total = subtotal + shipping;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.18 },
    );

    document.querySelectorAll(".reveal, .line-reveal, .stagger").forEach((element) => observer.observe(element));

    const onMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${event.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${event.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);

    return () => {
      observer.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  const addToCart = (product: Product) => {
    setOrderPlaced(false);
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);

      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
  };

  const addBundle = () => {
    products.forEach((product) => addToCart(product));
  };

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((current) => {
      if (quantity < 1) {
        return current.filter((item) => item.id !== productId);
      }

      return current.map((item) =>
        item.id === productId ? { ...item, quantity } : item,
      );
    });
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  };

  const openCheckout = () => {
    if (cart.length === 0) return;
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const placeOrder = () => {
    if (cart.length === 0) return;
    setOrderPlaced(true);
    setCart([]);
  };

  return (
    <>
      <div className="cursor">
        <h1>Feel</h1>
      </div>

      <div
        className={`cart-overlay ${cartOpen || checkoutOpen || quizOpen || selectedProduct ? "active" : ""}`}
        onClick={() => {
          setCartOpen(false);
          setCheckoutOpen(false);
          setQuizOpen(false);
          setSelectedProduct(null);
        }}
      />

      <aside className={`cinematic-menu ${menuOpen ? "active" : ""}`} aria-label="Fullscreen menu">
        <img src={activeMenuImage} alt="" />
        <div className="menu-scrim" />
        <div className="cinematic-top">
          <a href="#page1" onClick={() => setMenuOpen(false)}>Shea Tales</a>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={30} />
          </button>
        </div>
        <div className="cinematic-links">
          {menuLinks.map((link, index) => (
            <a
              href={link.href}
              key={link.label}
              onClick={() => setMenuOpen(false)}
              onMouseEnter={() => setActiveMenuImage(link.image)}
            >
              <span>0{index + 1}</span>
              {link.label}
              <small>{link.copy}</small>
            </a>
          ))}
        </div>
        <button className="menu-quiz" onClick={() => { setMenuOpen(false); setQuizOpen(true); }}>
          Find Your Ritual <ArrowRight size={18} />
        </button>
      </aside>

      <aside className={`cart-sidebar ${cartOpen ? "active" : ""}`} aria-label="Shopping cart">
        <div className="cart-header">
          <h3>Your Ritual</h3>
          <button className="cart-close" onClick={() => setCartOpen(false)} aria-label="Close cart">
            <X size={28} />
          </button>
        </div>

        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="cart-empty">Your ritual bag is empty</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>
                    ${item.price.toFixed(2)} / {item.size}
                  </p>
                  <div className="qty">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                      <Minus size={14} />
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="cart-footer">
          <label className="discount-field">
            Ritual code
            <input type="text" placeholder="Enter code" />
          </label>
          <div className="cart-line">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="cart-line">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="cart-total">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
          <button className="checkout-btn" disabled={cart.length === 0} onClick={openCheckout}>
            Checkout
          </button>
        </div>
      </aside>

      <aside className={`product-drawer ${selectedProduct ? "active" : ""}`} aria-label="Product details">
        {selectedProduct && (
          <>
            <button className="drawer-close" onClick={() => setSelectedProduct(null)} aria-label="Close product details">
              <X size={28} />
            </button>
            <div className="drawer-media">
              <img src={selectedProduct.image} alt={selectedProduct.name} />
              <video autoPlay muted loop playsInline src={selectedProduct.video} />
            </div>
            <div className="drawer-copy">
              <p className="eyebrow">{selectedProduct.step} / {selectedProduct.size}</p>
              <h2>{selectedProduct.name}</h2>
              <strong>${selectedProduct.price.toFixed(2)}</strong>
              <p>{selectedProduct.details}</p>
              <div className="product-specs">
                <span>Skin: {selectedProduct.skinType}</span>
                <span>Scent: {selectedProduct.scent}</span>
                <span>Texture: {selectedProduct.texture}</span>
              </div>
              <div className="drawer-lists">
                <div>
                  <h4>How to use</h4>
                  <span>{selectedProduct.howToUse}</span>
                </div>
                <div>
                  <h4>Benefits</h4>
                  {selectedProduct.benefits.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
                <div>
                  <h4>Ingredients</h4>
                  {selectedProduct.ingredients.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              </div>
              <button onClick={() => addToCart(selectedProduct)}>Add to Ritual Bag</button>
            </div>
          </>
        )}
      </aside>

      <aside className={`checkout-panel ${checkoutOpen ? "active" : ""}`} aria-label="Checkout">
        <div className="cart-header">
          <h3>{orderPlaced ? "Confirmed" : "Checkout"}</h3>
          <button className="cart-close" onClick={() => setCheckoutOpen(false)} aria-label="Close checkout">
            <X size={28} />
          </button>
        </div>
        {orderPlaced ? (
          <div className="confirmation">
            <Check size={38} />
            <h2>Your ritual is on the way.</h2>
            <p>Confirmation ST-1027 has been created. You will receive tracking once your order leaves the studio.</p>
            <button type="button" className="checkout-btn" onClick={() => setCheckoutOpen(false)}>
              Keep Browsing
            </button>
          </div>
        ) : (
          <form className="checkout-form">
            <div className="checkout-steps">
              <span>Contact</span>
              <span>Delivery</span>
              <span>Payment</span>
            </div>
            <label>
              Email
              <input type="email" placeholder="you@example.com" />
            </label>
            <label>
              Full name
              <input type="text" placeholder="Your name" />
            </label>
            <label>
              Shipping address
              <textarea placeholder="Street, city, region, country" />
            </label>
            <label>
              Payment
              <input type="text" placeholder="Card number" />
            </label>
            <div className="trust-row">
              <span><Truck size={18} /> 2-3 day processing</span>
              <span><ShieldCheck size={18} /> Secure checkout</span>
            </div>
            <div className="cart-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <button type="button" className="checkout-btn" onClick={placeOrder}>
              Place Order
            </button>
          </form>
        )}
      </aside>

      <aside className={`quiz-drawer ${quizOpen ? "active" : ""}`} aria-label="Ritual quiz">
        <div className="cart-header">
          <h3>Find Your Ritual</h3>
          <button className="cart-close" onClick={() => setQuizOpen(false)} aria-label="Close ritual quiz">
            <X size={28} />
          </button>
        </div>
        <div className="quiz-body">
          <p className="eyebrow">Skin Check</p>
          <h2>What is your skin asking for today?</h2>
          <div className="quiz-options">
            {quizOptions.map((option) => (
              <button
                className={quizChoice === option.id ? "active" : ""}
                onClick={() => setQuizChoice(option.id)}
                key={option.id}
              >
                {option.label}
              </button>
            ))}
          </div>
          <div className="quiz-result">
            {selectedQuiz.result === "bundle" ? (
              <>
                <img src="/Template-1/assets/brand-ritual-textures.png" alt="Complete Shea Tales ritual" />
                <div>
                  <span>Recommended</span>
                  <h3>Complete Ritual Set</h3>
                  <p>Soap, lotion, and lip balm together: the full Cleanse / Soften / Seal system.</p>
                  <button onClick={addBundle}>Add Complete Ritual</button>
                </div>
              </>
            ) : quizProduct ? (
              <>
                <img src={quizProduct.image} alt={quizProduct.name} />
                <div>
                  <span>Recommended</span>
                  <h3>{quizProduct.name}</h3>
                  <p>{quizProduct.details}</p>
                  <button onClick={() => addToCart(quizProduct)}>Add to Bag</button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </aside>

      <main className="main">
        <section id="page1">
          <video autoPlay loop muted playsInline src="/Template-1/assets/head.mp4" />
          <div className="page1-content">
            <nav>
              <a href="#page1" className="brand">Shea Tales</a>
              <div className="nav-links" aria-label="Primary navigation">
                <button onClick={() => setMenuOpen(true)}>
                  <Menu size={18} /> Menu
                </button>
                <a href="#ritual">Ritual</a>
                <a href="#page3">Shop</a>
                <button onClick={() => setQuizOpen(true)}>Quiz</button>
              </div>
              <button className="cart-toggle" onClick={() => setCartOpen(true)}>
                <ShoppingBag size={22} /> Bag ({cartCount})
              </button>
            </nav>

            <div className="hero-text reveal">
              <span>Ghanaian shea butter skincare</span>
              <h1>Shea Tales</h1>
              <p>Daily skin rituals shaped by craft, comfort, and raw golden butter.</p>
              <a href="#ritual">
                Enter the Ritual <ArrowRight size={18} />
              </a>
            </div>
            <div className="hero-spacer" />
          </div>
        </section>

        <section id="manifesto">
          <div className="manifesto-grid">
            <div className="manifesto-copy reveal">
              <p className="eyebrow">Brand Manifesto</p>
              <h2>Not clean beauty as a trend. Care as a memory.</h2>
            </div>
            <div className="manifesto-media reveal">
              <img src="/Template-1/assets/brand-lifestyle-ritual.png" alt="Morning shea butter skincare ritual" />
            </div>
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

        <section id="ritual" className="ritual-section">
          <div className="ritual-head reveal">
            <p className="eyebrow">The Ritual</p>
            <h2>Cleanse. Soften. Seal.</h2>
            <p>
              Three everyday products, one complete shea routine. Start with comfort,
              keep the formula simple, and let the texture do the talking.
            </p>
            <button onClick={addBundle}>Add Complete Ritual - $61.97</button>
          </div>
          <div className="ritual-stage">
            {ritualSteps.map((step, index) => (
              <article className="ritual-card stagger" style={{ transitionDelay: `${index * 120}ms` }} key={step.title}>
                <img src={step.image} alt={`${step.title} ritual`} />
                <span>0{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="source" className="source-section">
          <div className="source-media reveal">
            <img src="/Template-1/assets/brand-shea-source.png" alt="Hands working with raw shea butter" />
            <video autoPlay loop muted playsInline src="/Template-1/assets/video2.mp4" />
          </div>
          <div className="source-copy reveal">
            <p className="eyebrow">From Ghana, With Care</p>
            <h2>The shea is not an ingredient note. It is the origin.</h2>
            <p>
              Our formulas are shaped around raw shea butter sourced through women-led
              cooperatives. The site can sell a product, but the brand has to honor
              the process behind it: gathered, roasted, kneaded, and finished with restraint.
            </p>
            <div className="value-grid">
              {brandValues.map((value) => (
                <span key={value}>{value}</span>
              ))}
            </div>
          </div>
        </section>

        <section id="page3">
          <div className="page3-top reveal">
            <h4>
              Shop the Ritual <span>Core Three</span>
            </h4>
            <h2>Products with a</h2>
            <h2>Point of View</h2>
          </div>

          <div className="shop-tools reveal" aria-label="Shop tools">
            <div className="search-pill">
              <Search size={18} />
              <span>Search shea rituals</span>
            </div>
            {["All", "Cleanse", "Soften", "Seal"].map((filter) => (
              <button
                className={shopFilter === filter ? "active" : ""}
                onClick={() => setShopFilter(filter)}
                key={filter}
              >
                {filter}
              </button>
            ))}
          </div>

          <div className="page3-elem">
            {filteredProducts.map((product) => (
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
                    <button onClick={() => addToCart(product)}>Add to Bag</button>
                    <button onClick={() => setSelectedProduct(product)}>View Ritual</button>
                  </div>
                </div>
                <img src={product.image} alt={product.name} />
                <video autoPlay loop muted playsInline preload="metadata" src={product.video} />
              </article>
            ))}
          </div>
        </section>

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
            <img src="/Template-1/assets/brand-ritual-textures.png" alt="Shea butter textures and ritual products" />
          </div>
        </section>

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

        <section id="about" className="about-section">
          <div className="about-media reveal">
            <video autoPlay loop muted playsInline src="/Template-1/assets/video1.mp4" />
          </div>
          <div className="about-copy reveal">
            <p className="eyebrow">The Shea Standard</p>
            <h2>Built around the butter, not the bottle.</h2>
            <p>
              Shea Tales keeps formulas focused, packaging quiet, and sourcing direct.
              Each product begins with raw shea butter and ends with skin that feels cared for.
            </p>
            <div className="stat-row">
              <span><strong>3</strong> Core ritual steps</span>
              <span><strong>0</strong> Sulfates or parabens</span>
              <span><strong>50+</strong> Free shipping</span>
            </div>
          </div>
        </section>

        <section id="page4">
          <video autoPlay muted loop playsInline src="/Template-1/assets/841b3aa6ab3247b89c067144fcd7f099.webm" />
          <div className="spotlight-content reveal">
            <h2>Raw Shea</h2>
            <p>The origin product - 250g</p>
            <strong>$42.00</strong>
            <button onClick={() => addToCart(rawShea)}>Add to Bag</button>
          </div>
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
        </section>

        <section className="reviews-section">
          <div className="review-card reveal">
            <Sparkles size={28} />
            <p>"It feels like a brand with a real story, not just another body care line."</p>
            <span>Amara K. / verified order</span>
          </div>
          <div className="review-card reveal">
            <Sparkles size={28} />
            <p>"The ritual makes sense. Soap, lotion, balm. Nothing extra, everything useful."</p>
            <span>Nia B. / complete ritual set</span>
          </div>
          <div className="review-card reveal">
            <Sparkles size={28} />
            <p>"The textures are beautiful, and the sourcing story makes the products feel grounded."</p>
            <span>Lena T. / raw shea customer</span>
          </div>
        </section>

        <section className="care-section">
          <article className="care-card reveal">
            <Truck size={26} />
            <h3>Shipping</h3>
            <p>Orders leave in 2-3 business days. Shipping is free when the bag reaches $50.</p>
          </article>
          <article className="care-card reveal">
            <RotateCcw size={26} />
            <h3>Returns</h3>
            <p>Unopened products can return within 30 days. Damaged arrivals are replaced.</p>
          </article>
          <article className="care-card reveal">
            <ShieldCheck size={26} />
            <h3>Skin promise</h3>
            <p>Short ingredient lists, no sulfates, no parabens, and patch-test friendly guidance.</p>
          </article>
        </section>

        <section id="faq" className="faq-section">
          <div className="faq-title reveal">
            <p className="eyebrow">Care Notes</p>
            <h2>Shipping, sourcing, skin.</h2>
          </div>
          <div className="faq-list reveal">
            {faqs.map((faq, index) => (
              <button
                className={`faq-item ${openFaq === index ? "active" : ""}`}
                key={faq.question}
                onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
              >
                <span>
                  {faq.question}
                  <ChevronDown size={22} />
                </span>
                <p>{faq.answer}</p>
              </button>
            ))}
          </div>
        </section>

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

        <section id="journal" className="journal-section">
          <div className="journal-head reveal">
            <p className="eyebrow">Shea Journal</p>
            <h2>Notes from the ritual.</h2>
          </div>
          <div className="journal-grid">
            {journalPosts.map((post, index) => (
              <article className="journal-card stagger" style={{ transitionDelay: `${index * 110}ms` }} key={post.title}>
                <img src={post.image} alt={post.title} />
                <div>
                  <span>{post.category}</span>
                  <h3>{post.title}</h3>
                  <p>{post.copy}</p>
                  <a href="#contact">Read Note <ArrowRight size={16} /></a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="contact-section">
          <div className="contact-copy reveal">
            <p className="eyebrow">The Softness List</p>
            <h2>Restocks, rituals, and small-batch drops.</h2>
          </div>
          <form className="newsletter reveal">
            <input type="email" placeholder="Email address" aria-label="Email address" />
            <button type="button">
              Join <Check size={18} />
            </button>
          </form>
        </section>

        <footer id="footer">
          <div className="top">
            <div className="box1">
              <h3>Daily skin rituals shaped by Ghanaian shea butter.</h3>
              <a href="#page3">Shop the Ritual</a>
            </div>
            <div className="box2">
              <ul>
                <li><a href="#manifesto">Manifesto</a></li>
                <li><a href="#ritual">Ritual</a></li>
                <li><a href="#source">Source</a></li>
                <li><a href="#journal">Journal</a></li>
                <li><a href="#faq">Care</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
            <div className="box3">
              <ul>
                <li>Instagram -</li>
                <li>TikTok -</li>
                <li>Wholesale -</li>
              </ul>
            </div>
          </div>
          <div className="bottom" aria-label="Shea Tales">
            {"Shea Tales".split("").map((letter, index) => (
              <h1 key={`${letter}-${index}`}>{letter === " " ? "\u00A0" : letter}</h1>
            ))}
          </div>
        </footer>
      </main>
    </>
  );
}

export default App;
