import { View } from "react-native";
import { Icon, type IconName } from "@/components/icon";
import { cn } from "@/lib";
import Button from "./button";
import Typography from "./typography";

export interface EmptyStateProps {
  icon: IconName;
  title: string;
  description?: string;
  actionLabel?: string;
  actionIcon?: IconName;
  onActionPress?: () => void;
  className?: string;
}

export function EmptyState({ icon, title, description, actionLabel, actionIcon, onActionPress, className }: EmptyStateProps) {
  return (
    <View className={cn("items-center gap-3 px-6", className)}>
      <View className="size-22 items-center justify-center rounded-full bg-sand-soft">
        <Icon name={icon} size={36} color="forest" />
      </View>

      <Typography className="text-center text-[22px] font-medium leading-[30px] tracking-[-0.22px]">{title}</Typography>

      {description ? <Typography className="text-center text-ink-muted">{description}</Typography> : null}

      {actionLabel && onActionPress ? (
        <Button variant="secondary" icon={actionIcon} onPress={onActionPress} className="mt-2 self-center">
          {actionLabel}
        </Button>
      ) : null}
    </View>
  );
}
