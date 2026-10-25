import { View } from "react-native";
import { cn } from "@/lib";

export interface StepProgressProps {
  current: number;
  total: number;
  className?: string;
  barClassName?: string;
}

export function StepProgress({ current, total, className, barClassName }: StepProgressProps) {
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 1, max: total, now: current + 1 }}
      className={cn("flex-row gap-1.5", className)}>
      {Array.from({ length: total }, (_, i) => (
        <View key={i} className={cn("h-1.5 flex-1 rounded-full", i <= current ? "bg-forest" : "bg-line", barClassName)} />
      ))}
    </View>
  );
}
