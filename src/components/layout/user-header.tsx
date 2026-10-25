import { Icon, type IconName } from '@/components/icon'
import { Avatar, IconButton, Typography } from '@/components/ui'
import { Pressable, View } from 'react-native'

type UserHeaderProps = {
    name: string
    subtitle?: string
    subtitleIcon?: IconName
    actionIcon?: IconName
    actionLabel?: string
    onActionPress?: () => void
    onPress?: () => void
}

export function UserHeader({
    name,
    subtitle,
    subtitleIcon = 'map-pin',
    actionIcon,
    actionLabel,
    onActionPress,
    onPress,
}: UserHeaderProps) {
    return (
        <View className="flex-row items-center justify-between gap-2">
            <Pressable onPress={onPress} disabled={!onPress} className="flex-1 flex-row items-center gap-3 active:opacity-80">
                <Avatar name={name} />
                <View className="flex-1">
                    <Typography numberOfLines={1} className="text-[15px] font-semibold">
                        {name}
                    </Typography>
                    {subtitle ? (
                        <View className="flex-row items-center gap-1">
                            <Icon name={subtitleIcon} size={13} color="ink-muted" />
                            <Typography numberOfLines={1} className="text-[13px] text-ink-muted">
                                {subtitle}
                            </Typography>
                        </View>
                    ) : null}
                </View>
            </Pressable>

            {actionIcon ? <IconButton icon={actionIcon} accessibilityLabel={actionLabel ?? actionIcon} onPress={onActionPress} /> : null}
        </View>
    )
}
