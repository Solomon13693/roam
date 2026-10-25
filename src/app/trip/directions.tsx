import { DirectionsView } from '@/features'
import { useLocalSearchParams } from 'expo-router'

export default function Directions() {
    const { placeId } = useLocalSearchParams<{ placeId: string }>()
    return <DirectionsView placeId={placeId} />
}
