import { Pressable, View } from "react-native";
import { cn } from "@/lib";
import Typography from "./typography";

export interface SectionHeaderProps {
  title: string;
  actionLabel?: string;
  onActionPress?: () => void;
  className?: string;
}

export function SectionHeader({ title, actionLabel = "See all", onActionPress, className }: SectionHeaderProps) {
  return (
    <View className={cn("flex-row items-baseline justify-between", className)}>
      <Typography accessibilityRole="header" className="text-[20px] font-semibold leading-[30px] tracking-[-0.22px]">
        {title}
      </Typography>
      {onActionPress ? (
        <Pressable accessibilityRole="button" onPress={onActionPress} hitSlop={8} className="active:opacity-70">
          <Typography className="text-[15px] font-semibold text-forest">{actionLabel}</Typography>
        </Pressable>
      ) : null}
    </View>
  );
}
