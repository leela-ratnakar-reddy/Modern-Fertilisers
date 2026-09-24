export function getLocalStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = window.localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`[Modern Fertilisers] Error parsing localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function setLocalStorage<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.warn(`[Modern Fertilisers] Error setting localStorage key "${key}":`, error);
  }
}

export function removeLocalStorage(key: string): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.warn(`[Modern Fertilisers] Error removing localStorage key "${key}":`, error);
  }
}

export const STORAGE_KEYS = {
  CART: 'mf_cart_items_v1',
  WISHLIST: 'mf_wishlist_ids_v1',
  ORDERS: 'mf_demo_orders_v1',
  RECENTLY_VIEWED: 'mf_recently_viewed_v1',
  COUPON: 'mf_applied_coupon_v1',
};
