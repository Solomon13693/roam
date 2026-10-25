import { SafeAreaView, Typography } from '@/components'
import { router } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { useSteps } from '@/hooks'
import { KeyboardAvoidingView, Platform, View } from 'react-native'
import { sendCode } from './api'
import { SignupHeader } from './components/signup-header'
import { EmailStep, OtpStep, PersonInfoStep } from './steps'

const STEPS = ['email', 'otp', 'name'] as const
type Step = (typeof STEPS)[number]

export default function SignupView() {
    
    const { step, index, total, back, goTo } = useSteps(STEPS, { onExit: () => router.back() })
    const [email, setEmail] = useState('')

    const renderStep = () => {
        switch (step) {
            case 'email':
                return (
                    <EmailStep
                        defaultValue={email}
                        onSubmit={(value) => {
                            setEmail(value)
                            sendCode(value)
                            goTo('otp')
                        }}
                    />
                )
            case 'otp':
                return <OtpStep email={email} onResend={() => sendCode(email)} onChangeEmail={() => goTo('email')} onSubmit={() => goTo('name')} />
            case 'name':
                return (
                    <PersonInfoStep
                        onSubmit={({ firstName, showNearby }) => {
                            // TODO: save the profile; if showNearby, ask for location (01f) first.
                            console.log('Signed up', { email, firstName, showNearby })
                            router.replace('/explore')
                        }}
                    />
                )
            default: {
                const missing: never = step
                return missing
            }
        }
    }

    const title: Record<Step, string> = {
        email: 'What’s your email?',
        otp: 'Check your inbox',
        name: 'What should we call you?',
    }

    const description: Record<Step, string> = {
        email: 'We’ll send you a 6-digit code. No password to remember.',
        otp: `Enter the code we sent to ${email}`,
        name: 'This shows on your profile and field notes.',
    }

    return (
        <SafeAreaView className="flex-1 bg-paper">
            <StatusBar style="dark" />

            <SignupHeader step={index + 1} total={total} onBack={back} />

            <KeyboardAvoidingView className="flex-1 px-6" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
                <View className="mt-7">
                    <Typography className="text-[28px] font-medium leading-[34px] -ml-2"> {title[step]} </Typography>
                    <Typography className="mt-2 text-ink-muted">{description[step]}</Typography>
                </View>

                {renderStep()}
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
