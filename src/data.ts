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
    story: "Born from Ghanaian tradition. Each bar is crafted with raw, unrefined shea butter from women-led cooperatives, blended with olive and castor oils for a lather that respects your skin barrier.",
    details: "The first ritual step. Unlike commercial cleansers that strip, this gentle bar lathers softly and rinses clean—leaving skin nourished rather than tight. The kaolin clay adds a subtle drawing effect perfect for morning cleansing, while cocoa pod ash brings natural color and antioxidants. Made for face, hands, and body with one simple intention: comfort.",
    howToUse: "Wet your skin with warm water. Massage the bar between your palms to create a creamy lather, then apply gently in circular motions. Rinse thoroughly. Let the bar dry on a ridged soap dish between uses to extend its life. One bar lasts 3-4 weeks with daily use.",
    ingredients: ["Unrefined shea butter from Ghana", "Olive oil (skin-softening)", "Castor oil (humectant)", "Kaolin clay (gentle cleansing)", "Cocoa pod ash (natural color & antioxidants)"],
    benefits: ["Creamy, non-stripping lather", "Plant-based and natural", "Zero waste bar format", "Lasts 3-4 weeks", "Soothes sensitive skin"],
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
    story: "Formulated to replace the moisture your skin loses throughout the day. Raw shea butter + plant oils = the everyday softness your body deserves.",
    details: "The quiet hero of the ritual. Light enough for morning skin but rich enough for dry winter evenings. This lotion absorbs without sitting on skin, thanks to a balanced blend of fast-acting coconut oil and nutrient-dense baobab. Works on arms, legs, hands, and anywhere that needs a soft reset.",
    howToUse: "After cleansing, apply to damp skin for maximum absorption. Use upward strokes on legs and arms. For very dry areas like elbows, knees, and heels, apply a generous layer at night and let it sink in overnight.",
    ingredients: ["Raw, unrefined shea butter (rich in vitamins A & E)", "Coconut oil (fast-absorbing)", "Aloe leaf (cooling & hydrating)", "Baobab oil (nutrient powerhouse)", "Vitamin E (antioxidant protection)"],
    benefits: ["Fast-absorbing formula", "No white cast or greasy feel", "Soothes dry, irritated skin", "Non-comedogenic", "Works as body, hand & foot care"],
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
    story: "The final seal. A pocket-sized balm that turns lip care into a daily ritual moment—part texture, part comfort, entirely essential.",
    details: "The last step to complete your ritual. Unlike waxy commercial balms that sit on lips, this one nourishes with shea butter while beeswax and jojoba oil create a protective seal. Moringa oil brings antioxidants; cocoa butter adds a whisper of natural richness without heaviness.",
    howToUse: "Swipe directly onto lips whenever they feel dry or tight. Use it as a standalone balm or layer over lipstick for added nourishment. The balm works best on slightly damp lips—it locks in moisture rather than adding it on top.",
    ingredients: ["Raw shea butter (core emollient)", "Beeswax (protective seal)", "Jojoba oil (skin-matching humectant)", "Cocoa butter (luxe softness)", "Moringa oil (antioxidant powerhouse)"],
    benefits: ["Non-greasy feel", "Stays on without sticky residue", "Portable 12g tube", "Works on lips and cuticles", "Actual nourishment, not just a barrier"],
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

export const faqs = [
  { question: "When will my order ship?", answer: "Orders are processed within 2-3 business days and ship via USPS Priority Mail. You'll receive a tracking number via email. Most US orders arrive within 5-7 business days from shipment." },
  { question: "Is everything made with real shea butter?", answer: "Yes. Every Shea Tales product is built around raw, unrefined shea butter sourced from women-led cooperatives in Ghana. We never use refined shea, silicones, parabens, or sulfates. If it's not in the ingredient list, it's not in the product." },
  { question: "What is the return policy?", answer: "Unopened products can be returned within 30 days of purchase for a full refund. If something arrives damaged or defective, we'll replace it immediately at no cost. We stand behind everything we make." },
  { question: "Can I use these on sensitive skin?", answer: "Our formulas are intentionally simple with minimal ingredients, which is great for sensitive skin. Always patch test first on a small area, especially if your skin reacts easily to products. The soap and lotion are both hypoallergenic and free of common irritants." },
  { question: "How long does one product last?", answer: "The soap bar lasts 3-4 weeks with daily body and hand use. The lotion (240ml) lasts about 4-6 weeks. The lip balm (12g) lasts several months since a little goes a long way." },
  { question: "Is this brand sustainable?", answer: "We partner directly with women-led shea cooperatives in Ghana, ensuring fair wages and sustainable harvesting practices. Our soap comes in zero-waste bar format. All packaging is recyclable or compostable." },
];

export const ritualSteps = [
  { title: "Cleanse", copy: "A creamy soap ritual that respects the skin barrier before anything else touches it.", image: "/Template-1/assets/soapsheatales.png" },
  { title: "Soften", copy: "A daily shea lotion for the quiet work of keeping skin comfortable from morning to night.", image: "/Template-1/assets/lotionsheatales.png" },
  { title: "Seal", copy: "A balm for lips, cuticles, and small dry places that ask for care throughout the day.", image: "/Template-1/assets/lipbumsheatales.png" },
];

export const brandValues = ["Raw shea first", "Women-led sourcing", "Skin comfort over trends", "Small-batch restraint"];

export const galleryImages = [
  "/Template-1/assets/brand-shea-source.png",
  "/Template-1/assets/brand-ritual-textures.png",
  "/Template-1/assets/brand-lifestyle-ritual.png",
  "/Template-1/assets/lotionsheatales.png",
  "/Template-1/assets/lipbumsheatales.png",
  "/Template-1/assets/soapsheatales.png",
];

export const menuLinks = [
  { label: "Home",    href: "/",       image: "/Template-1/assets/brand-lifestyle-ritual.png", copy: "The emotional world of Shea Tales." },
  { label: "Ritual",  href: "/shop",   image: "/Template-1/assets/brand-ritual-textures.png",  copy: "Cleanse, soften, and seal." },
  { label: "Source",  href: "/story",  image: "/Template-1/assets/brand-shea-source.png",       copy: "From Ghanaian shea craft to daily skin care." },
  { label: "Shop",    href: "/shop",   image: "/Template-1/assets/lotionsheatales.png",          copy: "The core three products." },
  { label: "Journal", href: "/journal",image: "/Template-1/assets/soapsheatales.png",            copy: "Stories, formulas, and rituals." },
];

export const quizOptions = [
  { id: "cleanse",      label: "I want a softer cleanse",    result: "shea-soap" },
  { id: "dryness",      label: "My body skin feels dry",     result: "shea-lotion" },
  { id: "lips",         label: "My lips need comfort",       result: "shea-lip-balm" },
  { id: "whole-ritual", label: "I want the whole ritual",    result: "bundle" },
];

export const communityStories = [
  { quote: "Finally a soap that doesn't strip my face.", body: "I have sensitive skin and most cleansers leave me feeling tight and uncomfortable. This soap is different—it actually feels good to use. My skin feels clean but soft, and I don't need to use extra moisturizer afterward. I've been using it for 3 months now and it's become essential.", author: "Maya R.", skin: "sensitive, combination" },
  { quote: "The lotion actually stays on my skin.", body: "Most lotions feel like I'm rubbing oil all over my body. This one absorbs in seconds but I still feel the moisture. It's the perfect weight for morning use—not heavy, but definitely effective. Winter is no longer a struggle for my legs and arms.", author: "James L.", skin: "dry, eczema-prone" },
  { quote: "I love the sourcing story almost as much as the product.", body: "Knowing that my purchase directly supports women in Ghana makes me feel good about what I'm buying. But beyond that, the quality is undeniable. The lip balm goes with me everywhere. Everything works exactly as described with zero gimmicks.", author: "Priya S.", skin: "values: sustainability, transparency" },
  { quote: "I gifted this to my mom and she won't stop talking about it.", body: "The packaging alone is beautiful enough to gift, but when she actually started using it? She's converted. She went from skeptical to ordering her own set. The soap sits on her bathroom counter like art.", author: "David T.", skin: "customer for 8 months" },
  { quote: "Better than products 3x the price.", body: "I've spent hundreds on skincare trying to find something that actually works for my dry skin. Shea Tales does it better and cheaper. The fact that it's ethically sourced is honestly the cherry on top. This is what I'm buying from now on.", author: "Elena V.", skin: "complete ritual user" },
  { quote: "The ritual actually feels like a ritual.", body: "Using Shea Tales makes me slow down. It's not fast skincare—it's intentional skincare. The textures, the scent, the simplicity of it. I find myself looking forward to my morning and evening routine in a way I never did with other products.", author: "Sophie J.", skin: "wellness enthusiast" },
];

export const journalPosts: JournalPost[] = [
  {
    slug: "why-raw-shea-feels-different",
    title: "Why Raw Shea Feels Different",
    category: "Ingredient Notes",
    readTime: "4 min read",
    image: "/Template-1/assets/brand-shea-source.png",
    excerpt: "Raw, unrefined shea butter holds the complete nutrient profile: vitamins A, E, and F; fatty acids; and naturally-occurring compounds that refined versions lose. Here's what you're really getting.",
    body: [
      { heading: "What you're really touching", text: "The texture of raw shea butter is unlike anything from a commercial lab. It's dense, slightly grainy when cold, and melts the moment it meets skin. That reaction—that instant melt—is not a marketing claim. It's chemistry. Unrefined shea retains its full fatty acid profile, including oleic, stearic, linoleic, and palmitic acids. These are the same lipids your skin's barrier is built from." },
      { heading: "What refining removes", text: "Refined shea butter starts from the same nut. But industrial processing—the deodorizing, bleaching, and hydrogenation—strips out the compounds that make it work. What's left is a white, neutral, shelf-stable ingredient that has almost none of the original nutrient complexity. Many commercial moisturizers use refined shea as a filler. It's in there for texture, not function." },
      { heading: "The vitamins inside", text: "Raw shea butter is genuinely rich in vitamins A, E, and F. Vitamin A supports skin cell regeneration. Vitamin E is an antioxidant that helps protect against environmental damage. Vitamin F—a combination of essential fatty acids—helps maintain and repair the skin barrier. Refining degrades all three. The further the shea is processed, the less of this survives." },
      { heading: "How to tell the difference", text: "Raw shea has a smell. It's faintly nutty, almost smoky, and entirely natural. That scent comes from the roasting process and the naturally occurring plant compounds. Refined shea has no smell, because it's been deodorized. If your shea butter has no scent, it's been processed. The golden, ivory color and the subtle scent of our shea are proof of what's been preserved." },
      { heading: "Why this matters for your skin", text: "A skin barrier built with the right lipids stays hydrated longer, resists irritation better, and heals faster. Shea butter in its raw form contributes the exact building blocks your skin needs. Refined shea, in most cases, contributes very little beyond moisture lock. We use raw, unrefined shea because we want the product to actually work." },
    ],
    relatedProductId: "shea-lotion",
  },
  {
    slug: "the-cleanse-soften-seal-method",
    title: "The Cleanse / Soften / Seal Method",
    category: "Ritual",
    readTime: "5 min read",
    image: "/Template-1/assets/brand-ritual-textures.png",
    excerpt: "Three products. Three intentions. One complete ritual. Built for real mornings, real stress, real dry skin. This is how to actually use your shea.",
    body: [
      { heading: "Three products. One logic.", text: "The Shea Tales ritual isn't a 10-step program. It's three products with three clear intentions: remove what doesn't belong, restore what was lost, then seal it in. That's the complete loop. Cleanse, Soften, Seal. Morning or evening, it takes less time than you think—and your skin will feel the difference within a week." },
      { heading: "Step 1: Cleanse", text: "The ritual starts with the Shea Butter Soap. Wet your skin, work the bar between your palms until you have a creamy lather, then apply with circular motions. The goal here is not to strip—it's to dissolve surface buildup without disrupting the skin barrier. The kaolin clay draws out impurities. The olive and castor oils protect the skin during cleansing. Rinse thoroughly with warm water. Let the bar air dry on a ridged soap dish between uses." },
      { heading: "Step 2: Soften", text: "While your skin is still slightly damp from cleansing, apply the Shea Butter Lotion. Damp skin is the key—it allows the lotion to lock in the moisture already present rather than just sitting on the surface. Use upward strokes on arms and legs. For hands and elbows, a slightly more generous layer. You'll notice it absorbs quickly—no residue, no white cast." },
      { heading: "Step 3: Seal", text: "The lip balm closes the ritual. A swipe morning and night, and whenever lips feel tight throughout the day. It works on cuticles too—the moringa oil and beeswax seal in moisture and create a soft, protective layer. Keep a tube everywhere: bathroom counter, bag, desk." },
      { heading: "Building the habit", text: "The ritual works best when it's automatic. Pair it with something that already happens—morning shower, nightly skincare, brushing your teeth. The cleanse takes 90 seconds. The lotion, 60 seconds. The balm, 10 seconds. Total: under three minutes for skin that's actually cared for. Not indulgence as a luxury. Ritual as a practice." },
    ],
    relatedProductId: "shea-soap",
  },
  {
    slug: "from-nut-to-butter-the-cooperative-standard",
    title: "From Nut to Butter: The Cooperative Standard",
    category: "Source",
    readTime: "6 min read",
    image: "/Template-1/assets/brand-lifestyle-ritual.png",
    excerpt: "Every Shea Tales product starts with women in Ghanaian cooperatives who gather, roast, and knead shea nuts by hand. We honor this process because it matters.",
    body: [
      { heading: "Where shea begins", text: "Shea butter comes from the nuts of the Vitellaria paradoxa tree, which grows across the semi-arid savannah belt of West Africa. In Ghana, these trees are so embedded in the landscape and the culture that they're protected by law. The women who gather the nuts, process them, and sell the butter have been doing this work for generations. Their knowledge is the product." },
      { heading: "The gathering", text: "Shea nuts fall from the trees once a year, during the dry season. Women collect them by hand, from the ground and from low branches. The nuts are then dried in the sun for days before processing begins. This step is unhurried—rushing the drying creates inferior butter. The cooperatives we partner with control every stage from this point forward." },
      { heading: "The processing", text: "After drying, the nuts are cracked, roasted, and ground into a paste. Water is added and the paste is kneaded—by hand, for hours—until the fat separates and floats to the surface. This is the butter. It's skimmed, clarified, and packed. Industrial shea production can run this process in hours. The cooperative method takes days. The difference shows up in your jar." },
      { heading: "What we pay", text: "Fair trade isn't a certification on a box. It's a relationship and a price. We pay above market rate for every kilogram of shea we source, directly to the cooperatives. No middlemen. No price renegotiation based on market fluctuations. Stable, predictable income for cooperative members means they can plan, invest, and sustain the practice." },
      { heading: "Why this connects to your skin", text: "When you use a Shea Tales product, you're at the end of a chain that starts in the Ghanaian savannah. The quality you feel—the texture, the absorption, the way your skin responds—is a direct result of the process that made it. Nothing about that process was shortcut. The butter is whole, raw, and nutrient-intact. The people who made it were paid fairly. The product on your skin is the proof of both." },
    ],
    relatedProductId: "raw-shea-250",
  },
];
