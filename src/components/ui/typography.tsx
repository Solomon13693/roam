import { Text, type TextProps } from "react-native";
import type { ColorToken } from "@/constants/colors";
import { cn } from "@/lib";

const variants = {
  display: "font-medium text-[44px] leading-[48px] tracking-[-1.32px]",
  h1: "font-medium text-[32px] leading-[38px] tracking-[-0.96px]",
  h2: "font-semibold text-[22px] leading-[28px] tracking-[-0.44px]",
  h3: "font-semibold text-[17px] leading-[22px] tracking-[-0.17px]",
  body: "font-normal text-[15px] leading-[22px]",
  "body-strong": "font-semibold text-[15px] leading-[22px]",
  "body-sm": "font-normal text-[13px] leading-[18px]",
  eyebrow: "font-medium text-[12px] leading-[16px]",
  button: "font-semibold text-[15px] leading-[20px]",
  caption: "font-medium text-[12px] leading-[16px]",
} as const;

export type TypographyVariant = keyof typeof variants;

const colorClasses: Record<ColorToken, string> = {
  forest: "text-forest",
  "forest-deep": "text-forest-deep",
  sage: "text-sage",
  "sage-soft": "text-sage-soft",
  sand: "text-sand",
  "sand-soft": "text-sand-soft",
  paper: "text-paper",
  white: "text-white",
  ink: "text-ink",
  "ink-muted": "text-ink-muted",
  line: "text-line",
  clay: "text-clay",
  lime: "text-lime",
  danger: "text-danger",
};

const alignClasses = {
  left: "text-left",
  center: "text-center",
  right: "text-right",
} as const;

export interface TypographyProps extends TextProps {
  variant?: TypographyVariant;
  color?: ColorToken;
  align?: keyof typeof alignClasses;
  className?: string;
}

export default function Typography({
  variant = "body",
  color = "ink",
  align,
  className,
  ...rest
}: TypographyProps) {
  return (
    <Text
      className={cn(variants[variant], colorClasses[color], align && alignClasses[align], className)}
      {...rest}
    />
  );
}
