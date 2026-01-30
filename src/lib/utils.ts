import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(price: number | null): string {
  if (price === null) return "-";
  return new Intl.NumberFormat("id-ID").format(price);
}

export function formatStarRating(stars: string): string {
  // Convert "1s", "2s", etc. to "1★", "2★", etc.
  return stars.replace(/(\d+)s/g, "$1★");
}
