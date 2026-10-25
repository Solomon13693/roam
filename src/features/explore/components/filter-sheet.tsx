import { AppSheet, type AppSheetRef, Button, Chip, SegmentedControl, SettingsRow, Toggle, Typography } from '@/components'
import { type Ref, useState } from 'react'
import { Pressable, View } from 'react-native'
import { CATEGORIES } from '../categories'

export type Filters = {
    distanceKm: '1' | '5' | '10' | '25'
    categories: string[]
    openNow: boolean
    freeEntry: boolean
    sort: 'nearest' | 'popular' | 'newest'
}

export const DEFAULT_FILTERS: Filters = {
    distanceKm: '10',
    categories: ['nature', 'beaches'],
    openNow: true,
    freeEntry: false,
    sort: 'nearest',
}

const DISTANCES = [
    { value: '1', label: '1 km' },
    { value: '5', label: '5 km' },
    { value: '10', label: '10 km' },
    { value: '25', label: '25 km' },
] as const

const SORTS = [
    { value: 'nearest', label: 'Nearest' },
    { value: 'popular', label: 'Popular' },
    { value: 'newest', label: 'Newest' },
] as const

type FilterSheetProps = {
    ref?: Ref<AppSheetRef>
    resultCount: number
    onApply: (filters: Filters) => void
}

export function FilterSheet({ ref, resultCount, onApply }: FilterSheetProps) {

    const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)

    const update = <K extends keyof Filters>(key: K, value: Filters[K]) => setFilters((current) => ({ ...current, [key]: value }))

    const toggleCategory = (id: string) =>
        update('categories', filters.categories.includes(id) ? filters.categories.filter((c) => c !== id) : [...filters.categories, id])

    return (
        <AppSheet ref={ref}>
            <View className="gap-4.5">

                <View className="flex-row items-center justify-between">
                    <Typography className="text-[22px] font-semibold leading-7 tracking-[-0.44px]">Filters</Typography>
                    <Pressable onPress={() => setFilters(DEFAULT_FILTERS)} hitSlop={8} className="active:opacity-70">
                        <Typography className="font-semibold text-forest">Reset</Typography>
                    </Pressable>
                </View>

                <View className="gap-4.5">
                    <Typography className="font-semibold">Distance</Typography>
                    <SegmentedControl options={[...DISTANCES]} value={filters.distanceKm} onChange={(value) => update('distanceKm', value)} />
                </View>

                <View className="gap-4.5">
                    <Typography className="font-semibold">Categories</Typography>
                    <View className="flex-row flex-wrap gap-2">
                        {CATEGORIES.filter((c) => c.id !== 'all').map((category) => (
                            <Chip
                                key={category.id}
                                label={category.label}
                                icon={category.icon}
                                selected={filters.categories.includes(category.id)}
                                onPress={() => toggleCategory(category.id)}
                            />
                        ))}
                    </View>
                </View>

                <View className="rounded-[22px] bg-white px-4">
                    <SettingsRow
                        icon="clock"
                        label="Open now"
                        supporting="Hide places that are closed"
                        trailing={<Toggle checked={filters.openNow} onValueChange={(value) => update('openNow', value)} accessibilityLabel="Open now" />}
                    />
                    <View className="h-px bg-line" />
                    <SettingsRow
                        icon="ticket"
                        label="Free entry"
                        supporting="Only places with no ticket"
                        trailing={<Toggle checked={filters.freeEntry} onValueChange={(value) => update('freeEntry', value)} accessibilityLabel="Free entry" />}
                    />
                </View>

                <View className="gap-4.5">
                    <Typography className="font-semibold">Sort by</Typography>
                    <View className="flex-row gap-2">
                        {SORTS.map((sort) => (
                            <Chip key={sort.value} label={sort.label} selected={filters.sort === sort.value} onPress={() => update('sort', sort.value)} />
                        ))}
                    </View>
                </View>

                <Button fullWidth onPress={() => onApply(filters)}>
                    {`Show ${resultCount} places`}
                </Button>

            </View>

        </AppSheet>
    )
}
