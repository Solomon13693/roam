import { Button } from '@/components'
import { View } from 'react-native'

type TripActionBarProps = { onEdit: () => void; onNavigate: () => void }

export function TripActionBar({ onEdit, onNavigate }: TripActionBarProps) {
    return (
        <View className="absolute inset-x-0 bottom-0 flex-row gap-2.5 bg-white px-6 pb-safe pt-3.5 shadow-[0_-4px_20px_rgba(18,20,19,0.06)]">
            <Button variant="outline" icon="edit" onPress={onEdit}>
                Edit trip
            </Button>
            <Button icon="navigation" onPress={onNavigate} className="flex-1">
                Start navigation
            </Button>
        </View>
    )
}
