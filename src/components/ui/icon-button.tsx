import { Pressable, type PressableProps } from "react-native";
import { Icon, type IconName, type IconProps } from "@/components/icon";
import { cn } from "@/lib";

export interface IconButtonProps extends Omit<PressableProps, "children"> {
  icon: IconName;
  accessibilityLabel: string;
  /** A colour token ("forest") or any colour. Defaults to ink. */
  iconColor?: IconProps["color"];
  iconSize?: number;
  className?: string;
}

export function IconButton({ icon, iconColor = "ink", iconSize = 20, className, ...rest }: IconButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      hitSlop={6}
      className={cn(
        "size-12 items-center justify-center rounded-full bg-white shadow-[0_4px_14px_rgba(18,23,20,0.10)] active:opacity-80",
        className,
      )}
      {...rest}>
      <Icon name={icon} size={iconSize} color={iconColor} />
    </Pressable>
  );
}
