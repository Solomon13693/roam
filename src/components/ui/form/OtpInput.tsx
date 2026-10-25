import { useEffect, useRef, useState, type ComponentRef } from "react";
import { Pressable, TextInput, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import { cn } from "@/lib";
import Typography from "../typography";

export interface OtpInputProps {
  value?: string;
  onChangeText?: (code: string) => void;
  onComplete?: (code: string) => void;
  onBlur?: () => void;
  length?: number;
  error?: string;
  autoFocus?: boolean;
  name?: string;
}

export default function OtpInput({
  value = "",
  onChangeText,
  onComplete,
  onBlur,
  length = 6,
  error,
  autoFocus = false,
}: OtpInputProps) {
  const inputRef = useRef<ComponentRef<typeof TextInput>>(null);  const [focused, setFocused] = useState(autoFocus);

  const handleChange = (text: string) => {
    const code = text.replace(/\D/g, "").slice(0, length);
    onChangeText?.(code);
    if (code.length === length) onComplete?.(code);
  };

  const activeIndex = value.length;

  return (
    <View>
      <Pressable onPress={() => inputRef.current?.focus()} accessible={false}>
        <View className="flex-row gap-[9px]">
          {Array.from({ length }, (_, i) => {
            const digit = value[i];
            const isActive = focused && i === activeIndex;
            return (
              <View
                key={i}
                className={cn(
                  "h-15 flex-1 items-center justify-center rounded-2xl bg-white",
                  error
                    ? "border-[1.5px] border-danger"
                    : isActive
                      ? "border-[1.5px] border-forest"
                      : digit
                        ? "border border-sage"
                        : "border border-[#C7CCC9]",
                )}>
                {digit ? (
                  <Typography className="text-[22px] font-semibold leading-7 tracking-[-0.44px]">{digit}</Typography>
                ) : isActive ? (
                  <Caret />
                ) : null}
              </View>
            );
          })}
        </View>

        <TextInput
          ref={inputRef}
          value={value}
          onChangeText={handleChange}
          onFocus={() => setFocused(true)}
          onBlur={() => {
            setFocused(false);
            onBlur?.();
          }}
          maxLength={length}
          keyboardType="number-pad"
          textContentType="oneTimeCode"
          autoComplete="one-time-code"
          autoFocus={autoFocus}
          caretHidden
          accessibilityLabel={`${length}-digit code`}
          className="absolute inset-0 opacity-0"
        />
      </Pressable>

      {error ? <Typography className="mt-2.5 text-[13px] leading-[18px] text-danger">{error}</Typography> : null}
    </View>
  );
}

function Caret() {
  const opacity = useSharedValue(1);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(0, { duration: 500 }), -1, true);
  }, [opacity]);

  const style = useAnimatedStyle(() => ({ opacity: opacity.value }));

  return <Animated.View style={style} className="h-6 w-0.5 bg-forest" />;
}
