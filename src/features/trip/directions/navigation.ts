import type { IconName } from '@/components'
import type { RouteResult, RouteStep } from '@/service'

type Coordinate = [number, number]

export const distanceBetween = ([lng1, lat1]: Coordinate, [lng2, lat2]: Coordinate) => {
    const toRad = (deg: number) => (deg * Math.PI) / 180
    const dLat = toRad(lat2 - lat1)
    const dLng = toRad(lng2 - lng1)
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
    return 6371000 * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export const formatMeters = (meters: number) => (meters >= 1000 ? `${(meters / 1000).toFixed(1)} km` : `${Math.round(meters / 10) * 10} m`)

export const formatMinutes = (seconds: number) => `${Math.max(1, Math.round(seconds / 60))} min`

export const formatArrival = (seconds: number) =>
    new Date(Date.now() + seconds * 1000).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' })

export const stepIcon = ({ maneuver }: RouteStep): IconName => {
    if (maneuver.type === 'arrive') return 'flag'
    if (maneuver.type === 'roundabout' || maneuver.type === 'rotary') return 'start'
    if (maneuver.modifier?.includes('left')) return 'turn-left'
    if (maneuver.modifier?.includes('right')) return 'turn-right'
    return 'arrow-up'
}

export const stepText = (step: RouteStep) => step.maneuver.instruction ?? step.name

export function getProgress(route: RouteResult, coordinate: Coordinate | null) {
    const steps = route.legs[0]?.steps ?? []

    if (!coordinate || steps.length < 2) {
        return { activeIndex: 0, toNext: steps[1]?.distance ?? 0, remainingDistance: route.distance, remainingDuration: route.duration, progress: 0 }
    }

    const nearest = steps.reduce(
        (best, step, index) => {
            const distance = distanceBetween(coordinate, step.maneuver.location)
            return distance < best.distance ? { index, distance } : best
        },
        { index: 0, distance: Infinity },
    )

    const nextIndex = Math.min(Math.max(nearest.index, 1) + (nearest.distance < 25 && nearest.index > 0 ? 1 : 0), steps.length - 1)
    const toNext = distanceBetween(coordinate, steps[nextIndex].maneuver.location)
    const remainingDistance = Math.min(route.distance, toNext + steps.slice(nextIndex).reduce((total, step) => total + step.distance, 0))
    const remainingDuration = route.distance > 0 ? route.duration * (remainingDistance / route.distance) : 0

    return {
        activeIndex: nextIndex,
        toNext,
        remainingDistance,
        remainingDuration,
        progress: route.distance > 0 ? 1 - remainingDistance / route.distance : 0,
    }
}
