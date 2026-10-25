import { Button, Chip, Input, Label, Typography } from '@/components'
import { KeyboardAvoidingView, Platform, ScrollView, View } from 'react-native'
import { DatePicker } from '../components'
import { METHODS, TIMES, type TripBasics } from '../trip-basics'

type BasicsStepProps = {
    basics: TripBasics
    onChange: (basics: TripBasics) => void
    onNext: () => void
}

export function BasicsStep({ basics, onChange, onNext }: BasicsStepProps) {
    const update = <K extends keyof TripBasics>(key: K, value: TripBasics[K]) => onChange({ ...basics, [key]: value })

    return (
        <>
            <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
                    <View className="gap-y-5 pb-6">
                        <Input
                            className="border-0 font-medium shadow-[0_4px_14px_0px_#1217140D]"
                            name="title"
                            placeholder="Saturday in Lekki"
                            radius="xl"
                            label="Trip name"
                            formGroupClass="mb-0"
                            value={basics.name}
                            onChangeText={(name) => update('name', name)}
                        />

                        <DatePicker label="When" value={basics.date} onChange={(date) => update('date', date)} />

                        <View className="gap-1.5">
                            <Label label="Start time" />
                            <View className="flex-row flex-wrap gap-2">
                                {TIMES.map((item) => (
                                    <Chip
                                        key={item.value}
                                        className="shadow-none"
                                        label={item.label}
                                        selected={basics.time === item.value}
                                        onPress={() => update('time', item.value)}
                                    />
                                ))}
                            </View>
                        </View>

                        <View className="gap-1.5">
                            <Label label="Getting around" />
                            <View className="flex-row flex-wrap gap-2">
                                {METHODS.map((item) => (
                                    <Chip
                                        key={item.value}
                                        className="shadow-none"
                                        label={item.label}
                                        selected={basics.mode === item.value}
                                        onPress={() => update('mode', item.value)}
                                    />
                                ))}
                            </View>
                        </View>

                        <View className="rounded-[20px] bg-sage-soft p-5">
                            <Typography className="mb-1.5 text-sm font-semibold text-forest">Next: pick the places you want to visit</Typography>
                            <Typography className="text-[13px] text-[#4F6B5C]">We’ll suggest arrival times and a route for you.</Typography>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>

            <View className="pb-safe">
                <Button fullWidth disabled={!basics.name.trim()} onPress={onNext}>
                    Next: add stops
                </Button>
            </View>
        </>
    )
}
