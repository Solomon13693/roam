import { ALL_PLACES, POPULAR_NEARBY } from '@/data/places'
import { useMemo, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { MoodGrid, PopularNearby, RecentSearches, SearchHeader, SearchResult } from './components'
import { MOODS, RECENT_SEARCHES } from './data'

const SearchView = () => {
    const [query, setQuery] = useState('')
    const search = query.trim().toLowerCase()

    const results = useMemo(
        () =>
            ALL_PLACES.filter((place) => [place.name, place.category, place.area].some((text) => text.toLowerCase().includes(search))).sort(
                (a, b) => a.distanceKm - b.distanceKm,
            ),
        [search],
    )

    return (
        <View className="flex-1 bg-paper pt-safe">
            <View className="mt-2">
                <SearchHeader value={query} onChangeText={setQuery} />
            </View>

            {search.length > 0 ? (
                <SearchResult places={results} query={query.trim()} />
            ) : (
                <ScrollView
                    className="flex-1"
                    contentContainerClassName="px-6 pt-6 pb-10"
                    keyboardShouldPersistTaps="handled"
                    keyboardDismissMode="on-drag"
                    showsVerticalScrollIndicator={false}>
                        
                    <RecentSearches items={RECENT_SEARCHES} onSelect={setQuery} />

                    <MoodGrid moods={MOODS} onSelect={(mood) => setQuery(mood.label)} />

                    <PopularNearby places={POPULAR_NEARBY} />

                </ScrollView>
            )}
        </View>
    )
}

export default SearchView
