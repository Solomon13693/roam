import { colors } from "@/constants/colors";
import { Icon } from "@/components/icon";
import { Input, type InputProps } from "./form";
import { IconButton } from "./icon-button";

export interface SearchFieldProps extends Omit<InputProps, "name" | "startContent" | "endContent"> {
  name?: string;
  onFilterPress?: () => void;
}

export function SearchField({ name = "search", onFilterPress, formGroupClass, ...rest }: SearchFieldProps) {
  return (
    <Input
      name={name}
      returnKeyType="search"
      formGroupClass={formGroupClass ?? "mb-0 w-full"}
      className="rounded-full"
      startContent={<Icon size={20} name="search" color={colors["ink-muted"]} />}
      endContent={
        onFilterPress ? (
          <IconButton className="bg-forest" accessibilityLabel="Filters" icon="sliders" iconColor="white" onPress={onFilterPress} />
        ) : undefined
      }
      {...rest}
    />
  );
}
