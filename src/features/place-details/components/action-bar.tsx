import { Button } from '@/components'
import { View } from 'react-native'

type ActionBarProps = { onDirections: () => void; onPlanVisit: () => void }

export function ActionBar({ onDirections, onPlanVisit }: ActionBarProps) {
    return (
        <View className="absolute inset-x-0 bottom-0 flex-row gap-2.5 px-6 bg-white pb-safe pt-4">
            <Button variant="secondary" icon="navigation" onPress={onDirections}>
                Directions
            </Button>
            <Button icon="calendar" onPress={onPlanVisit} className="flex-1">
                Plan a visit
            </Button>
        </View>
    )
}
