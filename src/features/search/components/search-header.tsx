import { IconButton, SearchField } from '@/components'
import { router } from 'expo-router'
import { View } from 'react-native'

type SearchHeaderProps = {
    value: string
    onChangeText: (text: string) => void
    onFilterPress?: () => void
}

export function SearchHeader({ value, onChangeText, onFilterPress }: SearchHeaderProps) {
    return (
        <View className="flex-row items-center gap-2.5 px-6">
            <IconButton icon="chevron-left" accessibilityLabel="Back" onPress={() => router.back()} />
            <View className="flex-1">
                <SearchField
                    value={value}
                    onChangeText={onChangeText}
                    placeholder="Search places, beaches, cafés…"
                    autoFocus
                    onFilterPress={onFilterPress}
                />
            </View>
        </View>
    )
}
