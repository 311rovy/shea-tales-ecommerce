import { Link } from "../router";
import { ArrowLeft, Package, Truck, Globe, Clock } from "lucide-react";

export default function Shipping() {
  return (
    <div className="page-fade policy-page">
      <section className="policy-hero">
        <div className="policy-hero-content reveal">
          <p className="eyebrow">Shipping Information</p>
          <h1>Getting your ritual to you.</h1>
          <p>We ship worldwide from our fulfilment centre. Every order is packed with care.</p>
        </div>
      </section>

      <section className="policy-body">
        <div className="policy-grid reveal">
          <div className="policy-card">
            <Clock size={28} />
            <h3>Processing Time</h3>
            <p>All orders are processed within <strong>2–3 business days</strong> of payment confirmation. You will receive an email with your tracking information as soon as your order is dispatched.</p>
          </div>
          <div className="policy-card">
            <Truck size={28} />
            <h3>Standard Shipping</h3>
            <p>Standard international shipping takes <strong>7–14 business days</strong> depending on destination. Shipping costs are calculated at checkout based on your location and order weight.</p>
          </div>
          <div className="policy-card">
            <Globe size={28} />
            <h3>Free Shipping</h3>
            <p>Orders over <strong>$75</strong> qualify for free standard international shipping. This is applied automatically at checkout — no code needed.</p>
          </div>
          <div className="policy-card">
            <Package size={28} />
            <h3>Packaging</h3>
            <p>Every order is packed in <strong>recyclable or compostable materials</strong>. We do not use single-use plastic in any of our packaging. The soap bar ships in a zero-waste wrapper.</p>
          </div>
        </div>

        <div className="policy-section reveal">
          <h2>Delivery Times by Region</h2>
          <div className="policy-table-wrap">
            <table className="policy-table">
              <thead>
                <tr><th>Region</th><th>Standard Shipping</th><th>Express (where available)</th></tr>
              </thead>
              <tbody>
                <tr><td>Ghana & West Africa</td><td>3–6 business days</td><td>1–3 business days</td></tr>
                <tr><td>East & Southern Africa</td><td>5–10 business days</td><td>2–4 business days</td></tr>
                <tr><td>United Kingdom & Europe</td><td>7–12 business days</td><td>3–5 business days</td></tr>
                <tr><td>United States & Canada</td><td>8–14 business days</td><td>4–6 business days</td></tr>
                <tr><td>Middle East & Asia</td><td>10–18 business days</td><td>5–8 business days</td></tr>
                <tr><td>Australia & New Zealand</td><td>10–16 business days</td><td>5–7 business days</td></tr>
              </tbody>
            </table>
          </div>
          <p className="policy-note">Delivery times are estimates and may vary due to local customs processing, public holidays, or carrier delays. We are not responsible for delays caused by customs authorities.</p>
        </div>

        <div className="policy-section reveal">
          <h2>Customs & Import Duties</h2>
          <p>International orders may be subject to customs duties and taxes imposed by the destination country. These charges are the responsibility of the customer and are not included in our pricing or shipping fees. We recommend checking your local customs regulations before ordering.</p>
        </div>

        <div className="policy-section reveal">
          <h2>Lost or Undelivered Orders</h2>
          <p>If your order has not arrived within the estimated delivery window, please check your tracking link first. If the tracking shows delivery but you have not received your package, or if the tracking has not updated in more than 7 days, contact us at <a href="mailto:hello@sheatales.com">hello@sheatales.com</a> with your order number. We will investigate and resolve the situation.</p>
        </div>

        <div className="policy-cta reveal">
          <p>Questions about your order?</p>
          <a href="mailto:hello@sheatales.com" className="policy-btn">Contact Us</a>
          <Link to="/shop" className="policy-btn policy-btn--outline">Back to Shop</Link>
        </div>
      </section>

      <div className="policy-back reveal">
        <Link to="/story"><ArrowLeft size={16} /> Back</Link>
      </div>
    </div>
  );
}
