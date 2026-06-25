import { ChevronDown } from "lucide-react";
import { Link } from "../router";
import { brandValues, communityStories, faqs } from "../data";
import type { AppOutletContext } from "../types";
import Picture from "../components/Picture";

type Props = {
  ctx: AppOutletContext;
  openFaq: number;
  setOpenFaq: (i: number) => void;
};

export default function Story({ ctx: _ctx, openFaq, setOpenFaq }: Props) {
  return (
    <div className="page-fade">
      {/* Interior page hero */}
      <section className="interior-hero interior-hero--dark">
        <Picture src="/Template-1/assets/brand-lifestyle-ritual.png" alt="Shea Tales story" className="interior-hero-bg" width={1536} height={1024} priority />
        <div className="interior-hero-scrim" />
        <div className="interior-hero-content reveal">
          <p className="eyebrow">Our Story</p>
          <h1>Rooted in craft.<br />Shaped by care.</h1>
          <p>From the shea belt of Ghana to your daily ritual.</p>
        </div>
      </section>

      {/* Founder */}
      <section id="about-founder" className="founder-section">
        <div className="founder-grid">
          <div className="founder-media reveal">
            <Picture src="/Template-1/assets/brand-lifestyle-ritual.png" alt="Founder story" width={600} height={400} />
          </div>
          <div className="founder-copy reveal">
            <p className="eyebrow">The Founder</p>
            <h2>From Observation to Origin</h2>
            <p>
              Shea Tales began not with a formula, but with a question. After years of watching the skincare
              industry chase trends while ignoring craft, I wanted to build something different. Something rooted.
            </p>
            <p>
              The answer was in Ghana. In the hands of women who know shea butter not as a trendy ingredient,
              but as a way of life. Every bar, every jar, every balm carries the story of their patience,
              their knowledge, and their hands.
            </p>
            <p>
              This brand is my promise to honor that. To never shortcut the process. To keep ingredients simple.
              To let the texture speak. To build a business where the quality behind the product matters as much
              as the marketing around it.
            </p>
            <span className="founder-sig">— Founder, Shea Tales</span>
          </div>
        </div>
      </section>

      {/* Manifesto */}
      <section id="manifesto">
        <div className="manifesto-grid">
          <div className="manifesto-copy reveal">
            <p className="eyebrow">Brand Manifesto</p>
            <h2>Not clean beauty as a trend. Care as a memory.</h2>
          </div>
          <div className="manifesto-media reveal">
            <Picture src="/Template-1/assets/brand-lifestyle-ritual.png" alt="Morning shea butter ritual" width={600} height={400} />
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

      {/* Source */}
      <section id="source" className="source-section">
        <div className="source-media reveal">
          <Picture src="/Template-1/assets/brand-shea-source.png" alt="Hands working with raw shea butter" width={600} height={400} />
          <video autoPlay loop muted playsInline src="/Template-1/assets/video2.mp4" />
        </div>
        <div className="source-copy reveal">
          <p className="eyebrow">From Ghana, With Care</p>
          <h2>The shea is not an ingredient note. It is the origin.</h2>
          <p>
            Our formulas are shaped around raw shea butter sourced through women-led cooperatives.
            Gathered, roasted, kneaded, and finished with restraint. Every product honors the process behind it.
          </p>
          <div className="value-grid">
            {brandValues.map((value) => <span key={value}>{value}</span>)}
          </div>
          <Link to="/journal/from-nut-to-butter-the-cooperative-standard" className="source-read-link">
            Read the sourcing story →
          </Link>
        </div>
      </section>

      {/* Impact */}
      <section id="impact" className="impact-section">
        <div className="impact-top reveal">
          <p className="eyebrow">Our Impact</p>
          <h2>Shea as Currency. Care as Practice.</h2>
          <p>
            Every purchase directly supports women-led shea butter cooperatives in Ghana. We don't just
            source from them—we partner with them, ensuring fair wages, sustainable practices, and skill preservation.
          </p>
        </div>
        <div className="impact-grid">
          {[
            { title: "Fair Trade Direct", body: "100% of products sourced through verified women-led cooperatives. Transparent pricing. No middlemen." },
            { title: "Zero Waste Commitment", body: "Bar soap format creates zero plastic waste. All packaging is recyclable or compostable." },
            { title: "Skill Preservation", body: "Traditional hand-processing methods are preserved and valued. We reject industrial shortcuts that displace community knowledge." },
            { title: "Long-Term Relationships", body: "Multi-year partnerships mean stable income for cooperative members. We grow together, not extract and leave." },
          ].map((card) => (
            <div className="impact-card reveal" key={card.title}>
              <h3>{card.title}</h3>
              <p>{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Community testimonials */}
      <section id="community" className="community-section">
        <div className="community-head reveal">
          <p className="eyebrow">The Ritual Community</p>
          <h2>Real people. Real skin. Real results.</h2>
          <p>Stories from people who have made Shea Tales part of their daily ritual.</p>
        </div>
        <div className="community-grid">
          {communityStories.map((story) => (
            <article className="community-card reveal" key={story.author}>
              <h3>"{story.quote}"</h3>
              <p>{story.body}</p>
              <span>{story.author} / skin type: {story.skin}</span>
            </article>
          ))}
        </div>
      </section>

      {/* About / stats */}
      <section className="about-section">
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
            <span><strong>$50+</strong> Free shipping</span>
          </div>
        </div>
      </section>

      {/* FAQ */}
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
              <span>{faq.question}<ChevronDown size={22} /></span>
              <p>{faq.answer}</p>
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
