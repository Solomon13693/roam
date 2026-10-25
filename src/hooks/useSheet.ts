import type { AppSheetRef } from '@/components'
import { useCallback, useRef } from 'react'

export function useSheet() {
    const ref = useRef<AppSheetRef>(null)
    const open = useCallback(() => ref.current?.open(), [])
    const close = useCallback(() => ref.current?.close(), [])
    return { ref, open, close }
}
