import { View } from "react-native";
import type { ReactNode } from "react";
import { cn } from "@/lib";
import Typography from "../typography";

interface LabelProps {
  label: string | ReactNode;
  className?: string;
}

export default function Label({ label, className }: LabelProps) {
  const isReactNode = typeof label !== "string";

  if (isReactNode) {
    return (
      <View className={cn("mb-2 flex-row items-center gap-1", className)}>
        {label}
      </View>
    );
  }

  return (
    <Typography className={cn("mb-1.5 text-[13px] font-semibold leading-[22px]", className)}>
      {label}
    </Typography>
  );
}
