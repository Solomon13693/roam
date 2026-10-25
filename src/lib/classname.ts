import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// tailwind-merge only knows Tailwind's built-in names. Teach it Roam's tokens so
// `cn("rounded-md", "rounded-pill")` keeps the last one, like Tailwind does.
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      radius: ["pill"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
