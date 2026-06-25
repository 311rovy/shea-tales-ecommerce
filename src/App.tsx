import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight, Check, Menu, Minus, Plus,
  RotateCcw, Search, Share2, ShieldCheck, ShoppingBag,
  Truck, X,
} from "lucide-react";
import { Link, Router, useRouter } from "./router";
import { menuLinks, products, quizOptions } from "./data";
import type { AppOutletContext, CartItem, Product } from "./types";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Story from "./pages/Story";
import Journal from "./pages/Journal";
import JournalArticle from "./pages/JournalArticle";
import Admin from "./pages/Admin";
import Picture from "./components/Picture";

type Toast = { id: number; message: string };

function AppInner() {
  const { path, navigate: _navigate } = useRouter();

  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quizOpen, setQuizOpen] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeMenuImage, setActiveMenuImage] = useState(menuLinks[0].image);
  const [quizChoice, setQuizChoice] = useState(quizOptions[0].id);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [emailPopupOpen, setEmailPopupOpen] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [navSolid, setNavSolid] = useState(false);
  const [openFaq, setOpenFaq] = useState(-1);
  const [stockMap, setStockMap] = useState<Record<string, number>>({});
  const [orderError, setOrderError] = useState("");
  const [orderLoading, setOrderLoading] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const addressRef = useRef<HTMLTextAreaElement>(null);

  const isHome = path === "/";

  useEffect(() => {
    if (!isHome) { setNavSolid(true); return; }
    const onScroll = () => setNavSolid(window.scrollY > 72);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      document.documentElement.style.setProperty("--cursor-x", `${e.clientX}px`);
      document.documentElement.style.setProperty("--cursor-y", `${e.clientY}px`);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const dismissed = localStorage.getItem("shea-email-popup");
    if (dismissed) return;
    const timer = setTimeout(() => setEmailPopupOpen(true), 9000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    fetch('/api/products')
      .then((r) => r.json())
      .then((rows: { id: string; stock_qty: number }[]) => {
        const map: Record<string, number> = {};
        rows.forEach((r) => { map[r.id] = r.stock_qty; });
        setStockMap(map);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = new IntersectionObserver(
        (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("in-view"); }),
        { threshold: 0.15 }
      );
      document.querySelectorAll(".reveal, .line-reveal, .stagger").forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    }, 80);
    return () => clearTimeout(timer);
  }, [path]);

  const pushToast = (message: string) => {
    const id = Date.now();
    setToasts((t) => [...t, { id, message }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  };

  const addToCart = (product: Product) => {
    setOrderPlaced(false);
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id);
      if (existing) return current.map((item) => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      return [...current, { ...product, quantity: 1 }];
    });
    setCartOpen(true);
    pushToast(`${product.shortName} added to bag`);
  };

  const addBundle = () => products.forEach((p) => addToCart(p));

  const updateQuantity = (productId: string, quantity: number) => {
    setCart((current) =>
      quantity < 1
        ? current.filter((item) => item.id !== productId)
        : current.map((item) => item.id === productId ? { ...item, quantity } : item)
    );
  };

  const toggleWishlist = (productId: string) => {
    const isAdding = !wishlist.includes(productId);
    setWishlist((current) =>
      isAdding ? [...current, productId] : current.filter((id) => id !== productId)
    );
    pushToast(isAdding ? "Saved to wishlist" : "Removed from wishlist");
  };

  const openCheckout = () => {
    if (cart.length === 0) return;
    setCartOpen(false);
    setOrderPlaced(false);
    setOrderError("");
    setOrderId(null);
    setCheckoutOpen(true);
  };

  const placeOrder = async () => {
    if (cart.length === 0) return;
    const email = emailRef.current?.value.trim() ?? "";
    const name = nameRef.current?.value.trim() ?? "";
    const address = addressRef.current?.value.trim() ?? "";
    if (!email || !name) {
      setOrderError("Please fill in your email and name.");
      return;
    }
    setOrderError("");
    setOrderLoading(true);
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          name,
          address,
          cart: cart.map((item) => ({ id: item.id, name: item.name, price: item.price, qty: item.quantity })),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setOrderError(data.error ?? "Something went wrong. Please try again.");
        return;
      }
      setOrderId(data.orderId);
      setOrderPlaced(true);
      setCart([]);
      pushToast("Order confirmed — thank you!");
      fetch("/api/products")
        .then((r) => r.json())
        .then((rows: { id: string; stock_qty: number }[]) => {
          const map: Record<string, number> = {};
          rows.forEach((r) => { map[r.id] = r.stock_qty; });
          setStockMap(map);
        })
        .catch(() => {});
    } catch {
      setOrderError("Connection error. Please try again.");
    } finally {
      setOrderLoading(false);
    }
  };

  const handleShare = async (product: Product) => {
    const url = `${window.location.origin}/shop`;
    if (navigator.share) {
      try { await navigator.share({ title: product.name, text: product.story, url }); } catch { /* user cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      pushToast("Link copied to clipboard");
    }
  };

  const dismissEmailPopup = () => {
    setEmailPopupOpen(false);
    localStorage.setItem("shea-email-popup", Date.now().toString());
  };

  const submitEmail = () => {
    if (!emailValue.includes("@")) { pushToast("Please enter a valid email"); return; }
    setEmailSubmitted(true);
    pushToast("Welcome to the Softness List");
    setTimeout(() => { dismissEmailPopup(); setEmailSubmitted(false); setEmailValue(""); }, 3200);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = useMemo(() => cart.reduce((sum, item) => sum + item.quantity * item.price, 0), [cart]);
  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 6.95;
  const total = subtotal + shipping;

  const selectedQuiz = quizOptions.find((o) => o.id === quizChoice) ?? quizOptions[0];
  const quizProduct = products.find((p) => p.id === selectedQuiz.result);

  const overlayActive = cartOpen || checkoutOpen || quizOpen || !!selectedProduct;

  const sharedContext: AppOutletContext = {
    addToCart, addBundle, toggleWishlist, setSelectedProduct,
    setQuizOpen, wishlist, pushToast, stockMap,
  };

  const renderPage = () => {
    if (path === "/") return <Home ctx={sharedContext} />;
    if (path === "/shop") return <Shop ctx={sharedContext} openFaq={openFaq} setOpenFaq={setOpenFaq} />;
    if (path === "/story") return <Story ctx={sharedContext} openFaq={openFaq} setOpenFaq={setOpenFaq} />;
    if (path.startsWith("/journal/")) return <JournalArticle slug={path.replace("/journal/", "")} ctx={sharedContext} />;
    if (path === "/journal") return <Journal />;
    return <Home ctx={sharedContext} />;
  };

  if (path === "/admin") return <Admin />;

  return (
    <>
      <div className="cursor"><h1>Feel</h1></div>

      {/* Toast notifications */}
      <div className="toast-stack" aria-live="polite">
        {toasts.map((t) => (
          <div className="toast" key={t.id}><Check size={15} /> {t.message}</div>
        ))}
      </div>

      {/* Email capture popup */}
      {emailPopupOpen && (
        <div className="email-popup-overlay" onClick={dismissEmailPopup}>
          <div className="email-popup" onClick={(e) => e.stopPropagation()}>
            <button className="email-popup-close" onClick={dismissEmailPopup} aria-label="Close"><X size={20} /></button>
            {emailSubmitted ? (
              <div className="email-popup-success">
                <Check size={32} />
                <h3>You're in.</h3>
                <p>Use code <strong>SHEA10</strong> at checkout for 10% off your first order.</p>
              </div>
            ) : (
              <>
                <p className="eyebrow">Welcome gift</p>
                <h2>10% off your first order.</h2>
                <p>Join The Softness List for restocks, rituals, and small-batch drops.</p>
                <div className="email-popup-form">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && submitEmail()}
                    aria-label="Email address"
                  />
                  <button onClick={submitEmail}>Claim offer</button>
                </div>
                <button className="email-popup-skip" onClick={dismissEmailPopup}>No thanks</button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Overlay backdrop */}
      <div
        className={`cart-overlay ${overlayActive ? "active" : ""}`}
        onClick={() => { setCartOpen(false); setCheckoutOpen(false); setQuizOpen(false); setSelectedProduct(null); }}
      />

      {/* Cinematic fullscreen menu */}
      <aside className={`cinematic-menu ${menuOpen ? "active" : ""}`} aria-label="Fullscreen menu">
        <Picture src={activeMenuImage} alt="" width={1536} height={1024} />
        <div className="menu-scrim" />
        <div className="cinematic-top">
          <Link to="/" onClick={() => setMenuOpen(false)} className="cinematic-brand">Shea Tales</Link>
          <button onClick={() => setMenuOpen(false)} aria-label="Close menu"><X size={30} /></button>
        </div>
        <div className="cinematic-links">
          {menuLinks.map((link, index) => (
            <Link to={link.href} key={link.label} onClick={() => setMenuOpen(false)} className="cinematic-link">
              <em>0{index + 1}</em>
              <span
                className="cinematic-link-label"
                onMouseEnter={() => setActiveMenuImage(link.image)}
              >
                {link.label}
              </span>
              <small>{link.copy}</small>
            </Link>
          ))}
        </div>
        <button className="menu-quiz" onClick={() => { setMenuOpen(false); setQuizOpen(true); }}>
          Find Your Ritual <ArrowRight size={18} />
        </button>
      </aside>

      {/* Cart sidebar */}
      <aside className={`cart-sidebar ${cartOpen ? "active" : ""}`} aria-label="Shopping cart">
        <div className="cart-header">
          <h3>Your Ritual</h3>
          <button className="cart-close" onClick={() => setCartOpen(false)} aria-label="Close cart"><X size={28} /></button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <p className="cart-empty">Your ritual bag is empty</p>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <Picture src={item.image} alt={item.name} width={500} height={625} />
                <div className="cart-item-info">
                  <h4>{item.name}</h4>
                  <p>${item.price.toFixed(2)} / {item.size}</p>
                  <div className="qty">
                    <button onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity"><Minus size={14} /></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity"><Plus size={14} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="cart-footer">
          <label className="discount-field">
            Ritual code
            <input type="text" placeholder="e.g. SHEA10" />
          </label>
          <div className="cart-line"><span>Subtotal</span><span>${subtotal.toFixed(2)}</span></div>
          <div className="cart-line"><span>Shipping</span><span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span></div>
          {subtotal > 0 && subtotal < 50 && (
            <p className="shipping-nudge">Add ${(50 - subtotal).toFixed(2)} more for free shipping</p>
          )}
          <div className="cart-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
          <button className="checkout-btn" disabled={cart.length === 0} onClick={openCheckout}>Checkout</button>
        </div>
      </aside>

      {/* Product detail drawer */}
      <aside className={`product-drawer ${selectedProduct ? "active" : ""}`} aria-label="Product details">
        {selectedProduct && (
          <>
            <button className="drawer-close" onClick={() => setSelectedProduct(null)} aria-label="Close"><X size={28} /></button>
            <div className="drawer-media">
              <Picture src={selectedProduct.image} alt={selectedProduct.name} width={500} height={625} />
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
                  {selectedProduct.benefits.map((b) => <span key={b}>{b}</span>)}
                </div>
                <div>
                  <h4>Ingredients</h4>
                  {selectedProduct.ingredients.map((i) => <span key={i}>{i}</span>)}
                </div>
              </div>
              <div className="drawer-actions">
                <button onClick={() => { addToCart(selectedProduct); setSelectedProduct(null); }}>Add to Ritual Bag</button>
                <button className="share-btn" onClick={() => handleShare(selectedProduct)} aria-label="Share product">
                  <Share2 size={16} /> Share
                </button>
              </div>
            </div>
          </>
        )}
      </aside>

      {/* Checkout panel */}
      <aside className={`checkout-panel ${checkoutOpen ? "active" : ""}`} aria-label="Checkout">
        <div className="cart-header">
          <h3>{orderPlaced ? "Confirmed" : "Checkout"}</h3>
          <button className="cart-close" onClick={() => { setCheckoutOpen(false); setOrderError(""); }} aria-label="Close checkout"><X size={28} /></button>
        </div>
        {orderPlaced ? (
          <div className="confirmation">
            <Check size={38} />
            <h2>Your ritual is on the way.</h2>
            <p>Order #{orderId} confirmed. You will receive tracking once your order leaves the studio.</p>
            <button type="button" className="checkout-btn" onClick={() => { setCheckoutOpen(false); setOrderId(null); }}>Keep Browsing</button>
          </div>
        ) : (
          <form className="checkout-form" onSubmit={(e) => e.preventDefault()}>
            <div className="checkout-steps"><span>Contact</span><span>Delivery</span><span>Payment</span></div>
            <label>Email<input ref={emailRef} type="email" placeholder="you@example.com" required /></label>
            <label>Full name<input ref={nameRef} type="text" placeholder="Your name" required /></label>
            <label>Shipping address<textarea ref={addressRef} placeholder="Street, city, region, country" /></label>
            <label>Card number<input type="text" placeholder="&bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull; &bull;&bull;&bull;&bull;" maxLength={19} /></label>
            {orderError && <p style={{ color: "#c0392b", fontSize: "0.82rem", margin: "0.25rem 0" }}>{orderError}</p>}
            <div className="trust-row">
              <span><Truck size={18} /> 2-3 day processing</span>
              <span><ShieldCheck size={18} /> Secure checkout</span>
            </div>
            <div className="cart-total"><span>Total</span><span>${total.toFixed(2)}</span></div>
            <button type="button" className="checkout-btn" onClick={placeOrder} disabled={orderLoading}>
              {orderLoading ? "Placing order…" : "Place Order"}
            </button>
          </form>
        )}
      </aside>

      {/* Quiz drawer */}
      <aside className={`quiz-drawer ${quizOpen ? "active" : ""}`} aria-label="Ritual quiz">
        <div className="cart-header">
          <h3>Find Your Ritual</h3>
          <button className="cart-close" onClick={() => setQuizOpen(false)} aria-label="Close quiz"><X size={28} /></button>
        </div>
        <div className="quiz-body">
          <p className="eyebrow">Skin Check</p>
          <h2>What is your skin asking for today?</h2>
          <div className="quiz-options">
            {quizOptions.map((option) => (
              <button className={quizChoice === option.id ? "active" : ""} onClick={() => setQuizChoice(option.id)} key={option.id}>
                {option.label}
              </button>
            ))}
          </div>
          <div className="quiz-result">
            {selectedQuiz.result === "bundle" ? (
              <>
                <Picture src="/Template-1/assets/brand-ritual-textures.png" alt="Complete ritual" width={400} height={600} />
                <div>
                  <span>Recommended</span>
                  <h3>Complete Ritual Set</h3>
                  <p>Soap, lotion, and lip balm together: the full Cleanse / Soften / Seal system.</p>
                  <button onClick={() => { addBundle(); setQuizOpen(false); }}>Add Complete Ritual</button>
                </div>
              </>
            ) : quizProduct ? (
              <>
                <Picture src={quizProduct.image} alt={quizProduct.name} width={500} height={625} />
                <div>
                  <span>Recommended</span>
                  <h3>{quizProduct.name}</h3>
                  <p>{quizProduct.details}</p>
                  <button onClick={() => { addToCart(quizProduct); setQuizOpen(false); }}>Add to Bag</button>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </aside>

      {/* Fixed nav */}
      <nav className={`app-nav ${navSolid ? "nav-solid" : "nav-transparent"}`}>
        <Link to="/" className="brand">
          <Picture src="/Template-1/assets/Logosheatales.jpeg" alt="Shea Tales logo" className="logo-img" width={40} height={41} priority />
          Shea Tales
        </Link>
        <div className="nav-links" aria-label="Primary navigation">
          <button onClick={() => setMenuOpen(true)} className="nav-menu-btn"><Menu size={17} /> Menu</button>
          <Link to="/shop"    className={path === "/shop"    ? "nav-active" : ""}>Shop</Link>
          <Link to="/story"   className={path === "/story"   ? "nav-active" : ""}>Story</Link>
          <Link to="/journal" className={path.startsWith("/journal") ? "nav-active" : ""}>Journal</Link>
          <button onClick={() => setQuizOpen(true)} className="nav-quiz-btn">Find My Ritual</button>
        </div>
        <button className="cart-toggle" onClick={() => setCartOpen(true)}>
          <ShoppingBag size={20} />
          {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
        </button>
      </nav>

      {/* Page content */}
      <main className="main">{renderPage()}</main>

      {/* Footer */}
      <footer id="footer">
        <div className="footer-top">
          <div className="footer-brand">
            <Picture src="/Template-1/assets/Logosheatales.jpeg" alt="Shea Tales logo" className="footer-logo" width={60} height={62} />
            <p className="footer-tagline">Daily skin rituals shaped<br />by Ghanaian shea butter.</p>
            <form className="footer-newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Join the ritual drop..." aria-label="Email for newsletter" />
              <button type="submit">&#8594;</button>
            </form>
            <p className="footer-newsletter-note">Restocks, small-batch drops, ritual notes.</p>
          </div>

          <div className="footer-col">
            <h4>Navigate</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/shop">Shop</Link></li>
              <li><Link to="/story">Our Story</Link></li>
              <li><Link to="/journal">Journal</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Products</h4>
            <ul>
              <li><Link to="/shop">Shea Butter Soap</Link></li>
              <li><Link to="/shop">Body Lotion</Link></li>
              <li><Link to="/shop">Lip Balm</Link></li>
              <li><Link to="/shop">Raw Shea Butter</Link></li>
              <li><Link to="/shop">Complete Ritual Set</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Connect</h4>
            <ul>
              <li><a href="https://instagram.com/sheatales" target="_blank" rel="noopener noreferrer">Instagram &#8599;</a></li>
              <li><a href="https://tiktok.com/@sheatales" target="_blank" rel="noopener noreferrer">TikTok &#8599;</a></li>
              <li><a href="mailto:hello@sheatales.com">hello@sheatales.com</a></li>
              <li><a href="mailto:wholesale@sheatales.com">Wholesale enquiries</a></li>
            </ul>
            <h4 className="footer-col-second-head">Help</h4>
            <ul>
              <li><Link to="/story">FAQ</Link></li>
              <li><Link to="/story">Shipping info</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider" />

        <div className="bottom" aria-label="Shea Tales">
          {"Shea Tales".split("").map((letter, index) => (
            <h1 key={`${letter}-${index}`}>{letter === " " ? " " : letter}</h1>
          ))}
        </div>

        <div className="footer-legal">
          <span>&copy; 2026 Shea Tales. All rights reserved.</span>
          <span className="footer-legal-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Accessibility</a>
          </span>
        </div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppInner />
    </Router>
  );
}
