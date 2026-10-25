import { useEffect } from "react";
import { Pressable } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import { cn } from "@/lib";

export interface ToggleProps {
  checked?: boolean;
  onValueChange?: (checked: boolean) => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  name?: string;
}

const KNOB_TRAVEL = 18;

export default function Toggle({ checked = false, onValueChange, disabled = false, accessibilityLabel }: ToggleProps) {
  const x = useSharedValue(checked ? KNOB_TRAVEL : 0);

  useEffect(() => {
    x.value = withTiming(checked ? KNOB_TRAVEL : 0, { duration: 180 });
  }, [checked, x]);

  const knobStyle = useAnimatedStyle(() => ({ transform: [{ translateX: x.value }] }));

  return (
    <Pressable
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled }}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      hitSlop={8}
      onPress={() => onValueChange?.(!checked)}
      className={cn("h-7 w-11.5 justify-center rounded-full px-0.75", checked ? "bg-forest" : "bg-line", disabled && "opacity-50")}>
      <Animated.View style={knobStyle} className="size-5.5 rounded-full bg-white shadow-[0_1px_3px_rgba(18,20,19,0.15)]" />
    </Pressable>
  );
}
