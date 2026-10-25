export const sizeClasses: Record<string, string> = {
  sm: "min-h-12",
  md: "min-h-14",
  lg: "min-h-15",
};

export const sizePaddingX: Record<"sm" | "md" | "lg", number> = {
  sm: 14,
  md: 18,
  lg: 18,
};

export const radiusClasses: Record<string, string> = {
  none: "rounded-none",
  sm: "rounded-lg",
  md: "rounded-[18px]",
  lg: "rounded-2xl",
  xl: "rounded-3xl",
  full: "rounded-full",
};

export const formControlBase =
  "w-full border-[1.5px] border-line bg-white text-ink font-normal text-base focus:border-forest";

export const formControlInvalid = "border-danger focus:border-danger";
