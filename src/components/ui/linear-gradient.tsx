import { LinearGradient as ExpoLinearGradient } from "expo-linear-gradient";
import { styled } from "nativewind";

// expo-linear-gradient with Tailwind support: className is turned into its style prop.
export const LinearGradient = styled(ExpoLinearGradient, { className: "style" });
