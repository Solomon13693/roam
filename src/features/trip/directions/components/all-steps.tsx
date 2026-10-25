import { AppSheet, AppSheetRef, Icon, IconButton, Typography } from '@/components'
import { BottomSheetFlatList } from '@gorhom/bottom-sheet'
import { colors } from '@/constants/colors'
import { RouteStep } from '@/service'
import { formatArrival, formatMeters as formatDistance, formatMinutes, stepIcon, stepText } from '../navigation'
import { Ref } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type SheetProps = {
    ref?: Ref<AppSheetRef>
    onClose: () => void
    steps: RouteStep[]
    activeIndex?: number
    loading?: boolean
}

const AllSteps = ({ ref, onClose, steps, activeIndex = 0, loading }: SheetProps) => {
    
    const inset = useSafeAreaInsets()
    const totalDistance = steps.reduce((total, step) => total + step.distance, 0)
    const totalDuration = steps.reduce((total, step) => total + step.duration, 0)

    return (
        <AppSheet ref={ref} scrollable snapPoints={['100%']}>
            <BottomSheetFlatList
                data={loading ? [] : steps}
                keyExtractor={(_, index) => String(index)}
                showsVerticalScrollIndicator={false}
                stickyHeaderIndices={[0]}
                contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: inset.bottom }}
                ListHeaderComponent={
                    <View className="bg-paper pb-6 pt-2">
                        <View className="flex-row justify-between items-center mb-4">
                            <Typography className="text-ink font-semibold text-[22px]">All steps</Typography>

                            <IconButton className="shadow-none bg-sage-soft" icon="x" accessibilityLabel="close" onPress={onClose} />
                        </View>

                        {loading ? null : (
                            <Typography className="text-ink-muted text-[13px]">
                                {formatMinutes(totalDuration)} · {formatDistance(totalDistance)} · Arrive {formatArrival(totalDuration)}
                            </Typography>
                        )}
                    </View>
                }
                ListEmptyComponent={
                    loading ? (
                        <View className="items-center gap-y-3 py-10">
                            <ActivityIndicator color={colors.forest} />
                            <Typography className="text-ink-muted text-[13px]">Finding the best route…</Typography>
                        </View>
                    ) : undefined
                }
                renderItem={({ item: step, index }) => {
                    const pass = index < activeIndex
                    const isActive = index === activeIndex
                    const containerStyle = isActive ? 'bg-sage-soft' : 'bg-transparent'
                    const textStyle = pass ? 'text-ink-muted' : isActive ? 'text-ink font-semibold' : 'text-ink'
                    const iconColor: 'ink' | 'ink-muted' = pass ? 'ink-muted' : 'ink'

                    return (
                        <View className={`flex-row items-center justify-between gap-3 p-3 ${containerStyle} rounded-[16px]`}>
                            <View className="flex-row items-center gap-3.5 flex-1 pr-4">
                                <View className="items-center justify-center bg-white size-[36px] rounded-[12px]">
                                    <Icon name={stepIcon(step)} size={20} color={iconColor} />
                                </View>

                                <Typography className={`${textStyle} text-[15px] flex-shrink`}>{stepText(step)}</Typography>
                            </View>

                            {step.distance > 0 && <Typography className="text-ink-muted text-[13px]">{formatDistance(step.distance)}</Typography>}
                        </View>
                    )
                }}
            />
        </AppSheet>
    )
}

export default AllSteps
