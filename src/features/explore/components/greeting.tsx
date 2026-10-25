import { Typography } from '@/components'
import { View } from 'react-native'

const partOfDay = (hour: number) => (hour < 12 ? 'morning' : hour < 17 ? 'afternoon' : 'evening')

export function Greeting({ firstName }: { firstName: string }) {
    return (
        <View className="mt-5.5 gap-y-0.5">
            <Typography className="text-[15px] text-ink-muted">
                Good {partOfDay(new Date().getHours())}, {firstName}
            </Typography>
            <Typography className="text-[34px]">Where to today?</Typography>
        </View>
    )
}
