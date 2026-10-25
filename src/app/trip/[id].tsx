import { TripDetailsView } from '@/features'
import { useLocalSearchParams } from 'expo-router'

export default function TripDetails() {
    const { id } = useLocalSearchParams<{ id: string }>()
    return <TripDetailsView id={id} />
}
