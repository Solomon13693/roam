import type { IconName } from '@/components'

export type AppTab = {
    name: string
    title: string
    icon: IconName
    protected?: boolean
}

export const tabs: AppTab[] = [
    { name: 'explore', title: 'Explore', icon: 'compass' },
    { name: 'map', title: 'Map', icon: 'map' },
    { name: 'saved', title: 'Saved', icon: 'bookmark', protected: true },
    { name: 'profile', title: 'Profile', icon: 'user', protected: true },
]
