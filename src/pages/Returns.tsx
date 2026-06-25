import { Link } from "../router";
import { ArrowLeft, RotateCcw, ShieldCheck, MessageCircle, AlertCircle } from "lucide-react";

export default function Returns() {
  return (
    <div className="page-fade policy-page">
      <section className="policy-hero">
        <div className="policy-hero-content reveal">
          <p className="eyebrow">Returns & Refunds</p>
          <h1>We stand behind everything we make.</h1>
          <p>If something is not right, we will make it right. No complicated process.</p>
        </div>
      </section>

      <section className="policy-body">
        <div className="policy-grid reveal">
          <div className="policy-card">
            <RotateCcw size={28} />
            <h3>30-Day Returns</h3>
            <p>Unopened, unused products can be returned within <strong>30 days</strong> of delivery for a full refund. The product must be in its original condition and packaging.</p>
          </div>
          <div className="policy-card">
            <ShieldCheck size={28} />
            <h3>Damaged Arrivals</h3>
            <p>If your order arrives damaged, broken, or defective, we will <strong>replace it immediately</strong> at no cost to you. No return required — just send us a photo.</p>
          </div>
          <div className="policy-card">
            <AlertCircle size={28} />
            <h3>Opened Products</h3>
            <p>We cannot accept returns on <strong>opened or used products</strong> for hygiene reasons. If you have had an adverse skin reaction, please contact us — we will work with you.</p>
          </div>
          <div className="policy-card">
            <MessageCircle size={28} />
            <h3>How to Start</h3>
            <p>Email <a href="mailto:hello@sheatales.com">hello@sheatales.com</a> with your order number and reason. We respond within <strong>1 business day</strong> and guide you through the process.</p>
          </div>
        </div>

        <div className="policy-section reveal">
          <h2>Return Process</h2>
          <ol className="policy-steps">
            <li>
              <strong>Contact us</strong> at <a href="mailto:hello@sheatales.com">hello@sheatales.com</a> with your order number and the reason for your return. For damaged items, attach a photo.
            </li>
            <li>
              <strong>We confirm</strong> your return is eligible and send you a return authorisation within 1 business day.
            </li>
            <li>
              <strong>Ship the product</strong> back to us using a tracked method. Return shipping costs are the customer's responsibility unless the item arrived damaged or defective.
            </li>
            <li>
              <strong>Refund issued</strong> within 5–7 business days of receiving the returned item. Refunds are made to your original payment method.
            </li>
          </ol>
        </div>

        <div className="policy-section reveal">
          <h2>Exchanges</h2>
          <p>We do not currently offer direct exchanges. If you would like a different product, please return the original (if eligible) for a refund and place a new order. This ensures you receive your new product quickly without waiting for the return to be processed.</p>
        </div>

        <div className="policy-section reveal">
          <h2>Skin Reactions</h2>
          <p>Our products are formulated with minimal, well-tolerated ingredients. However, all skin is different. If you experience an adverse reaction, stop use immediately and consult a healthcare professional. Contact us at <a href="mailto:hello@sheatales.com">hello@sheatales.com</a> — we take skin reactions seriously and will respond personally to every case.</p>
        </div>

        <div className="policy-section reveal">
          <h2>Non-Returnable Items</h2>
          <ul className="policy-list">
            <li>Opened or used products (except in the case of a defect or adverse reaction)</li>
            <li>Products returned more than 30 days after delivery</li>
            <li>Products not purchased directly from sheatales.com</li>
            <li>Gift sets that have been partially opened</li>
          </ul>
        </div>

        <div className="policy-cta reveal">
          <p>Need help with a return?</p>
          <a href="mailto:hello@sheatales.com" className="policy-btn">Email Us</a>
          <Link to="/shop" className="policy-btn policy-btn--outline">Back to Shop</Link>
        </div>
      </section>

      <div className="policy-back reveal">
        <Link to="/story"><ArrowLeft size={16} /> Back</Link>
      </div>
    </div>
  );
}
