import { AppSheet, type AppSheetRef, Button, Chip, IconButton, SegmentedControl, TextArea, Typography } from '@/components'
import type { Place } from '@/types/place'
import { type Ref, useImperativeHandle, useRef, useState } from 'react'
import { ScrollView, View } from 'react-native'
import { STAY_OPTIONS, type TripStop, arrivalOptions, formatTime } from '../trip-basics'

const NOTE_LIMIT = 140

export type StopEditorRef = {
    add: (place: Place, suggested: number, hint?: string) => void
    edit: (stop: TripStop) => void
}

type StopEditorSheetProps = {
    ref?: Ref<StopEditorRef>
    onSave: (stop: TripStop) => void
    onRemove: (stop: TripStop) => void
}

type Mode = { kind: 'add'; hint?: string } | { kind: 'edit' }

export function StopEditorSheet({ ref, onSave, onRemove }: StopEditorSheetProps) {
    const sheet = useRef<AppSheetRef>(null)
    const [mode, setMode] = useState<Mode>({ kind: 'add' })
    const [draft, setDraft] = useState<TripStop | null>(null)
    const [times, setTimes] = useState<number[]>([])

    useImperativeHandle(ref, () => ({
        add: (place, suggested, hint) => {
            setMode({ kind: 'add', hint })
            setDraft({ place, arriveAt: suggested, stayMinutes: 60, note: '' })
            setTimes(arrivalOptions(suggested))
            sheet.current?.open()
        },
        edit: (stop) => {
            setMode({ kind: 'edit' })
            setDraft(stop)
            setTimes(arrivalOptions(stop.arriveAt))
            sheet.current?.open()
        },
    }))

    const close = () => sheet.current?.close()

    return (
        <AppSheet ref={sheet}>
            {draft ? (
                <View className="gap-5">
                    <View className="flex-row items-center justify-between gap-3">
                        <Typography numberOfLines={1} className="flex-1 text-[22px] font-medium leading-7 tracking-[-0.44px]">
                            {mode.kind === 'add' ? `Add ${draft.place.name}` : draft.place.name}
                        </Typography>
                        <IconButton icon="x" accessibilityLabel="Close" onPress={close} className="bg-sand-soft shadow-none" />
                    </View>

                    <View className="gap-2.5">
                        <Typography className="text-[13px] text-ink-muted">
                            Arrive at{mode.kind === 'add' && mode.hint ? ` · ${mode.hint}` : ''}
                        </Typography>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 grow-0" contentContainerClassName="gap-2 px-6 py-1">
                            {times.map((minutes) => (
                                <Chip
                                    key={minutes}
                                    label={formatTime(minutes)}
                                    selected={draft.arriveAt === minutes}
                                    onPress={() => setDraft({ ...draft, arriveAt: minutes })}
                                />
                            ))}
                        </ScrollView>
                    </View>

                    <View className="gap-2.5">
                        <Typography className="text-[13px] text-ink-muted">Stay for</Typography>
                        <SegmentedControl
                            options={[...STAY_OPTIONS]}
                            value={String(draft.stayMinutes) as (typeof STAY_OPTIONS)[number]['value']}
                            onChange={(value) => setDraft({ ...draft, stayMinutes: Number(value) })}
                        />
                    </View>

                    <View className="gap-2.5">
                        <Typography className="text-[13px] text-ink-muted">Note</Typography>
                        <TextArea
                            name="note"
                            value={draft.note}
                            onChangeText={(note) => setDraft({ ...draft, note: note.slice(0, NOTE_LIMIT) })}
                            maxLength={NOTE_LIMIT}
                            placeholder="Anything to remember for this stop?"
                            numberOfLines={3}
                            formGroupClass="mb-0"
                            className="min-h-22 border-0"
                        />
                        <Typography className="-mt-1 self-end text-xs text-ink-muted">
                            {draft.note.length} / {NOTE_LIMIT}
                            {mode.kind === 'add' ? ' · optional' : ''}
                        </Typography>
                    </View>

                    {mode.kind === 'add' ? (
                        <Button
                            fullWidth
                            onPress={() => {
                                onSave(draft)
                                close()
                            }}>
                            Add to trip
                        </Button>
                    ) : (
                        <View className="flex-row gap-2.5">
                            <Button
                                variant="outline"
                                textClassName="text-danger"
                                onPress={() => {
                                    onRemove(draft)
                                    close()
                                }}>
                                Remove
                            </Button>
                            <Button
                                className="flex-1"
                                onPress={() => {
                                    onSave(draft)
                                    close()
                                }}>
                                Save stop
                            </Button>
                        </View>
                    )}
                </View>
            ) : null}
        </AppSheet>
    )
}
