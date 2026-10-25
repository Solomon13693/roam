import { Icon, Image, Typography } from '@/components'
import type { FieldNote } from '@/data/fields-note'
import { router } from 'expo-router'
import { Pressable, View } from 'react-native'

export function NoteEntry({ note }: { note: FieldNote }) {
    const single = note.photos.length === 1

    return (
        <View className="flex-row gap-x-3.5">

            <View className="items-center gap-y-1.5 pt-2">
                <View className="size-3 rounded-full border-4 border-sage-soft bg-forest" />
                <View className="w-0.5 flex-1 bg-line" />
            </View>

            <View className="flex-1 gap-y-2.5 pb-[22px]">
                <View className="flex-row justify-between">
                    <Typography className="font-semibold">{note.date}</Typography>
                    <Typography className="text-[13px] text-ink-muted">{note.time}</Typography>
                </View>

                <View className="flex-row gap-x-2">
                    {note.photos.map((photo, index) => (
                        <Image key={index} source={photo} contentFit="cover" className={single ? 'h-[190px] flex-1 rounded-[20px]' : 'h-[130px] flex-1 rounded-[20px]'} />
                    ))}
                </View>

                <Typography>{note.caption}</Typography>

                <Pressable onPress={() => router.push(`/place/${note.placeId}`)} className="flex-row items-center gap-x-1 self-start active:opacity-70">
                    <Icon name="map-pin" size={14} color="forest" />
                    <Typography className="text-[13px] text-forest">{note.placeName}</Typography>
                </Pressable>
            </View>

        </View>
    )
}
