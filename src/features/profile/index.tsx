import { Button, Icon, Image, LinearGradient, SectionHeader, SettingsRow, Toggle, Typography, UserHeader } from '@/components'
import { FlatList, Linking, ScrollView, View } from 'react-native'
import { RECENTS } from '@/data/fields-note'
import { useCurrentLocation } from '@/hooks'
import { useLocationPreference } from '@/stores'
import { router } from 'expo-router'

const ProfileView = () => {

    const { requestAgain, denied, canAskAgain } = useCurrentLocation()
    const { enabled, setEnabled } = useLocationPreference((state) => state)
    const locationOn = enabled && !denied

    const toggleLocation = (turnOn: boolean) => {
        setEnabled(turnOn)
        if (!turnOn || !denied) return
        if (canAskAgain) requestAgain()
        else Linking.openSettings()
    }

    return (
        <View className="flex-1 bg-paper pt-safe px-6">

            <LinearGradient colors={['#DBEDE0', '#F7F8F6']}className="absolute inset-x-0 top-0 h-[400px]" />

            <UserHeader name="Tolu Adebayo" subtitle="Lekki Phase 1, Lagos" actionIcon="edit" actionLabel="Edit profile" onActionPress={() => {}} />

            <ScrollView className='mt-6'
            contentContainerClassName='pb-42'
            showsVerticalScrollIndicator={false} >

                <View className="flex-row items-center gap-2 mb-6">
                    <View className="bg-forest p-4 rounded-3xl flex-1">
                        <Typography className="text-[28px] text-white font-medium">12</Typography>
                        <Typography className="text-sage text-[13px]">Saved places</Typography>
                    </View>

                    <View className="bg-white p-4 rounded-3xl flex-1 shadow-[0_2px_12px_0px_#1217140D]">
                        <Typography className="text-[28px] text-forest font-medium">3</Typography>
                        <Typography className="text-sage text-[13px]">Trips</Typography>
                    </View>

                    <View className="bg-white p-4 rounded-3xl flex-1 shadow-[0_2px_12px_0px_#1217140D]">
                        <Typography className="text-[28px] text-forest font-medium">18</Typography>
                        <Typography className="text-sage text-[13px]">Moments</Typography>
                    </View>
                </View>

                <View className="gap-y-2.5 mb-6">
                    <SectionHeader title="Recent field notes" actionLabel="Open journal" onActionPress={() => {}} />

                    <FlatList
                        data={RECENTS}
                        keyExtractor={(item) => item.id.toFixed()}
                        horizontal
                        className="-mx-6"
                        contentContainerClassName="px-6 gap-2"
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (
                            <View className="rounded-[16px] size-[80px] bg-forest overflow-hidden">
                                <Image contentFit="cover" source={item.image} className="h-full w-full" />
                            </View>
                        )}
                    />
                </View>

                <View className="gap-y-2.5 mb-8">

                    <SectionHeader title="Permissions & preferences" />

                    <View className="bg-white shadow-[0_2px_12px_0px_#1217140D] px-5 py-2 rounded-[24px]">
                        <SettingsRow
                            icon="map-pin"
                            label="Location access"
                            supporting={locationOn ? 'While using the app' : enabled && denied ? 'Blocked in phone settings' : 'Off in Roam'}
                            trailing={<Toggle checked={locationOn} onValueChange={toggleLocation} accessibilityLabel="Location access" />}
                        />

                        <View className="h-px bg-line" />

                        <SettingsRow
                            icon="camera"
                            label="Camera & photos"
                            supporting="Used only for field notes"
                            trailing={<Icon name="chevron-right" color="ink-muted" />}
                            onPress={() => router.push('/notes')}
                        />

                        <View className="h-px bg-line" />

                        <SettingsRow icon="globe" label="Distance units" supporting="Kilometres" trailing={<Icon name="chevron-right" color="ink-muted" />} />

                        <View className="h-px bg-line" />

                        <SettingsRow
                            icon="shield"
                            label="Privacy"
                            supporting="Your notes stay on this device"
                            trailing={<Icon name="chevron-right" color="ink-muted" />}
                        />
                    </View>
                </View>

                <Button textClassName="text-ink-muted" icon="log-out" fullWidth variant="outline" className="bg-transparent shadow-none border-2 border-line">
                    Sign out
                </Button>

            </ScrollView>

        </View>
    )
}

export default ProfileView
