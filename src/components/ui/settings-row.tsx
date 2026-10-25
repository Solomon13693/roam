import type { ReactNode } from "react";
import { Pressable, View } from "react-native";
import { Icon, type IconName } from "@/components/icon";
import Typography from "./typography";

export interface SettingsRowProps {
  icon: IconName;
  label: string;
  supporting?: string;
  trailing?: ReactNode;
  onPress?: () => void;
}


export function SettingsRow({ icon, label, supporting, trailing, onPress }: SettingsRowProps) {
  return (
    <Pressable onPress={onPress} disabled={!onPress} className="flex-row items-center gap-3.5 py-3 active:opacity-70">

      <View className="size-9 items-center justify-center rounded-xl bg-sage-soft">
        <Icon name={icon} size={18} color="forest" />
      </View>

      <View className="flex-1 gap-px">
        <Typography>{label}</Typography>
        {supporting ? <Typography className="text-[13px] leading-[18px] text-ink-muted">{supporting}</Typography> : null}
      </View>

      {trailing ?? <Icon name="chevron-right" size={18} color="ink-muted" />}

    </Pressable>
  );
}
