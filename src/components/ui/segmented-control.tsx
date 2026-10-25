import { Pressable, View } from "react-native";
import { cn } from "@/lib";
import Typography from "./typography";

export type SegmentOption<T extends string> = { value: T; label: string };

export interface SegmentedControlProps<T extends string> {
  options: SegmentOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
}

export function SegmentedControl<T extends string>({ options, value, onChange, className }: SegmentedControlProps<T>) {
  return (
    <View accessibilityRole="radiogroup" className={cn("flex-row gap-1 rounded-full bg-white p-1", className)}>
      {options.map((option) => {
        const selected = option.value === value;
        return (
          <Pressable
            key={option.value}
            accessibilityRole="radio"
            accessibilityState={{ selected }}
            onPress={() => onChange(option.value)}
            className={cn("h-12.5 flex-1 items-center justify-center rounded-full", selected ? "bg-forest" : "bg-transparent")}>
            <Typography className={cn("font-semibold", selected ? "text-white" : "text-ink-muted")}>{option.label}</Typography>
          </Pressable>
        );
      })}
    </View>
  );
}
