import { Button, Controller, OtpInput, Typography } from '@/components'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { Pressable, View } from 'react-native'
import { z } from 'zod'
import { verifyCode } from '../api'

const CODE_LENGTH = 6
const RESEND_AFTER = 60

const schema = z.object({
    code: z.string().regex(new RegExp(`^\\d{${CODE_LENGTH}}$`), 'Enter all 6 digits.'),
})
type OtpForm = z.infer<typeof schema>

type OtpStepProps = {
    email: string
    onSubmit: () => void
    onResend: () => void
    onChangeEmail: () => void
}

const OtpStep = ({ onSubmit, onResend, onChangeEmail }: OtpStepProps) => {
    const {
        control,
        handleSubmit,
        setError,
        formState: { errors, isSubmitting },
    } = useForm<OtpForm>({
        resolver: zodResolver(schema),
        defaultValues: { code: '' },
        reValidateMode: 'onChange',
    })

    const code = useWatch({ control, name: 'code' })

    const submit = () =>
        handleSubmit(async ({ code }) => {
            const ok = await verifyCode(code)
            if (!ok) return setError('code', { message: 'That code didn’t work. Check the email and try again.' })
            onSubmit()
        })()

    const [secondsLeft, setSecondsLeft] = useState(RESEND_AFTER)
    useEffect(() => {
        if (secondsLeft === 0) return
        const timer = setTimeout(() => setSecondsLeft((s) => s - 1), 1000)
        return () => clearTimeout(timer)
    }, [secondsLeft])

    const resend = () => {
        onResend()
        setSecondsLeft(RESEND_AFTER)
    }

    return (
        <View className="mt-6 flex-1">
            <Controller control={control} name="code">
                <OtpInput length={CODE_LENGTH} autoFocus onComplete={submit} />
            </Controller>

            <View className="mt-4.5">
                <View className="flex-row items-center gap-1.5">
                    <Typography className="text-[13px] leading-[18px] text-ink-muted">Didn’t get it?</Typography>
                    {secondsLeft > 0 ? (
                        <Typography className="font-semibold text-forest">Resend in 0:{String(secondsLeft).padStart(2, '0')}</Typography>
                    ) : (
                        <Pressable onPress={resend} hitSlop={8} className="active:opacity-70">
                            <Typography className="font-semibold text-forest">Resend code</Typography>
                        </Pressable>
                    )}
                </View>

                <Pressable onPress={onChangeEmail} hitSlop={8} className="mt-2.5 self-start active:opacity-70 border-b border-forest">
                    <Typography className="text-[13px] leading-[18px] text-forest">Wrong email? Change it</Typography>
                </Pressable>
            </View>

            <Button fullWidth loading={isSubmitting} disabled={code.length < CODE_LENGTH || !!errors.code} onPress={submit} className="mb-4 mt-auto">
                Verify
            </Button>

        </View>
    )
}

export default OtpStep
