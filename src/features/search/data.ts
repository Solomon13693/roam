import type { IconName } from '@/components/icon'

export const RECENT_SEARCHES = ['Tarkwa Bay', 'Quiet cafés in Lekki', 'Canopy walk', 'Ikotun','Ikeja mail']

export type Mood = { id: string; label: string; icon: IconName; count: number }

export const MOODS: Mood[] = [
    { id: 'nature', label: 'Nature', icon: 'leaf', count: 12 },
    { id: 'beaches', label: 'Beaches', icon: 'waves', count: 8 },
    { id: 'culture', label: 'Culture', icon: 'landmark', count: 15 },
    { id: 'cafes', label: 'Cafés', icon: 'coffee', count: 21 },
]
