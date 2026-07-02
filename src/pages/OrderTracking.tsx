import { useEffect, useState } from "react";
import { Link } from "../router";
import { ArrowLeft, Check, Clock, Package, Truck } from "lucide-react";
import { formatPrice } from "../currency";

type OrderItem = { name: string; qty: number; price: number };
type Order = {
  id: number;
  customer_name: string;
  customer_email: string;
  address: string;
  total: number;
  status: string;
  created_at: string;
  items: OrderItem[];
};

const STATUS_STEPS = ["pending", "paid", "shipped", "delivered"];
const STATUS_LABELS: Record<string, string> = {
  pending: "Order Received",
  paid: "Payment Confirmed",
  shipped: "On Its Way",
  delivered: "Delivered",
};
const STATUS_ICONS = [Clock, Check, Truck, Package];

type Props = { orderId: string };

export default function OrderTracking({ orderId }: Props) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [verified, setVerified] = useState(false);

  const verify = async () => {
    if (!email) return;
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/order-track?id=${orderId}&email=${encodeURIComponent(email)}`);
      if (res.status === 404) { setError("No order found with that ID and email. Please check your confirmation email."); return; }
      if (!res.ok) { setError("Something went wrong. Please try again."); return; }
      setOrder(await res.json());
      setVerified(true);
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { setLoading(false); }, []);

  const currentStep = order ? STATUS_STEPS.indexOf(order.status) : -1;

  if (!verified) {
    return (
      <div className="page-fade">
        <section className="track-verify">
          <p className="eyebrow">Order Tracking</p>
          <h1>Track Your Ritual</h1>
          <p>Enter the email address you used to place order <strong>#{orderId}</strong>.</p>
          <div className="track-form">
            <input
              type="email"
              placeholder="Email address from your order"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && verify()}
              autoFocus
            />
            {error && <p className="track-error">{error}</p>}
            <button onClick={verify} disabled={loading || !email} className="track-btn">
              {loading ? "Checking…" : "Track Order"}
            </button>
          </div>
          <Link to="/" className="track-back"><ArrowLeft size={16} /> Back to Home</Link>
        </section>
      </div>
    );
  }

  if (!order) return null;

  return (
    <div className="page-fade">
      <section className="track-section">
        <div className="track-head reveal">
          <Link to="/" className="track-back-link"><ArrowLeft size={16} /> Home</Link>
          <p className="eyebrow">Order #{order.id}</p>
          <h1>Your ritual is {order.status === "delivered" ? "here." : "on the way."}</h1>
          <p className="track-sub">
            Placed on {new Date(order.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </p>
        </div>

        {/* Status timeline */}
        <div className="track-timeline reveal">
          {STATUS_STEPS.map((step, i) => {
            const Icon = STATUS_ICONS[i];
            const done = i <= currentStep;
            const active = i === currentStep;
            return (
              <div key={step} className={`track-step${done ? " done" : ""}${active ? " active" : ""}`}>
                <div className="track-step-icon">
                  <Icon size={20} />
                </div>
                <p>{STATUS_LABELS[step]}</p>
                {i < STATUS_STEPS.length - 1 && <div className={`track-connector${done && i < currentStep ? " done" : ""}`} />}
              </div>
            );
          })}
        </div>

        {/* Order details */}
        <div className="track-details reveal">
          <div className="track-items">
            <h3>Items</h3>
            {order.items?.map((item, i) => (
              <div className="track-item" key={i}>
                <span>{item.name}</span>
                <span>×{item.qty}</span>
                <span>{formatPrice(item.price * item.qty)}</span>
              </div>
            ))}
            <div className="track-total">
              <span>Total</span>
              <span>{formatPrice(Number(order.total))}</span>
            </div>
          </div>

          <div className="track-shipping">
            <h3>Shipping To</h3>
            <p>{order.customer_name}</p>
            <p>{order.address || "Address not provided"}</p>
            <p className="track-email-small">{order.customer_email}</p>
          </div>
        </div>

        <div className="track-help reveal">
          <p>Questions about your order? Email us at <a href="mailto:hello@sheatales.com">hello@sheatales.com</a> with your order number.</p>
          <Link to="/shop" className="policy-btn">Continue Shopping</Link>
        </div>
      </section>
    </div>
  );
}
