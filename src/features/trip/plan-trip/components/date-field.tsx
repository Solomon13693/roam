import { Icon, Label, Typography } from '@/components'
import { Pressable, View } from 'react-native'
import { formatLong } from './dates'

type DateFieldProps = {
    label: string
    date: Date
    onPress: () => void
}

export function DateField({ label, date, onPress }: DateFieldProps) {
    return (
        <View className="gap-1.5">
            <Label label={label} />
            <Pressable
                onPress={onPress}
                accessibilityRole="button"
                accessibilityLabel={`${label}, ${formatLong(date)}`}
                className="h-14 flex-row items-center gap-3 rounded-[22px] bg-white px-4.5 shadow-[0_4px_14px_0px_#1217140D] active:opacity-80">
                <Icon name="calendar" size={20} color="forest" />
                <Typography className="flex-1 text-base font-semibold">{formatLong(date)}</Typography>
                <Icon name="chevron-down" size={18} color="ink-muted" />
            </Pressable>
        </View>
    )
}
