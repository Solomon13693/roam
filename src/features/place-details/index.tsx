import { EmptyState, Typography } from '@/components'
import { findPlace } from '@/data/places'
import { PLACE_DETAILS } from '@/data/place-details'
import { router } from 'expo-router'
import { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { ActionBar, DetailHeader, DetailHero, FactsCard, PhotoGallery } from './components'
import { StatusBar } from 'expo-status-bar'

const PlaceDetailsView = ({ id }: { id: string }) => {

    const place = findPlace(id)
    const [saved, setSaved] = useState(place?.saved ?? false)

    if (!place) {
        return (
            <View className="flex-1 justify-center bg-paper">
                <EmptyState icon="compass" title="Place not found" actionLabel="Go back" onActionPress={() => router.back()} />
            </View>
        )
    }

    const details = PLACE_DETAILS[place.id]

    return (
        <View className="flex-1 bg-paper">

            <StatusBar style='light' />

            <ScrollView showsVerticalScrollIndicator={false}
            contentContainerClassName="pb-36">

                <DetailHero place={place} photoCount={details?.photoCount ?? 1} saved={saved} onToggleSave={() => setSaved((value) => !value)} />

                <View className="-mt-10 rounded-t-[32px] bg-paper px-6 pt-6.5">

                    <DetailHeader
                        place={place}
                        tag={details?.tag ?? place.category}
                        openNow={details?.openNow ?? true}
                        address={details?.address ?? place.area}
                    />

                    {details ? (
                        <>

                            <FactsCard hours={details.hours} planFor={details.planFor} entry={details.entry} />

                            <Typography className="mt-5.5 text-[17px] font-semibold leading-[22px] tracking-[-0.17px]">About</Typography>
                            <Typography className="mt-1.5 text-ink-muted">{details.about}</Typography>

                            <PhotoGallery photos={details.gallery} total={details.photoCount} onSeeAll={() => {}} />
                        </>
                    ) : null}
                </View>
            </ScrollView>

            <ActionBar onDirections={() => router.push({ pathname: '/trip/directions', params: { placeId: place.id } })} onPlanVisit={() => router.push('/trip/new')} />

        </View>
    )
}

export default PlaceDetailsView
