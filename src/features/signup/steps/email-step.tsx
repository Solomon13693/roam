import { Button, Controller, Input } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, useWatch } from 'react-hook-form'
import { View } from 'react-native'
import { z } from 'zod'

const schema = z.object({
    email: z.email({ error: 'Check your email address — it looks incomplete.' }),
})

type EmailForm = z.infer<typeof schema>

type EmailStepProps = { defaultValue?: string; onSubmit: (email: string) => void }

export function EmailStep({ defaultValue = '', onSubmit }: EmailStepProps) {

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<EmailForm>({
        resolver: zodResolver(schema),
        defaultValues: { email: defaultValue },
        mode: 'onSubmit',
        reValidateMode: 'onChange',
    })

    const email = useWatch({ control, name: 'email' })

    const submit = () => handleSubmit(({ email }) => onSubmit(email.trim()))()

    return (
        <View className="flex-1 mt-6">

            <Controller control={control} name="email">
                <Input
                    name="email"
                    type="email"
                    label="Email"
                    placeholder="you@example.com"
                    hint="We only use this to sign you in and sync your places."
                    autoComplete="email"
                    textContentType="emailAddress"
                    returnKeyType="send"
                    onSubmitEditing={submit}
                    formGroupClass="mb-0"
                />
            </Controller>

            <Button fullWidth disabled={!email || !!errors.email} onPress={submit} className="mb-4 mt-auto">
                Send code
            </Button>

        </View>
    )
}
