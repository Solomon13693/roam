import { Pressable, type PressableProps } from "react-native";
import { Icon, type IconName } from "@/components/icon";
import { cn } from "@/lib";
import Typography from "./typography";

export interface ChipProps extends Omit<PressableProps, "children"> {
  label: string;
  icon?: IconName;
  selected?: boolean;
  className?: string;
}

export function Chip({ label, icon, selected = false, className, ...rest }: ChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      className={cn(
        "h-10 font-medium flex-row items-center gap-1.5 rounded-pill px-4 shadow-[0_2px_10px_rgba(18,20,19,0.06)] active:opacity-80",
        selected ? "bg-forest" : "bg-white",
        className,
      )}
      {...rest}>
      {icon ? <Icon name={icon} size={16} color={selected ? "white" : "ink"} /> : null}
      <Typography className={cn("text-[13px] font-medium leading-4", selected ? "text-white" : "text-ink")}>{label}</Typography>
    </Pressable>
  );
}
