import { Link } from "../router";
import { ArrowLeft } from "lucide-react";

const careGuides = [
  {
    product: "Shea Butter Soap",
    icon: "◈",
    tips: [
      { label: "Store dry between uses", text: "The biggest factor in how long your bar lasts is how you store it between uses. Use a ridged or slatted soap dish that allows water to drain and air to circulate. A bar sitting in standing water will soften and dissolve much faster than it should." },
      { label: "Keep out of direct shower spray", text: "Position your soap dish away from the direct flow of water. The bar only needs contact with water during use — not between uses." },
      { label: "Allow to cure", text: "If your bar has just arrived, let it sit uncovered for 24 hours before first use. This allows any residual moisture from packing to evaporate and firms the lather." },
      { label: "Expected life", text: "A 130g bar lasts 3–4 weeks with daily face and body use when stored correctly. Improper storage (wet dish, direct spray) can cut this to 1–2 weeks." },
    ],
  },
  {
    product: "Shea Butter Lotion",
    icon: "◉",
    tips: [
      { label: "Apply to damp skin", text: "The most important instruction for this lotion — apply while your skin is still slightly damp after cleansing. Damp skin absorbs the lotion and traps existing moisture rather than simply coating the surface. The difference in how long it lasts is significant." },
      { label: "Store at room temperature", text: "Keep the lotion away from direct heat and sunlight. High temperatures can affect the texture and stability of the natural oils. A bathroom shelf or bedside table is ideal." },
      { label: "Pump cleanly", text: "After each use, wipe the pump head with a clean cloth to prevent product buildup that can harbour bacteria over time." },
      { label: "Shelf life", text: "Use within 12 months of opening. Natural formulas without synthetic preservatives are best used fresh. The best-before date is printed on the base of the bottle." },
    ],
  },
  {
    product: "Shea Butter Lip Balm",
    icon: "◌",
    tips: [
      { label: "Apply to clean, damp lips", text: "For maximum absorption, apply the balm to slightly damp lips — after drinking water, or just after cleansing. The balm traps moisture rather than simply sitting on the surface." },
      { label: "Avoid extreme heat", text: "The beeswax and shea butter in this balm have a natural melt point. Avoid leaving the tube in direct sun or a hot car — it will melt inside the tube. If this happens, place in the refrigerator for 30 minutes to re-solidify. It remains effective." },
      { label: "Do not share", text: "For hygiene reasons, do not share your lip balm. Bacteria transfer easily via lip contact and can cause cross-contamination." },
      { label: "Other uses", text: "The balm works on dry cuticles, rough knuckles, and small patches of dry skin anywhere on the body. It is not limited to lips." },
    ],
  },
  {
    product: "Raw Shea Butter 250g",
    icon: "◈",
    tips: [
      { label: "Store in a cool, dry place", text: "Raw shea butter is stable at room temperature but will melt above approximately 35°C. In warm climates, store in a cool cupboard or refrigerator. Melted and re-solidified shea is still fully effective — only the texture changes." },
      { label: "Use clean, dry hands", text: "Always scoop the butter with clean, dry hands or a clean spatula. Introducing water or bacteria into the jar can degrade the product over time." },
      { label: "Normal texture variation", text: "Raw shea butter's texture changes naturally with temperature. It may be very firm in cold weather and soft or semi-liquid in warm conditions. Both states are completely normal and do not indicate spoilage." },
      { label: "Shelf life", text: "Raw unrefined shea butter has a natural shelf life of approximately 18–24 months when stored correctly. Keep the lid closed when not in use to prevent oxidation." },
    ],
  },
];

export default function Care() {
  return (
    <div className="page-fade policy-page">
      <section className="policy-hero">
        <div className="policy-hero-content reveal">
          <p className="eyebrow">Care Instructions</p>
          <h1>How to get the most from your ritual.</h1>
          <p>Simple care habits that extend the life of every product and improve your results.</p>
        </div>
      </section>

      <section className="policy-body">
        <div className="policy-section reveal">
          <p className="policy-intro">Natural products reward simple care. Here is everything you need to know to get the most from your Shea Tales ritual — stored well, used correctly, and lasting as long as possible.</p>
        </div>

        {careGuides.map((guide) => (
          <div className="care-guide reveal" key={guide.product}>
            <div className="care-guide-head">
              <span className="care-icon">{guide.icon}</span>
              <h2>{guide.product}</h2>
            </div>
            <div className="care-tips">
              {guide.tips.map((tip) => (
                <div className="care-tip" key={tip.label}>
                  <h4>{tip.label}</h4>
                  <p>{tip.text}</p>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="policy-section reveal">
          <h2>General Guidelines</h2>
          <ul className="policy-list">
            <li>All products are free from synthetic fragrances, parabens, sulfates, and silicones</li>
            <li>Patch test new products on a small area of skin before full use, especially if you have reactive or sensitive skin</li>
            <li>Keep all products out of direct sunlight and away from heat sources</li>
            <li>If you are pregnant, nursing, or have a known skin condition, consult a healthcare professional before use</li>
            <li>Keep out of reach of children under 3 years</li>
          </ul>
        </div>

        <div className="policy-section reveal">
          <h2>Ingredient Sensitivities</h2>
          <p>Our formulas are intentionally minimal. If you have a known allergy to any ingredient listed on a product, do not use it. Full ingredient lists are available on each product page. If you are unsure, email us at <a href="mailto:hello@sheatales.com">hello@sheatales.com</a> — we are happy to advise.</p>
        </div>

        <div className="policy-cta reveal">
          <p>Have a question about a product?</p>
          <a href="mailto:hello@sheatales.com" className="policy-btn">Ask Us</a>
          <Link to="/shop" className="policy-btn policy-btn--outline">Shop Products</Link>
        </div>
      </section>

      <div className="policy-back reveal">
        <Link to="/story"><ArrowLeft size={16} /> Back</Link>
      </div>
    </div>
  );
}
