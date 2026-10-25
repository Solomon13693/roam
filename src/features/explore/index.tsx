import { type AppSheetRef, ChipList, UserHeader, LinearGradient, SearchField } from '@/components'
import { PLACES } from '@/data/places'
import { router } from 'expo-router'
import { useCallback, useRef, useState } from 'react'
import { RefreshControl, ScrollView, View } from 'react-native'
import { CATEGORIES } from './categories'
import { FilterSheet, Greeting, NearYou, WeekendPick } from './components'
import { colors } from '@/constants/colors'

const ExploreView = () => {
    const filterSheet = useRef<AppSheetRef>(null)
    const [category, setCategory] = useState('all')
    const [weekendPick, ...nearby] = PLACES

    const [refreshing, setRefreshing] = useState(false)

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        setTimeout(() => {
            setRefreshing(false)
        }, 2000)
    }, [])

    return (
        <View className="flex-1 bg-paper">
            <LinearGradient colors={['#DBEDE0', '#F7F8F6']} className="absolute inset-x-0 top-0 h-[400px]" />

            <View className="px-6 pt-safe">
                <UserHeader
                    name="Tolu Adebayo"
                    subtitle="Lekki Phase 1, Lagos"
                    actionIcon="camera"
                    actionLabel="Add a moment"
                    onActionPress={() => router.push('/notes')}
                />
                <Greeting firstName="Tolu" />

                <View className="mt-4.5">
                    <SearchField
                        readOnly
                        onPress={() => router.push('/search')}
                        placeholder="Search beaches, parks, cafés…"
                        onFilterPress={() => filterSheet.current?.open()}
                    />
                </View>

                <ChipList items={CATEGORIES} selectedId={category} onSelect={setCategory} className="mt-4.5" />
            </View>

            <ScrollView className="flex-1 mt-3" contentContainerClassName="px-6 pb-36" showsVerticalScrollIndicator={false}
             refreshControl={<RefreshControl title='Pull down to refresh'
                refreshing={refreshing} titleColor={colors.forest} onRefresh={onRefresh}
                tintColor={colors.forest} />}>
                <WeekendPick place={weekendPick} />

                <NearYou places={nearby} />
            </ScrollView>

            <FilterSheet
                ref={filterSheet}
                resultCount={24}
                onApply={() => {
                    filterSheet.current?.close()
                }}
            />
        </View>
    )
}

export default ExploreView
