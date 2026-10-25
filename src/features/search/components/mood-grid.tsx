import { Icon, Typography } from '@/components'
import { cn } from '@/lib'
import { Pressable, View } from 'react-native'
import type { Mood } from '../data'

type MoodGridProps = {
    moods: Mood[]
    onSelect: (mood: Mood) => void
}

export function MoodGrid({ moods, onSelect }: MoodGridProps) {
    return (
        <View className="mt-5.5">
            <Typography className="mb-2.5 text-sm font-medium leading-4 text-ink-muted">Browse by mood</Typography>
            <View className="flex-row flex-wrap gap-2.5">
                {moods.map((mood, index) => (
                    <Pressable
                        key={mood.id}
                        onPress={() => onSelect(mood)}
                        accessibilityRole="button"
                        accessibilityLabel={`${mood.label}, ${mood.count} places`}
                        className={cn(
                            'w-[48.5%] flex-row items-center gap-3 rounded-[14px] p-3.5 active:opacity-50',
                            index === 0 || index === 3 ? 'bg-sage-soft' : 'bg-sand-soft',
                        )}>
                        <Icon name={mood.icon} size={22} color="forest" />
                        <View>
                            <Typography className="font-semibold">{mood.label}</Typography>
                            <Typography className="text-xs font-medium leading-4 text-ink-muted">{mood.count} places</Typography>
                        </View>
                    </Pressable>
                ))}
            </View>
        </View>
    )
}
