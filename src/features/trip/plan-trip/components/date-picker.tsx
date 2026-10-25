import type { AppSheetRef } from '@/components'
import { useRef } from 'react'
import { DateField } from './date-field'
import { DatePickerSheet } from './date-picker-sheet'

type DatePickerProps = {
    label: string
    value: Date
    onChange: (date: Date) => void
}

export function DatePicker({ label, value, onChange }: DatePickerProps) {
    const sheet = useRef<AppSheetRef>(null)

    return (
        <>
            <DateField label={label} date={value} onPress={() => sheet.current?.open()} />
            <DatePickerSheet ref={sheet} value={value} onSelect={onChange} />
        </>
    )
}
