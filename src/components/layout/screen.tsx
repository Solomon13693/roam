import { View } from "react-native";
import { Typography } from "@/components/ui";

type ScreenProps = { title?: string; children?: React.ReactNode };

export function Screen({ title, children }: ScreenProps) {
  return (
    <View className="flex-1 bg-paper px-6 pt-safe pb-safe">
      {title ? <Typography className="text-[32px] leading-[38px] font-medium">{title}</Typography> : null}
      {children}
    </View>
  );
}
