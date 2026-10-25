import { useCallback, useState } from 'react'

type UseStepsOptions<T extends string> = {
    initial?: T
    onExit?: () => void
    onComplete?: () => void
}

export function useSteps<const T extends string>(steps: readonly T[], options: UseStepsOptions<T> = {}) {
    const { initial, onExit, onComplete } = options
    const [step, setStep] = useState<T>(initial ?? steps[0])

    const index = steps.indexOf(step)
    const total = steps.length
    const isFirst = index === 0
    const isLast = index === total - 1

    const goTo = useCallback((target: T) => setStep(target), [])

    const next = useCallback(() => {
        if (isLast) return onComplete?.()
        setStep(steps[index + 1])
    }, [index, isLast, onComplete, steps])

    const back = useCallback(() => {
        if (isFirst) return onExit?.()
        setStep(steps[index - 1])
    }, [index, isFirst, onExit, steps])

    return { step, index, total, isFirst, isLast, next, back, goTo }
}
