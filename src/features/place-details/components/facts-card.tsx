import { InfoTile } from '@/components'
import { View } from 'react-native'

type FactsCardProps = { hours: string; planFor: string; entry: string }

export function FactsCard({ hours, planFor, entry }: FactsCardProps) {
    return (
        <View className="mt-5 flex-row gap-4 rounded-[22px] bg-white px-4.5 py-4 shadow-[0_4px_16px_rgba(18,20,19,0.05)]">
            <InfoTile icon="clock" label="Hours" value={hours} />
            <InfoTile icon="compass" label="Plan for" value={planFor} />
            <InfoTile icon="ticket" label="Entry" value={entry} />
        </View>
    )
}
