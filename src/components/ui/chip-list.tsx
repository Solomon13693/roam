import { FlatList, View } from "react-native";
import type { IconName } from "@/components/icon";
import { cn } from "@/lib";
import { Chip } from "./chip";
import { LinearGradient } from "./linear-gradient";

export type ChipItem = { id: string; label: string; icon?: IconName };

export interface ChipListProps {
  items: ChipItem[];
  selectedId?: string;
  onSelect: (id: string) => void;
  fadeColor?: string;
  className?: string;
}

export function ChipList({ items, selectedId, onSelect, fadeColor = "#F7F8F6", className }: ChipListProps) {
  return (
    <View className={cn("-mx-6", className)}>
      <FlatList
        data={items}
        horizontal
        showsHorizontalScrollIndicator={false}
        className="grow-0"
        contentContainerClassName="gap-2 px-6 py-1"
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Chip label={item.label} icon={item.icon} selected={item.id === selectedId} onPress={() => onSelect(item.id)} />
        )}
      />
      <LinearGradient
        colors={[`${fadeColor}00`, fadeColor]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        pointerEvents="none"
        className="absolute inset-y-0 right-0 w-12"
      />
    </View>
  );
}
