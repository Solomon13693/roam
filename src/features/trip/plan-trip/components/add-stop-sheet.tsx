import { AppSheet, type AppSheetRef, Button, Icon, IconButton, Image, SearchField, Typography } from '@/components'
import { ALL_PLACES, SAVED_PLACES } from '@/data/places'
import { cn, formatDistance } from '@/lib'
import type { Place } from '@/types/place'
import { type Ref, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { Pressable, View } from 'react-native'

type AddStopSheetProps = {
    ref?: Ref<AppSheetRef>
    addedIds: string[]
    onPick: (place: Place) => void
}

export function AddStopSheet({ ref, addedIds, onPick }: AddStopSheetProps) {
    const sheet = useRef<AppSheetRef>(null)
    const [query, setQuery] = useState('')

    useImperativeHandle(ref, () => ({
        open: () => {
            setQuery('')
            sheet.current?.open()
        },
        close: () => sheet.current?.close(),
        snapTo: (index: number) => sheet.current?.snapTo(index),
    }))

    const search = query.trim().toLowerCase()
    const places = useMemo(
        () =>
            search
                ? ALL_PLACES.filter((place) => [place.name, place.category, place.area].some((text) => text.toLowerCase().includes(search)))
                : SAVED_PLACES,
        [search],
    )

    return (
        <AppSheet ref={sheet}>
            <View className="gap-4">
                <View className="flex-row items-center justify-between">
                    <Typography className="text-[22px] font-medium leading-7 tracking-[-0.44px]">Add a stop</Typography>
                    <IconButton icon="x" accessibilityLabel="Close" onPress={() => sheet.current?.close()} className="bg-sand-soft shadow-none" />
                </View>

                <SearchField value={query} onChangeText={setQuery} placeholder="Search places to add" />

                <Typography className="text-[13px] text-ink-muted">
                    {search ? `${places.length} places` : 'From your saved · tap + to set time and stay'}
                </Typography>

                <View className="gap-3">
                    {places.slice(0, 6).map((place) => {
                        const added = addedIds.includes(place.id)
                        return (
                            <View key={place.id} className="flex-row items-center gap-3">
                                <Image source={place.photo} contentFit="cover" className="size-15 rounded-2xl" />
                                <View className="flex-1">
                                    <Typography className="text-xs font-medium leading-4 text-forest">{place.category}</Typography>
                                    <Typography numberOfLines={1} className="font-semibold">
                                        {place.name}
                                    </Typography>
                                    <Typography className="text-[13px] text-ink-muted">
                                        {place.area} · {formatDistance(place.distanceKm)}
                                    </Typography>
                                </View>
                                <Pressable
                                    onPress={() => onPick(place)}
                                    disabled={added}
                                    accessibilityRole="button"
                                    accessibilityLabel={added ? `${place.name} added` : `Add ${place.name}`}
                                    className={cn('size-10 items-center justify-center rounded-full', added ? 'bg-forest' : 'bg-sand-soft')}>
                                    <Icon name={added ? 'check' : 'plus'} size={18} color={added ? 'white' : 'ink'} />
                                </Pressable>
                            </View>
                        )
                    })}
                </View>

                <Button fullWidth onPress={() => sheet.current?.close()}>
                    Done
                </Button>
            </View>
        </AppSheet>
    )
}
