export const sameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString()

export const startOfDay = (date: Date) => new Date(date.getFullYear(), date.getMonth(), date.getDate())

export const addDays = (date: Date, days: number) => new Date(date.getFullYear(), date.getMonth(), date.getDate() + days)

export const startOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1)

export const addMonths = (date: Date, months: number) => new Date(date.getFullYear(), date.getMonth() + months, 1)

export const nextWeekday = (from: Date, weekday: number) => addDays(startOfDay(from), (weekday - from.getDay() + 7) % 7)

export const formatLong = (date: Date) =>
    date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })

export const formatShort = (date: Date) => date.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' }).replace(',', '')

export const formatMonth = (date: Date) => date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

export const monthCells = (month: Date): (Date | null)[] => {
    const year = month.getFullYear()
    const m = month.getMonth()
    const daysInMonth = new Date(year, m + 1, 0).getDate()
    const leading = (new Date(year, m, 1).getDay() + 6) % 7
    return [...Array<null>(leading).fill(null), ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, m, i + 1))]
}
