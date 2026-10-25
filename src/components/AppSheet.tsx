import { BottomSheetBackdrop, type BottomSheetBackdropProps, BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { type ReactNode, type Ref, useImperativeHandle, useRef } from 'react'
import { useWindowDimensions } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { colors } from '@/constants/colors'
import { Typography } from './ui'

export type AppSheetRef = {
    open: () => void
    close: () => void
    snapTo: (index: number) => void
}

type AppSheetProps = {
    ref?: Ref<AppSheetRef>
    title?: string
    snapPoints?: (number | `${number}%`)[]
    children: ReactNode
    onClose?: () => void
    scrollable?: boolean
}

const Backdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.45} pressBehavior="close" />
)

export function AppSheet({ ref, title, snapPoints, children, onClose, scrollable }: AppSheetProps) {
    const sheetRef = useRef<BottomSheetModal>(null)
    const insets = useSafeAreaInsets()
    const { height } = useWindowDimensions()
    const sheetSnapPoints = snapPoints ?? (scrollable ? ['75%'] : undefined)
    const padding = {
        paddingHorizontal: 24,
        paddingTop: 8,
        paddingBottom: Math.max(insets.bottom, 16) + 8,
    }

    useImperativeHandle(ref, () => ({
        open: () => sheetRef.current?.present(),
        close: () => sheetRef.current?.dismiss(),
        snapTo: (index: number) => sheetRef.current?.snapToIndex(index),
    }))

    return (
        <BottomSheetModal
            ref={sheetRef}
            snapPoints={sheetSnapPoints}
            enableDynamicSizing={!sheetSnapPoints}
            enablePanDownToClose
            topInset={insets.top}
            maxDynamicContentSize={height * 0.75}
            backdropComponent={Backdrop}
            onDismiss={onClose}
            backgroundStyle={{
                backgroundColor: colors.paper,
                borderTopLeftRadius: 32,
                borderTopRightRadius: 32,
            }}
            handleIndicatorStyle={{
                backgroundColor: colors.line,
                width: 40,
                height: 4,
            }}
        >
            {scrollable ? (
                children
            ) : (
                <BottomSheetView style={padding}>
                    {title ? <Typography className="mb-4.5 text-[22px] font-semibold leading-7 tracking-[-0.44px]">{title}</Typography> : null}
                    {children}
                </BottomSheetView>
            )}
        </BottomSheetModal>
    )
}
