import type { JournalPost, Product } from "./types";

export const products: Product[] = [
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
    image: "/Template-1/assets/soapsheatales.png",
    video: "/Template-1/assets/video1.mp4",
    story: "Selina grew up watching her grandmother cleanse with shea. This bar is her tribute to that ritual — raw butter from Ghanaian cooperatives, nothing stripped, nothing synthetic.",
    details: "The first step in your ritual, and the one that changes everything. Most soaps remove your skin's natural oils and call it clean. This bar does the opposite — the kaolin clay draws out impurities while raw shea, olive, and castor oils maintain your barrier. You rinse off feeling genuinely nourished. The cocoa pod ash gives each bar its natural warm color; no dyes, no fragrance, no compromise. Made for face, body, and hands with one intention: skin that feels like itself again.",
    howToUse: "Wet your skin with warm water. Work the bar between your palms until you have a soft, creamy lather. Apply in gentle circular motions — face, neck, body. Rinse thoroughly. Store the bar on a ridged soap dish between uses so it dries fully and lasts longer. One bar lasts 3–4 weeks with daily use.",
    ingredients: ["Raw unrefined shea butter — Ghana cooperative sourced", "Olive oil — skin barrier protection", "Castor oil — humectant, lather boost", "Kaolin clay — gentle impurity draw", "Cocoa pod ash — natural color, antioxidants"],
    benefits: ["Cleanses without stripping", "Creamy, non-foaming lather", "Zero plastic, zero waste bar format", "Fragrance-free and dye-free", "Lasts 3–4 weeks daily"],
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
    image: "/Template-1/assets/lotionsheatales.png",
    video: "/Template-1/assets/video1.mp4",
    story: "The product Selina made first — because her own skin needed something that actually worked. Raw shea from Ghana's northern belt, fast-absorbing coconut oil, and baobab. Three ingredients that have been nourishing skin for generations.",
    details: "This is the quiet product that earns its place on your shelf every single day. Light enough to apply at 7am before getting dressed, rich enough to soothe the driest skin on a winter evening. The lotion absorbs in seconds — no white cast, no grease, no residue. Baobab oil carries an extraordinary density of vitamins; raw shea provides the structural lipids your skin barrier is built from. Together, they don't just moisturise — they restore. Apply to damp skin after cleansing for maximum absorption and moisture lock.",
    howToUse: "Apply to damp skin immediately after cleansing for maximum absorption. Use long upward strokes on legs and arms. For elbows, heels, and very dry patches, apply a generous second layer at night before bed. A little goes further than you expect — start with a small amount.",
    ingredients: ["Raw unrefined shea butter — vitamins A, E & F", "Coconut oil — fast-absorbing lipid", "Aloe vera leaf — cooling, calming", "Baobab oil — omega-rich nutrient delivery", "Vitamin E — antioxidant protection"],
    benefits: ["Absorbs in under 60 seconds", "No white cast, no greasy residue", "Restores dry and compromised skin", "Non-comedogenic — won't clog pores", "Body, hands, and feet in one product"],
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
    image: "/Template-1/assets/lipbumsheatales.png",
    video: "/Template-1/assets/video2.mp4",
    story: "The seal at the end of every ritual. Selina made this for the in-between moments — the ones that don't make it into a skincare routine but add up to how your skin actually feels by evening.",
    details: "The final ritual step, small enough to carry everywhere. Unlike petroleum-based balms that create the illusion of moisture while drying lips over time, this balm feeds the skin. Shea butter provides lasting nourishment; beeswax creates a breathable, protective barrier. Jojoba oil mimics your skin's natural sebum — which is why it feels so right. Moringa oil adds antioxidant defence. Cocoa butter gives it a subtle natural richness and the faintest warmth on application. Use it on lips, cuticles, and dry patches throughout the day.",
    howToUse: "Swipe directly onto lips as needed throughout the day. Apply to slightly damp lips for best absorption. Works beautifully under lipstick as a nourishing base, or worn alone. Also effective on dry cuticles, rough knuckles, and small patches of dry skin. Keep one in your bag, one on your desk.",
    ingredients: ["Raw shea butter — core emollient", "Beeswax — breathable protective seal", "Jojoba oil — skin-matching humectant", "Cocoa butter — natural richness, soft scent", "Moringa oil — antioxidant and anti-inflammatory"],
    benefits: ["Non-sticky, non-waxy finish", "Lasts for hours without reapplication", "Portable 12g — fits any pocket", "Works on lips, cuticles, and dry patches", "No petroleum, no synthetic fragrance"],
  },
];

export const rawShea: Product = {
  id: "raw-shea-250",
  name: "Raw Shea Butter 250g",
  shortName: "Raw Shea",
  step: "Restore",
  price: 42,
  size: "250g",
  skinType: "Very dry skin, body, and hair",
  scent: "Naturally nutty — earthy, warm",
  texture: "Dense golden butter",
  image: "/Template-1/assets/brand-ritual-textures.png",
  video: "/Template-1/assets/841b3aa6ab3247b89c067144fcd7f099.webm",
  story: "The original. This is the same butter that Ghanaian women have used for generations — for skin, for hair, for healing. Unrefined, unprocessed, exactly as it comes from the cooperative's hands.",
  details: "There is nothing in this jar except raw shea butter. No blending, no refining, no deodorising. What you receive is the butter as it leaves the cooperative: golden, dense, and carrying the complete nutrient profile that makes shea so remarkable. Vitamins A, E, and F. Fatty acids your skin barrier recognises and absorbs. A gentle natural scent from the roasting process — earthy, warm, entirely real. This is the ingredient at the heart of every Shea Tales product, offered in its purest form for those who want to experience it unmediated.",
  howToUse: "Warm a small amount between your palms — body heat is all it needs to melt. Press into dry skin, massage through hair ends, or use as a protective overnight treatment. For very dry or cracked skin, apply generously at night and cover with cotton socks or gloves. For hair, warm through hands and apply to ends only, working upward as needed.",
  ingredients: ["100% raw unrefined shea butter — women's cooperative, Northern Ghana"],
  benefits: ["Single ingredient — nothing added", "Full fatty acid profile intact", "Deep overnight moisture", "Hair and skin multi-use", "Directly supports cooperative income"],
};

export const faqs = [
  { question: "When will my order ship?", answer: "Orders are processed within 2–3 business days. Once dispatched, international orders typically arrive in 7–14 business days depending on destination. You will receive a tracking link by email as soon as your order leaves us." },
  { question: "Do you ship internationally?", answer: "Yes — we ship worldwide. Shipping costs and estimated delivery times are calculated at checkout based on your location. Orders over $75 qualify for free standard international shipping." },
  { question: "Is everything made with real shea butter?", answer: "Yes. Every Shea Tales product is built around raw, unrefined shea butter sourced directly from women-led cooperatives in Ghana's northern shea belt. We never use refined shea, silicones, parabens, or sulfates. The ingredient list is short and intentional." },
  { question: "What is the return policy?", answer: "Unopened, unused products can be returned within 30 days of delivery for a full refund. If your order arrives damaged or defective, we will replace it immediately at no cost. Email us at hello@sheatales.com with your order number and we will take care of you." },
  { question: "Can I use these on sensitive skin?", answer: "Our formulas are built around minimal, well-tolerated ingredients — which makes them a good match for sensitive skin. We recommend patch testing on a small area first, especially if your skin reacts easily. The soap and lotion are both fragrance-free and free of common irritants." },
  { question: "How long does each product last?", answer: "The soap bar (130g) lasts 3–4 weeks with daily use when stored on a ridged soap dish. The lotion (240ml) lasts 4–6 weeks. The lip balm (12g) lasts several months. The raw shea butter (250g) depends on use — it doubles as a hair and body treatment." },
  { question: "How is the shea butter sourced?", answer: "We source directly from women-led cooperatives in Ghana's northern shea belt. The butter is hand-processed using traditional methods — gathered, roasted, kneaded, and finished by cooperative members who have practised this craft for generations. We pay above fair trade rates and do not use middlemen." },
  { question: "Is the packaging sustainable?", answer: "Our soap is a zero-waste bar format with no plastic. All outer packaging is made from recycled materials and is fully recyclable or compostable. We are actively working to move all products to sustainable packaging by the end of 2025." },
];

export const ritualSteps = [
  { title: "Cleanse", copy: "Begin with a bar that cleans without stripping. Raw shea and kaolin clay — your skin barrier stays intact.", image: "/Template-1/assets/soapsheatales.png" },
  { title: "Soften", copy: "Apply to damp skin while your barrier is most receptive. Baobab and raw shea absorb in under a minute.", image: "/Template-1/assets/lotionsheatales.png" },
  { title: "Seal", copy: "The final step. A pocket-sized balm that protects lips, cuticles, and any small place that needs care.", image: "/Template-1/assets/lipbumsheatales.png" },
];

export const brandValues = ["Raw shea — always unrefined", "Women-led cooperative sourcing", "Short, honest ingredient lists", "Craft over commercial shortcuts"];

export const galleryImages = [
  "/Template-1/assets/brand-shea-source.png",
  "/Template-1/assets/brand-ritual-textures.png",
  "/Template-1/assets/brand-lifestyle-ritual.png",
  "/Template-1/assets/lotionsheatales.png",
  "/Template-1/assets/lipbumsheatales.png",
  "/Template-1/assets/soapsheatales.png",
];

export const menuLinks = [
  { label: "Home",    href: "/",       image: "/Template-1/assets/brand-lifestyle-ritual.png", copy: "The world of Shea Tales." },
  { label: "Ritual",  href: "/shop",   image: "/Template-1/assets/brand-ritual-textures.png",  copy: "Cleanse, soften, and seal." },
  { label: "Source",  href: "/story",  image: "/Template-1/assets/brand-shea-source.png",       copy: "From Ghana's shea belt to your skin." },
  { label: "Shop",    href: "/shop",   image: "/Template-1/assets/lotionsheatales.png",          copy: "Four products with a point of view." },
  { label: "Journal", href: "/journal",image: "/Template-1/assets/soapsheatales.png",            copy: "Ingredient notes, rituals, and sourcing stories." },
];

export const quizOptions = [
  { id: "cleanse",      label: "I want a softer cleanse",    result: "shea-soap" },
  { id: "dryness",      label: "My body skin feels dry",     result: "shea-lotion" },
  { id: "lips",         label: "My lips need comfort",       result: "shea-lip-balm" },
  { id: "whole-ritual", label: "I want the whole ritual",    result: "bundle" },
];

export const communityStories = [
  { quote: "Finally a soap that doesn't strip my face.", body: "I have sensitive skin and most cleansers leave me feeling tight and uncomfortable. Selina's soap is different — it lathers softly and rinses clean without that tight feeling. Three months in and it's become non-negotiable for me.", author: "Maya R.", skin: "sensitive, combination" },
  { quote: "The lotion actually absorbs — no white cast.", body: "As a dark-skinned woman, white cast is a dealbreaker. This lotion disappears in under a minute and actually keeps my skin moisturised all day. I've recommended it to everyone I know.", author: "Adwoa M.", skin: "dry, melanin-rich" },
  { quote: "The sourcing story is what got me. The products kept me.", body: "I came for the mission — direct trade with Ghanaian women — but the quality sealed it. The raw shea butter is extraordinary. Knowing exactly where it comes from makes every use feel intentional.", author: "Priya S.", skin: "sustainability-focused" },
  { quote: "I gifted this to my mother and she will not stop talking about it.", body: "She has been searching for something gentle and effective for years. The complete ritual set was the answer. The packaging is beautiful enough to sit on her vanity table and the products actually work. She's on her third order.", author: "David T.", skin: "gifted to mature skin" },
  { quote: "Better results than products costing three times the price.", body: "I've tried expensive serums and creams that promised everything. Shea Tales does more with three products and five ingredients than most brands do with twenty. Honest, effective, and ethically made.", author: "Elena V.", skin: "complete ritual user" },
  { quote: "Using it feels like a moment of care, not just a routine.", body: "There's something about the texture of the raw shea butter and the way the soap lathers that makes you slow down. I genuinely look forward to my morning ritual now. That alone is worth everything.", author: "Sophie J.", skin: "wellness practitioner" },
];

export const journalPosts: JournalPost[] = [
  {
    slug: "why-raw-shea-feels-different",
    title: "Why Raw Shea Feels Different on Your Skin",
    category: "Ingredient Notes",
    readTime: "4 min read",
    image: "/Template-1/assets/brand-shea-source.png",
    excerpt: "Refined shea butter removes the very compounds that make shea work. Here is exactly what raw, unrefined shea contains — and why it matters for your skin barrier.",
    body: [
      { heading: "What you are actually touching", text: "The texture of raw shea butter is unmistakable. Dense, slightly grainy when cold, it melts the moment it meets skin warmth. That reaction is chemistry, not marketing. Unrefined shea retains its full fatty acid profile — oleic, stearic, linoleic, and palmitic acids — the same lipids that form your skin's natural barrier. When you apply raw shea, you are giving your skin building blocks it already recognises." },
      { heading: "What refining strips away", text: "Refined shea starts from the same nut. But industrial processing — bleaching, deodorising, hydrogenating — removes the compounds that make it function. What remains is a white, neutral, shelf-stable ingredient with almost none of the original nutrient complexity. It is used as a texture agent, not a skin treatment. Many commercial moisturisers list refined shea on their labels. They are not the same product." },
      { heading: "The vitamins inside", text: "Raw shea butter is genuinely rich in vitamins A, E, and F. Vitamin A supports skin cell turnover. Vitamin E is a potent antioxidant. Vitamin F — a combination of essential fatty acids — maintains and repairs the skin barrier. Refining degrades all three. The further the shea is processed, the less of this survives into your jar." },
      { heading: "How to know what you have", text: "Raw shea has a scent. Faintly nutty, slightly smoky, entirely natural — that aroma comes from the roasting process and the naturally-occurring plant compounds. Refined shea has no smell, because it has been deodorised. Our shea's golden colour and subtle warmth are proof of what has been preserved. If your shea butter is white and odourless, it has been refined." },
      { heading: "Why your skin feels the difference", text: "A skin barrier supported by the right lipids stays hydrated longer, resists environmental irritation, and recovers faster from stress. Raw shea contributes exactly the building blocks your barrier needs. That is why people who switch from commercial moisturisers to raw shea products often describe the difference as their skin 'finally breathing.' It is not a feeling. It is biology." },
    ],
    relatedProductId: "raw-shea-250",
  },
  {
    slug: "the-cleanse-soften-seal-method",
    title: "The Cleanse / Soften / Seal Method",
    category: "Ritual",
    readTime: "5 min read",
    image: "/Template-1/assets/brand-ritual-textures.png",
    excerpt: "Three products. Three intentions. One complete ritual under three minutes. Here is how the Shea Tales system actually works — and why the order matters.",
    body: [
      { heading: "Three products with a logic", text: "The Shea Tales ritual is not a ten-step programme. It is three products with three clear intentions: remove what does not belong, restore what was lost, then seal it in. Cleanse. Soften. Seal. The system is complete. Mornings, evenings, or both — it takes under three minutes and your skin will show the difference within a week." },
      { heading: "Step 1 — Cleanse", text: "Start with the Shea Butter Soap. Wet your skin, work the bar between your palms to build a soft lather, and apply with gentle circular motions. The goal is not to strip — it is to clear the surface without disrupting your barrier. Kaolin clay draws out impurities. Olive and castor oils keep the skin protected during the process. Rinse with warm water. Store the bar on a ridged dish so it dries between uses." },
      { heading: "Step 2 — Soften", text: "While your skin is still slightly damp from cleansing, apply the Shea Butter Lotion. The damp skin is not incidental — it is the most important part of the step. Damp skin absorbs the lotion and locks in existing moisture instead of simply coating the surface. Use upward strokes. A small amount covers more than you expect. For knees, elbows, and heels, apply a second layer." },
      { heading: "Step 3 — Seal", text: "The lip balm closes the ritual. Morning and evening, and whenever lips feel tight during the day. It also works on dry cuticles and small patches of rough skin. Keep one at home and one in your bag — the 12g size is designed to travel everywhere with you." },
      { heading: "Building the habit", text: "The ritual holds when it is automatic. Attach it to something you already do — your morning shower, your nightly wind-down. The cleanse takes 90 seconds. The lotion, 60 seconds. The balm, 10 seconds. Under three minutes for skin that is genuinely cared for. Not indulgence as luxury. Ritual as practice." },
    ],
    relatedProductId: "shea-soap",
  },
  {
    slug: "from-nut-to-butter-the-cooperative-standard",
    title: "From Nut to Butter: The Cooperative Standard",
    category: "Source",
    readTime: "6 min read",
    image: "/Template-1/assets/brand-lifestyle-ritual.png",
    excerpt: "Every Shea Tales product begins with women in Ghana's northern belt who gather, roast, and knead shea by hand. This is their process — and why it produces something that cannot be replicated industrially.",
    body: [
      { heading: "Where shea begins", text: "Shea butter comes from the nuts of the Vitellaria paradoxa tree, which grows across the semi-arid savannah of West Africa. In Ghana, these trees are so embedded in the landscape and culture that they are legally protected. The women who gather the nuts, process them, and sell the butter have done this work for generations. Their knowledge is the product." },
      { heading: "The gathering", text: "Shea nuts fall once a year during the dry season. Women collect them by hand from the ground and from low branches, then dry them in the sun for several days. This drying cannot be rushed — inadequate drying produces inferior butter. The cooperatives we work with control every step from this point forward." },
      { heading: "The processing", text: "After drying, nuts are cracked, roasted, and ground into a paste. Water is added and the paste is kneaded — by hand, for hours — until the fat separates and floats to the surface. That fat is the butter. It is skimmed, clarified, and packed. Industrial processing can complete this in hours with machinery. The cooperative method takes days. The quality difference is real and measurable." },
      { heading: "What we pay", text: "Fair trade is not a label on a box — it is a price and a relationship. We pay above market rate for every kilogram of shea, directly to the cooperatives, with no middlemen and no price renegotiation based on market fluctuations. Stable income means cooperative members can plan, invest in their families, and sustain their practice across generations." },
      { heading: "Why this connects to your skin", text: "When you use a Shea Tales product, you are at the end of a chain that starts in Ghana's northern belt. The quality you feel — the texture, the absorption, the way your skin responds — is a direct result of a process that was not shortcut. The people who made it were paid fairly. The butter is whole and nutrient-intact. The product on your skin is proof of both." },
    ],
    relatedProductId: "raw-shea-250",
  },
  {
    slug: "selinas-letter-why-i-started-shea-tales",
    title: "Selina's Letter: Why I Started Shea Tales",
    category: "Founder",
    readTime: "5 min read",
    image: "/Template-1/assets/brand-lifestyle-ritual.png",
    excerpt: "Selina started Shea Tales because she kept seeing the same thing: Ghanaian women doing extraordinary work that the world had no idea about. This is her letter about why that had to change.",
    body: [
      { heading: "It started with watching", text: "Before Shea Tales was a brand, it was an observation. I had watched women in Ghana's northern communities spend hours — entire mornings — processing shea butter by hand. Cracking nuts, roasting them over open fire, grinding, kneading. The physical knowledge required is extraordinary. And almost none of it was reaching the people who needed it most." },
      { heading: "What I kept seeing in shops", text: "I would walk into a beauty shop and find moisturisers listing 'shea butter' as an ingredient somewhere near the bottom of a twenty-item list. Refined shea. Processed until it had none of the properties that made it remarkable. Marketed at a premium because of a word. I kept thinking: the women who actually made this product — who have the real thing — deserve to be at the centre of this story." },
      { heading: "The first jar", text: "The first product I made was the lotion — because my own skin needed something that actually worked. I had dry skin and a growing impatience with products that promised and underdelivered. I took the raw shea I had sourced directly from a cooperative, combined it with coconut oil and baobab, and made something for myself. When other people started asking what I was using, I knew something was there." },
      { heading: "What Shea Tales is really about", text: "This brand exists to do two things simultaneously. To bring genuinely effective, honest skincare to people around the world. And to ensure that the women whose hands and knowledge make that possible are paid fairly, seen clearly, and recognised as the origin of everything we sell. Every product is a connection between those two intentions." },
      { heading: "A note to you", text: "If you are reading this, you have found Shea Tales — and I am grateful. Whether you are here for the soap, the lotion, the raw butter, or the story, you are part of something that matters to me deeply. The cooperatives are real. The process is real. The care in every product is real. Thank you for being here. — Selina" },
    ],
  },
  {
    slug: "what-makes-ghanaian-shea-different",
    title: "What Makes Ghanaian Shea Different",
    category: "Source",
    readTime: "4 min read",
    image: "/Template-1/assets/brand-shea-source.png",
    excerpt: "Not all shea butter is equal. Geography, tree age, processing method — they all determine what ends up in your product. Here is why Ghana's northern belt produces shea unlike anywhere else.",
    body: [
      { heading: "Terroir — it applies to shea, too", text: "Wine lovers understand that the same grape variety grown in different soils produces profoundly different wines. The same principle applies to shea. The Vitellaria paradoxa trees in Ghana's northern savannah grow in a specific combination of soil, altitude, rainfall pattern, and temperature that affects the butter's fatty acid composition, colour, and texture. It cannot be replicated by moving the tree." },
      { heading: "The age of the trees", text: "Shea trees take fifteen to twenty years to bear their first nuts, and they continue producing for up to two hundred years. The oldest trees in Ghana's cooperative regions are producing butter with a richness that younger plantations cannot match. This is not mythology — older trees have deeper root systems and more developed nutrient uptake. The butter reflects that." },
      { heading: "The women's processing method", text: "Industrial shea processing uses solvents and heat to extract the butter quickly and at scale. Traditional cooperative processing — the method used by the women we partner with — uses water and hand-kneading. The process is slower and more labour-intensive, but it preserves the butter's complete fatty acid profile, natural vitamin content, and unsaponifiables. These are the compounds that make raw shea butter therapeutically effective." },
      { heading: "The colour tells you something", text: "Raw shea butter from Ghana is golden to ivory in colour, with a subtle warmth and a natural earthy scent. That colour comes from the carotenoids — the same compounds that give it vitamin A activity. White shea butter has been bleached. A perfectly neutral scent means deodorisation. Both processes remove the things that make shea work. Our butter's colour and scent are not imperfections. They are proof." },
      { heading: "Why we source only from Ghana", text: "We have sampled shea butter from multiple West African countries. Ghana's northern belt produces butter with consistently higher unsaponifiable content — the fraction responsible for skin-healing properties — than most other sources we have tested. Combined with our direct cooperative relationship, which ensures ethical processing and fair wages, Ghana is where Shea Tales begins and stays." },
    ],
    relatedProductId: "raw-shea-250",
  },
  {
    slug: "your-skin-through-every-season",
    title: "Your Skin Through Every Season",
    category: "Ritual",
    readTime: "4 min read",
    image: "/Template-1/assets/brand-ritual-textures.png",
    excerpt: "Skin needs change with the seasons — but your ritual does not have to change dramatically. Here is how to adapt the Shea Tales system from hot summers to cold, dry winters.",
    body: [
      { heading: "Why seasons affect your skin", text: "Temperature and humidity directly affect your skin's moisture levels. In summer, heat and humidity can make even dry skin feel balanced. In winter, cold air holds almost no moisture and indoor heating strips what remains. Your skincare does not need to be rebuilt each season — but the way you use it should shift." },
      { heading: "Spring and summer — lighter application", text: "In warmer months, apply the lotion to slightly damp skin and use a single layer. The higher ambient humidity means your skin retains moisture more easily, so the lotion needs to do less work. The soap remains the same — it is gentle enough for daily use year-round without adjustment. The lip balm is essential in summer too, especially in sun and wind." },
      { heading: "Autumn — transition time", text: "As temperatures drop, start applying the lotion to slightly damper skin and consider a second layer on elbows, heels, and knees before bed. This is the season to introduce the raw shea butter as an overnight treatment for areas that tend to suffer in winter — feet, hands, elbows. Apply, cover with socks or cotton gloves, sleep. The difference by morning is significant." },
      { heading: "Winter — the season for shea", text: "This is when raw shea butter earns its place as your primary restoration tool. Apply it as a concentrated treatment to the driest areas before the lotion. The lotion seals it in and spreads the moisture across the rest of your skin. In extreme cold, a second application of lotion in the evening is worthwhile. Your lips will need the balm more frequently — keep one on your bedside table." },
      { heading: "The one constant", text: "Through every season, the cleanse is the same. The Shea Butter Soap is gentle enough for daily use in any climate. It cleanses without stripping — which means you are never fighting against your own skincare. The rest of the ritual adapts around it. That consistency is the foundation the ritual is built on." },
    ],
    relatedProductId: "shea-lotion",
  },
];
