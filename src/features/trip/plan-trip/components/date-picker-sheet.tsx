import { AppSheet, type AppSheetRef, Button, Chip, IconButton, Typography } from '@/components'
import { cn } from '@/lib'
import { type Ref, useImperativeHandle, useRef, useState } from 'react'
import { Pressable, ScrollView, View } from 'react-native'
import { addDays, addMonths, formatMonth, formatShort, monthCells, nextWeekday, sameDay, startOfDay, startOfMonth } from './dates'

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

type DatePickerSheetProps = {
    ref?: Ref<AppSheetRef>
    value: Date
    onSelect: (date: Date) => void
}

export function DatePickerSheet({ ref, value, onSelect }: DatePickerSheetProps) {
    const sheet = useRef<AppSheetRef>(null)
    const today = startOfDay(new Date())

    const [draft, setDraft] = useState(value)
    const [month, setMonth] = useState(startOfMonth(value))

    useImperativeHandle(ref, () => ({
        open: () => {
            setDraft(value)
            setMonth(startOfMonth(value))
            sheet.current?.open()
        },
        close: () => sheet.current?.close(),
        snapTo: (index: number) => sheet.current?.snapTo(index),
    }))

    const shortcuts = [
        { label: 'This Saturday', date: nextWeekday(today, 6) },
        { label: 'This Sunday', date: nextWeekday(today, 0) },
        { label: 'Next weekend', date: addDays(nextWeekday(today, 6), 7) },
    ]

    const pick = (date: Date) => {
        setDraft(date)
        setMonth(startOfMonth(date))
    }

    const canGoBack = month > startOfMonth(today)

    return (
        <AppSheet ref={sheet}>
            <View className="flex-row items-center justify-between">
                <Typography className="text-[26px] font-medium leading-8 tracking-[-0.52px]">Pick a date</Typography>
                <IconButton icon="x" accessibilityLabel="Close" onPress={() => sheet.current?.close()} className="bg-sand-soft shadow-none" />
            </View>

            <View className="mt-5 flex-row items-center justify-between">
                <IconButton
                    icon="chevron-left"
                    accessibilityLabel="Previous month"
                    disabled={!canGoBack}
                    onPress={() => setMonth(addMonths(month, -1))}
                    className={cn(!canGoBack && 'opacity-30')}
                />
                <Typography className="text-[17px] font-semibold">{formatMonth(month)}</Typography>
                <IconButton icon="chevron-right" accessibilityLabel="Next month" onPress={() => setMonth(addMonths(month, 1))} />
            </View>

            <View className="mt-5 flex-row">
                {WEEKDAYS.map((day) => (
                    <Typography key={day} className="flex-1 text-center text-[13px] text-ink-muted">
                        {day}
                    </Typography>
                ))}
            </View>

            <View className="mt-3 flex-row flex-wrap">
                {monthCells(month).map((date, index) => {
                    if (!date) return <View key={`blank-${index}`} className="h-14.5 w-[14.2857%]" />

                    const past = date < today
                    const selected = sameDay(date, draft)
                    const isToday = sameDay(date, today)
                    const weekend = date.getDay() === 0 || date.getDay() === 6

                    return (
                        <View key={date.toISOString()} className="h-14.5 w-[14.2857%] items-center justify-center">
                            <Pressable
                                disabled={past}
                                onPress={() => setDraft(date)}
                                accessibilityRole="button"
                                accessibilityState={{ selected, disabled: past }}
                                accessibilityLabel={formatShort(date)}
                                className={cn(
                                    'size-12 items-center justify-center rounded-full border-[1.5px]',
                                    selected
                                        ? 'border-forest bg-forest'
                                        : isToday
                                          ? 'border-forest'
                                          : weekend && !past
                                            ? 'border-transparent bg-sage-soft'
                                            : 'border-transparent',
                                )}>
                                <Typography
                                    className={cn(
                                        'text-base',
                                        selected ? 'font-semibold text-white' : past ? 'text-ink-muted' : weekend ? 'font-semibold' : '',
                                    )}>
                                    {date.getDate()}
                                </Typography>
                            </Pressable>
                        </View>
                    )
                })}
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="-mx-6 mt-5 grow-0" contentContainerClassName="gap-2 px-6 py-1">
                {shortcuts.map((shortcut) => (
                    <Chip key={shortcut.label} label={shortcut.label} selected={sameDay(shortcut.date, draft)} onPress={() => pick(shortcut.date)} />
                ))}
            </ScrollView>

            <Button
                fullWidth
                className="mt-5"
                onPress={() => {
                    onSelect(draft)
                    sheet.current?.close()
                }}>
                {`Set date · ${formatShort(draft)}`}
            </Button>
        </AppSheet>
    )
}
