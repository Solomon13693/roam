import { View } from 'react-native'
import { AppModal, Button, Typography } from '@/components'

type EndTripProps = {
    open: boolean
    setOpen: () => void
    onEnd: () => void
    remaining?: string
    placeName?: string
}

const EndTrip = ({ open, setOpen, onEnd, remaining, placeName }: EndTripProps) => {
    return (
        <AppModal visible={open} onClose={setOpen}>

            <View className="items-center justify-center gap-y-1.5 mb-6">
                <Typography className="font-semibold text-[17px] text-ink">End directions?</Typography>
                <Typography className="text-ink-muted text-[13px]">{remaining && placeName ? `You’re ${remaining} from ${placeName}.` : 'You can start again any time.'}</Typography>
            </View>

            <View className="gap-y-2">
                <Button
                    className="w-full"
                    onPress={() => {
                        setOpen()
                        onEnd()
                    }}>
                    End
                </Button>
                <Button onPress={setOpen} variant="secondary" className="w-full">
                    Keep going
                </Button>
            </View>

        </AppModal>
    )
}

export default EndTrip
