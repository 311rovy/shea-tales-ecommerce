// Single source of truth for how money is displayed across the store.
// Kenyan Shilling (KES) — no decimal subunit in everyday use, so we round
// to whole shillings and group thousands: 2500 -> "KSh 2,500".
export const CURRENCY = "KES";

export const formatPrice = (amount: number): string =>
  `KSh ${Math.round(amount).toLocaleString("en-KE")}`;

// Cart / shipping rules (edit these to change the store's shipping policy).
export const FREE_SHIPPING_THRESHOLD = 5000; // KSh
export const FLAT_SHIPPING = 500; // KSh

export const shippingFor = (subtotal: number): number =>
  subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : FLAT_SHIPPING;
