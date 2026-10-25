import { IconButton, StepProgress, Typography } from '@/components'
import { useSteps } from '@/hooks'
import { router } from 'expo-router'
import { useState } from 'react'
import { View } from 'react-native'
import { BasicsStep, StopsStep } from './steps'
import { type TripStop, newTripBasics } from './trip-basics'

const STEPS = [
    { id: 'basics', label: 'Trip basics' },
    { id: 'stops', label: 'Add your stops' },
] as const
const STEP_IDS = STEPS.map((item) => item.id)

export const PlanTripView = () => {
    const { step, index, total, next, back, goTo } = useSteps(STEP_IDS, { onExit: () => router.back() })
    const [basics, setBasics] = useState(newTripBasics)
    const [stops, setStops] = useState<TripStop[]>([])


    const renderStep = () => {
        switch (step) {
            case 'basics':
                return <BasicsStep basics={basics} onChange={setBasics} onNext={next} />
            case 'stops':
                return (
                    <StopsStep
                        basics={basics}
                        stops={stops}
                        onChangeStops={setStops}
                        onEditBasics={() => goTo('basics')}
                        onSave={() => router.back()}
                    />
                )
            default: {
                const missing: never = step
                return missing
            }
        }
    }

    return (
        <View className="flex-1 bg-paper px-6 pt-safe">
            <View className="mb-6 flex-row items-center">
                <IconButton accessibilityLabel="Back" icon="chevron-left" onPress={back} />
                <Typography className="flex-1 pr-12 text-center text-base font-semibold">New trip</Typography>
            </View>

            <View className="mb-6.5 gap-y-2.5">
                <Typography className="text-[13px] font-semibold text-forest">
                    Step {index + 1} of {total} · {STEPS[index].label}
                </Typography>
                <StepProgress current={index} total={total} className="gap-2" />
            </View>

            {renderStep()}
        </View>
    )
}
