import { View } from "react-native";
import { Icon, type IconName } from "@/components/icon";
import Typography from "./typography";

export interface InfoTileProps {
  icon: IconName;
  label: string;
  value: string;
}

export function InfoTile({ icon, label, value }: InfoTileProps) {
  return (
    <View className="flex-1 gap-1.5">
      <Icon name={icon} size={20} color="forest" />
      <Typography className="text-xs font-medium leading-4 text-ink-muted">{label}</Typography>
      <Typography className="text-sm font-semibold">{value}</Typography>
    </View>
  );
}
