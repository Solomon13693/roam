import { type AppSheetRef, Button, Icon, Typography } from '@/components'
import { SAVED_PLACES } from '@/data/places'
import type { Place } from '@/types/place'
import { useRef } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { AddStopSheet, type StopEditorRef, StopEditorSheet, StopRow } from '../components'
import { formatShort } from '../components/dates'
import { METHODS, TIMES, type TripBasics, type TripStop, suggestedArrival } from '../trip-basics'

type StopsStepProps = {
    basics: TripBasics
    stops: TripStop[]
    onChangeStops: (stops: TripStop[]) => void
    onEditBasics: () => void
    onSave: () => void
}

export function StopsStep({ basics, stops, onChangeStops, onEditBasics, onSave }: StopsStepProps) {
    const addSheet = useRef<AppSheetRef>(null)
    const editor = useRef<StopEditorRef>(null)

    const time = TIMES.find((item) => item.value === basics.time)?.label
    const mode = METHODS.find((item) => item.value === basics.mode)?.label.toLowerCase()
    const addedIds = stops.map((stop) => stop.place.id)
    const suggestions = SAVED_PLACES.filter((place) => !addedIds.includes(place.id))

    const startAdding = (place: Place) => {
        const previous = stops[stops.length - 1]
        addSheet.current?.close()
        editor.current?.add(place, suggestedArrival(basics, stops), previous ? `suggested after ${previous.place.name}` : undefined)
    }

    const save = (stop: TripStop) => {
        const exists = stops.some((item) => item.place.id === stop.place.id)
        const next = exists ? stops.map((item) => (item.place.id === stop.place.id ? stop : item)) : [...stops, stop]
        onChangeStops([...next].sort((a, b) => a.arriveAt - b.arriveAt))
    }

    const remove = (stop: TripStop) => onChangeStops(stops.filter((item) => item.place.id !== stop.place.id))

    return (
        <>
            <ScrollView className="flex-1" contentContainerClassName="gap-6 pb-6" showsVerticalScrollIndicator={false}>
                <View className="flex-row items-center gap-3 rounded-[22px] bg-white p-4.5 shadow-[0_4px_14px_0px_#1217140D]">
                    <View className="flex-1 gap-0.5">
                        <Typography className="font-semibold">{basics.name}</Typography>
                        <Typography className="text-[13px] text-ink-muted">
                            {formatShort(basics.date)} · from {time} · by {mode}
                        </Typography>
                    </View>
                    <Pressable onPress={onEditBasics} className="rounded-full bg-sage-soft px-3.5 py-1.5 active:opacity-70">
                        <Typography className="text-[13px] font-semibold text-forest">Edit</Typography>
                    </Pressable>
                </View>

                {stops.length === 0 ? (
                    <View className="items-center gap-2 rounded-[22px] bg-white px-6 py-7 shadow-[0_4px_14px_0px_#1217140D]">
                        <View className="size-14 items-center justify-center rounded-full bg-sage-soft">
                            <Icon name="map-pin" size={22} color="forest" />
                        </View>
                        <Typography className="mt-1 text-[17px] font-semibold">No stops yet</Typography>
                        <Typography className="text-center text-[13px] text-ink-muted">
                            Add the places you want to visit — we’ll put them in order and plan the route.
                        </Typography>
                        <Button icon="plus" className="mt-3 self-stretch" onPress={() => addSheet.current?.open()}>
                            Add your first stop
                        </Button>
                    </View>
                ) : (
                    <View className="gap-3">
                        <View className="flex-row items-baseline justify-between">
                            <Typography className="text-[19px] font-medium">Stops</Typography>
                            <Typography className="text-xs text-ink-muted">Tap a stop to edit</Typography>
                        </View>
                        {stops.map((stop, index) => (
                            <StopRow key={stop.place.id} stop={stop} index={index} onPress={() => editor.current?.edit(stop)} />
                        ))}
                        <Pressable
                            onPress={() => addSheet.current?.open()}
                            accessibilityRole="button"
                            className="h-14 flex-row items-center justify-center gap-2 rounded-[22px] border-[1.5px] border-dashed border-sage active:opacity-70">
                            <Icon name="plus" size={16} color="forest" />
                            <Typography className="font-semibold text-forest">Add a place</Typography>
                        </Pressable>
                    </View>
                )}

                {stops.length === 0 && suggestions.length > 0 ? (
                    <View className="gap-3">
                        <Typography className="font-semibold">Quick add from your saved</Typography>
                        <View className="flex-row flex-wrap gap-2">
                            {suggestions.map((place) => (
                                <Pressable
                                    key={place.id}
                                    onPress={() => startAdding(place)}
                                    className="flex-row items-center gap-1.5 rounded-full bg-white px-3.5 py-2.5 active:opacity-70">
                                    <Icon name="plus" size={14} color="forest" />
                                    <Typography className="text-[13px] font-medium">{place.name}</Typography>
                                </Pressable>
                            ))}
                        </View>
                    </View>
                ) : null}
            </ScrollView>

            <View className="pb-safe">
                <Button fullWidth disabled={stops.length === 0} onPress={onSave}>
                    {stops.length === 0 ? 'Add a stop to save trip' : 'Save trip'}
                </Button>
            </View>

            <AddStopSheet ref={addSheet} addedIds={addedIds} onPick={startAdding} />
            
            <StopEditorSheet ref={editor} onSave={save} onRemove={remove} />

        </>
    )
}
