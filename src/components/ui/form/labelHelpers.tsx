import { View } from "react-native";
import type { ReactNode } from "react";
import Typography from "../typography";

interface FileLabelProps {
  name: string;
  fileTypes?: string[];
  required?: boolean;
}

interface InputLabelProps {
  name: string;
  required?: boolean;
}

export const createFileLabel = ({
  name,
  fileTypes,
  required = false,
}: FileLabelProps): ReactNode => {
  const fileTypesStr = fileTypes?.join(", ") || "";

  return (
    <View className="flex-row flex-wrap items-center gap-1">
      <Typography className="font-semibold">
        {name}
      </Typography>
      {fileTypesStr ? (
        <Typography className="text-xs text-ink-muted">
          ({fileTypesStr}) | max 500kb
        </Typography>
      ) : null}
      {required ? (
        <Typography className="font-semibold text-danger">
          *
        </Typography>
      ) : null}
    </View>
  );
};

export const createInputLabel = ({
  name,
  required = false,
}: InputLabelProps): ReactNode => (
  <View className="flex-row items-center gap-1">
    <Typography className="font-semibold">
      {name}
    </Typography>
    {required ? (
      <Typography className="font-semibold text-danger">
        *
      </Typography>
    ) : null}
  </View>
);
