import { cloneElement, isValidElement, type ReactElement } from "react";
import { Controller as RHFController, type Control,
  type FieldPath, type FieldValues } from "react-hook-form";

type FieldChildProps = {
  name?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onBlur?: (...args: unknown[]) => void;
  error?: string;
  checked?: boolean;
  onValueChange?: (value: boolean) => void;
};

export type ControllerProps<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  children: ReactElement<FieldChildProps>;
};

export default function Controller<T extends FieldValues>({
  control,
  name,
  children,
}: ControllerProps<T>) {
  if (!isValidElement(children)) {
    throw new Error("Controller expects a single React element as children");
  }

  return (
    <RHFController
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) =>
        cloneElement(children, {
          name,
          value: value ?? "",
          onChangeText: onChange,
          onBlur,
          error: error?.message,
          checked: Boolean(value),
          onValueChange: onChange,
        })
      }
    />
  );
}
