export type Product = {
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

export type CartItem = Product & { quantity: number };

export type JournalPost = {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  image: string;
  excerpt: string;
  body: { heading?: string; text: string }[];
  relatedProductId?: string;
};

export type AppOutletContext = {
  addToCart: (product: Product) => void;
  addBundle: () => void;
  toggleWishlist: (id: string) => void;
  setSelectedProduct: (product: Product | null) => void;
  setQuizOpen: (open: boolean) => void;
  wishlist: string[];
  pushToast: (message: string) => void;
  stockMap: Record<string, number>;
};
