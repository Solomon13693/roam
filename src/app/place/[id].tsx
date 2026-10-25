import { PlaceDetailsView } from '@/features'
import { useLocalSearchParams } from 'expo-router'

export default function PlaceDetails() {
    const { id } = useLocalSearchParams<{ id: string }>()
    console.log(id)
    return <PlaceDetailsView id={id} />
}
