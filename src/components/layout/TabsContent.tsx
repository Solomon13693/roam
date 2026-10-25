import { View, Pressable } from 'react-native'
import type { BottomTabBarProps } from 'expo-router/tabs'
import { tabs } from '@/constants/tabs'
import { Icon } from '@/components/icon'
import { Typography } from '@/components/ui'
import { cn } from '@/lib'

const TabsContent = ({ state, emitter, navigateToTab, insets }: BottomTabBarProps) => {
    return (
        <View className="bg-white border border-line absolute inset-x-10 rounded-full flex-row items-center justify-evenly py-3 shadow-[0_12px_28px_-4px_#12291C1F]" style={{ bottom: insets.bottom }}>

            {state.routes.map((route, index) => {

                const tab = tabs.find((item) => item.name === route.name)
                if (!tab) return null
                const isFocus = state.index === index

                const onPress = () => {
                    const event = emitter.emit(
                        {
                            type: 'tabPress',
                            target: route.key,
                            canPreventDefault: true
                        }
                    )
                    if (!isFocus && !event.defaultPrevented) navigateToTab(route.key)
                }

                return (
                    <Pressable
                        key={route.key}
                        onPress={onPress}
                        accessibilityRole="tab"
                        accessibilityState={{ selected: isFocus }}
                        accessibilityLabel={tab.title}
                        className={cn('h-14 flex-row items-center rounded-full', isFocus ? 'gap-3 bg-sage-soft pr-5' : 'w-14 justify-center bg-sand-soft')}>

                        {isFocus ? (

                            <>

                                <View className="size-14 items-center justify-center rounded-full bg-forest">
                                    <Icon name={tab.icon} size={22} color="white" />
                                </View>

                                <Typography className="font-semibold text-forest">{tab.title}
                                </Typography>

                            </>

                        ) : (

                            <Icon name={tab.icon} size={22} color="ink-muted" />

                        )}

                    </Pressable>
                )
            })}

        </View>
    )
}

export default TabsContent
