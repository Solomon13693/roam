import { View } from "react-native";
import { cn } from "@/lib";
import Typography from "./typography";

export interface AvatarProps {
  name: string;
  className?: string;
}

const initials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");

export function Avatar({ name, className }: AvatarProps) {
  return (
    <View
      className={cn(
        "size-13 items-center justify-center rounded-full border-3 border-white bg-forest shadow-[0_4px_12px_0_#1217141A]",
        className,
      )}>
      <Typography className="text-[15px] font-semibold text-white">{initials(name)}</Typography>
    </View>
  );
}
