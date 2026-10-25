import { ActivityIndicator, Pressable, View, type PressableProps } from "react-native";
import { Icon, type IconName } from "@/components/icon";
import { colors, type ColorToken } from "@/constants/colors";
import { cn } from "@/lib";
import Typography from "./typography";

const variants = {
  primary: { container: "bg-forest", text: "text-white", color: "white" },
  secondary: { container: "bg-sage-soft", text: "text-forest", color: "forest" },
  outline: { container: "bg-white shadow-[0_4px_14px_rgba(18,23,20,0.08)]", text: "text-ink-muted", color: "ink-muted" },
  "on-photo": { container: "bg-white", text: "text-ink", color: "ink" },
} satisfies Record<string, { container: string; text: string; color: ColorToken }>;

export type ButtonVariant = keyof typeof variants;

export interface ButtonProps extends Omit<PressableProps, "children" | "disabled"> {
  children: string;
  variant?: ButtonVariant;
  icon?: IconName;
  loading?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  /** Extra classes for the label, e.g. "text-ink" or "text-base". */
  textClassName?: string;
}

export default function Button({
  children,
  variant = "primary",
  icon,
  loading = false,
  disabled = false,
  fullWidth = false,
  className,
  textClassName,
  ...rest
}: ButtonProps) {
  const style = variants[variant];
  const isDisabled = disabled || loading;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      disabled={isDisabled}
      className={cn(
        "h-14.5 flex-row items-center justify-center gap-2 self-start rounded-pill px-5.5 font-medium",
        style.container,
        fullWidth && "self-stretch",
        isDisabled && "opacity-50",
        "active:opacity-70",
        className,
      )}
      {...rest}>
      {loading ? (
        <ActivityIndicator color={colors[style.color]} />
      ) : (
        <View className="flex-row items-center gap-2">
          {icon ? <Icon name={icon} size={18} color={style.color} /> : null}
          <Typography className={cn("font-semibold leading-5", style.text, textClassName)}>
            {children}
          </Typography>
        </View>
      )}
    </Pressable>
  );
}
