import { useEffect, useState } from "react";
import { useUser, useClerk, useAuth } from "@clerk/clerk-react";
import { Link } from "../router";
import { ArrowLeft, ArrowRight, Heart, LogOut, Package, User } from "lucide-react";
import { products as allProducts, rawShea } from "../data";
import { formatPrice } from "../currency";
import type { Product } from "../types";
import Picture from "../components/Picture";

type Order = {
  id: number;
  total: number;
  status: string;
  created_at: string;
  items: { name: string; qty: number; price: number }[];
};

const STATUS_COLOR: Record<string, string> = {
  pending: "#c0392b",
  paid: "#2980b9",
  shipped: "#8e44ad",
  delivered: "#27ae60",
};

const productCatalogue: Product[] = [...allProducts, rawShea];

type Props = { wishlist: string[]; toggleWishlist: (id: string) => void; addToCart: (p: Product) => void };

export default function Account({ wishlist, toggleWishlist, addToCart }: Props) {
  const { user } = useUser();
  const { signOut } = useClerk();
  const { getToken } = useAuth();
  const [orders, setOrders] = useState<Order[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [tab, setTab] = useState<"orders" | "wishlist">("orders");

  useEffect(() => {
    if (!user) return;
    getToken().then((token) => {
      if (!token) return;
      return fetch("/api/account-orders", {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((data) => { if (Array.isArray(data)) setOrders(data); });
    })
      .catch(() => {})
      .finally(() => setOrdersLoading(false));
  }, [user]);

  const wishlistProducts = productCatalogue.filter((p) => wishlist.includes(p.id));

  if (!user) {
    return (
      <div className="page-fade account-gate">
        <User size={40} />
        <h2>Sign in to view your account</h2>
        <p>Access your order history, saved wishlist, and account details.</p>
        <Link to="/" className="policy-btn">Back to Home</Link>
      </div>
    );
  }

  return (
    <div className="page-fade">
      <section className="account-hero">
        <div className="account-hero-inner reveal">
          <div className="account-avatar">
            {user.imageUrl
              ? <img src={user.imageUrl} alt={user.fullName ?? "Account"} referrerPolicy="no-referrer" />
              : <User size={32} />}
          </div>
          <div>
            <p className="eyebrow">Your Account</p>
            <h1>{user.fullName ?? user.primaryEmailAddress?.emailAddress}</h1>
            <p className="account-email">{user.primaryEmailAddress?.emailAddress}</p>
          </div>
          <button className="account-signout" onClick={() => signOut()}>
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </section>

      <section className="account-body">
        <div className="account-tabs reveal">
          <button className={`account-tab${tab === "orders" ? " active" : ""}`} onClick={() => setTab("orders")}>
            <Package size={16} /> Orders
          </button>
          <button className={`account-tab${tab === "wishlist" ? " active" : ""}`} onClick={() => setTab("wishlist")}>
            <Heart size={16} /> Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
          </button>
        </div>

        {/* Orders */}
        {tab === "orders" && (
          <div className="account-section reveal">
            {ordersLoading ? (
              <p className="account-loading">Loading your orders…</p>
            ) : orders.length === 0 ? (
              <div className="account-empty">
                <Package size={36} />
                <p>You haven't placed any orders yet.</p>
                <Link to="/shop" className="policy-btn">Start Shopping</Link>
              </div>
            ) : (
              <div className="account-orders">
                {orders.map((order) => (
                  <div className="account-order-card" key={order.id}>
                    <div className="account-order-head">
                      <div>
                        <p className="account-order-id">Order #{order.id}</p>
                        <p className="account-order-date">
                          {new Date(order.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                      <div className="account-order-right">
                        <span className="account-order-status" style={{ color: STATUS_COLOR[order.status] ?? "#111" }}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                        <strong className="account-order-total">{formatPrice(Number(order.total))}</strong>
                      </div>
                    </div>
                    <div className="account-order-items">
                      {order.items?.map((item, i) => (
                        <span key={i}>{item.name} ×{item.qty}{i < order.items.length - 1 ? "," : ""} </span>
                      ))}
                    </div>
                    <Link to={`/orders/${order.id}`} className="account-track-link">
                      Track order <ArrowRight size={14} />
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Wishlist */}
        {tab === "wishlist" && (
          <div className="account-section reveal">
            {wishlistProducts.length === 0 ? (
              <div className="account-empty">
                <Heart size={36} />
                <p>Your wishlist is empty.</p>
                <Link to="/shop" className="policy-btn">Browse Products</Link>
              </div>
            ) : (
              <div className="account-wishlist">
                {wishlistProducts.map((product) => (
                  <div className="account-wishlist-card" key={product.id}>
                    <Picture src={product.image} alt={product.name} width={120} height={150} />
                    <div className="account-wishlist-info">
                      <p className="eyebrow">{product.step}</p>
                      <h3>{product.name}</h3>
                      <strong>{formatPrice(product.price)}</strong>
                      <div className="account-wishlist-actions">
                        <button onClick={() => addToCart(product)} className="policy-btn">Add to Bag</button>
                        <button onClick={() => toggleWishlist(product.id)} className="account-remove-btn">Remove</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      <div className="policy-back reveal">
        <Link to="/"><ArrowLeft size={16} /> Back to Home</Link>
      </div>
    </div>
  );
}
