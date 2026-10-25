import { Button, ChipList, EmptyState, IconButton, LinearGradient, Typography } from '@/components'
import { FIELD_NOTES } from '@/data/fields-note'
import { router } from 'expo-router'
import { useState } from 'react'
import { FlatList, View } from 'react-native'
import { NoteEntry } from './components/note-entry'

const FILTERS = [
    { id: 'all', label: 'All', icon: 'leaf' as const },
    { id: 'october', label: 'October', icon: 'leaf' as const },
    { id: 'beaches', label: 'Beaches', icon: 'leaf' as const },
    { id: 'nature', label: 'Nature', icon: 'leaf' as const },
]

export default function FieldNotesView() {

    const [filter, setFilter] = useState('all')

    const notes = FIELD_NOTES.filter((note) => filter === 'all' || note.month === filter || note.category === filter)
    const placeCount = new Set(FIELD_NOTES.map((note) => note.placeId)).size
    const momentCount = FIELD_NOTES.reduce((total, note) => total + note.photos.length, 0)

    return (
        <View className="flex-1 bg-paper">

            <LinearGradient colors={['#DBEDE0', '#F7F8F6']} className="absolute inset-x-0 top-0 h-[260px]" />

            <View className="flex-row items-center justify-between px-6 pt-safe">
                <IconButton accessibilityLabel="Back" icon="chevron-left" className="size-11" onPress={() => router.back()} />
                <IconButton accessibilityLabel="Add a photo" icon="camera" iconColor="white" className="size-11 bg-forest shadow-none" onPress={() => router.push('/camera')} />
            </View>

            <FlatList
                data={notes}
                keyExtractor={(note) => note.id}
                showsVerticalScrollIndicator={false}
                contentContainerClassName="px-6 pt-5 pb-[130px]"
                ListHeaderComponent={
                    <View className="mb-[22px]">
                        <Typography className="text-[32px] font-medium leading-[38px] tracking-[-0.96px]">Your field notes</Typography>
                        <Typography className="mt-1 text-ink-muted">
                            {momentCount} moments from {placeCount} places
                        </Typography>
                        <ChipList items={FILTERS} selectedId={filter} onSelect={setFilter} className="mt-4" />
                    </View>
                }
                renderItem={({ item }) => <NoteEntry note={item} />}
                ListEmptyComponent={<EmptyState icon="camera" title="No moments yet" description="Nothing matches this filter." />}
            />

            <View pointerEvents="box-none" className="pb-safe">
                <Button icon="plus" className="mb-2 self-center shadow-[0_10px_24px_rgba(18,20,19,0.22)]" onPress={() => router.push('/camera')}>
                    Add a moment
                </Button>
            </View>

        </View>
    )
}
