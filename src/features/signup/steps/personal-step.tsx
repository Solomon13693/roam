import { Button, Controller, Input, SettingsRow, Toggle } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'

const schema = z.object({
    firstName: z.string().trim().min(1, 'Tell us what to call you.').max(40, 'Keep it under 40 characters.'),
    showNearby: z.boolean(),
})
export type PersonInfo = z.infer<typeof schema>

type PersonInfoStepProps = { onSubmit: (info: PersonInfo) => void }


const PersonInfoStep = ({ onSubmit }: PersonInfoStepProps) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<PersonInfo>({
        resolver: zodResolver(schema),
        defaultValues: { firstName: '', showNearby: true },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    })

    const firstName = useWatch({ control, name: 'firstName' })

    const submit = () => handleSubmit(onSubmit)()

    return (
        <View className="mt-6 flex-1">
            <Controller control={control} name="firstName">
                <Input
                    name="firstName"
                    label="First name"
                    placeholder="Tolu"
                    autoFocus
                    autoCapitalize="words"
                    autoComplete="given-name"
                    textContentType="givenName"
                    returnKeyType="done"
                    onSubmitEditing={submit}
                    formGroupClass="mb-0"
                />
            </Controller>

            <View className="mt-3.5">
                <SettingsRow
                    icon="map-pin"
                    label="Show places near me"
                    supporting="Uses your location while the app is open"
                    trailing={
                        <Controller control={control} name="showNearby">
                            <Toggle accessibilityLabel="Show places near me" />
                        </Controller>
                    }
                />
            </View>

            <Button fullWidth disabled={!firstName.trim() || !!errors.firstName} onPress={submit} className="mb-4 mt-auto">
                Start exploring
            </Button>
            
        </View>
    )
}

export default PersonInfoStep
