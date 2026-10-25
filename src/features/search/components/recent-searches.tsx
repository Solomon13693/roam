import { Icon, Typography } from '@/components'
import { Pressable, View } from 'react-native'

type RecentSearchesProps = {
    items: string[]
    onSelect: (query: string) => void
}

export function RecentSearches({ items, onSelect }: RecentSearchesProps) {
    return (
        <View>
            <Typography className="mb-1.5 text-sm font-medium leading-4 text-ink-muted">Recent</Typography>
            {items.map((query) => (
                <Pressable key={query} onPress={() => onSelect(query)} accessibilityRole="button" className="flex-row items-center gap-3 py-2.5 active:opacity-60">
                    <Icon name="history" size={18} color="ink-muted" />
                    <Typography className="flex-1">{query}</Typography>
                    <Icon name="arrow-up-right" size={16} color="ink-muted" />
                </Pressable>
            ))}
        </View>
    )
}
