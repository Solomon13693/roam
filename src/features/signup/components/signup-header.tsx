import { IconButton, StepProgress, Typography } from '@/components'
import { View } from 'react-native'

type SignupHeaderProps = { step: number; total: number; onBack: () => void }

export function SignupHeader({ step, total, onBack }: SignupHeaderProps) {
    return (
        <View className="flex-row items-center gap-4 px-6">

            <IconButton icon="chevron-left"accessibilityLabel="Back" onPress={onBack} />

            <StepProgress current={step - 1} total={total} className="flex-1" barClassName="h-2 rounded-[3px]" />

            <Typography className="text-[13px] leading-[18px] text-ink-muted">
                {step} of {total}
            </Typography>

        </View>
    )
}
