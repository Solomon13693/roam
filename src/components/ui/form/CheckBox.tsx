import type { ReactNode } from "react";
import { Pressable, View } from "react-native";
import { Icon } from "@/components/icon";
import { cn } from "@/lib";
import Typography from "../typography";
import ErrorMessage from "./ErrorMessage";

export interface CheckBoxProps {
  label?: string | ReactNode;
  name?: string;
  className?: string;
  formGroupClass?: string;
  labelClassName?: string;
  fullWidth?: boolean;
  error?: string;
  checked?: boolean;
  disabled?: boolean;
  onChange?: (checked: boolean) => void;
  onValueChange?: (checked: boolean) => void;
}

export default function CheckBox({
  label,
  className,
  formGroupClass,
  labelClassName,
  fullWidth,
  error,
  checked = false,
  disabled = false,
  onChange,
  onValueChange,
}: CheckBoxProps) {
  const toggle = () => {
    if (disabled) return;
    const next = !checked;
    onChange?.(next);
    onValueChange?.(next);
  };

  return (
    <View className={cn("mb-2", formGroupClass, fullWidth && "w-full")}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked, disabled }}
        disabled={disabled}
        onPress={toggle}
        className={cn(
          "flex-row items-start gap-2.5",
          disabled && "opacity-60",
          labelClassName,
        )}
      >
        <View
          className={cn(
            "mt-px size-5 items-center justify-center rounded-md border-[1.5px]",
            checked ? "border-forest bg-forest" : "border-line bg-white",
            className,
          )}>
          {checked ? <Icon name="check" size={14} color="white" strokeWidth={2.5} /> : null}
        </View>

        {label ? (
          typeof label === "string" ? (
            <Typography className="flex-1">
              {label}
            </Typography>
          ) : (
            label
          )
        ) : null}
      </Pressable>

      <ErrorMessage error={error} />
    </View>
  );
}
