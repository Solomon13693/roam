const path = require("node:path");
const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = withNativewind(getDefaultConfig(__dirname));

const SKIP_NATIVEWIND = ["expo-asset", "expo-font"].map(
  (name) => `${path.sep}node_modules${path.sep}${name}${path.sep}`,
);

const nativewindResolve = config.resolver.resolveRequest;
config.resolver.resolveRequest = (context, moduleName, platform) => {
  if (moduleName === "react-native" && SKIP_NATIVEWIND.some((dir) => context.originModulePath.includes(dir))) {
    return context.resolveRequest(context, moduleName, platform);
  }
  return nativewindResolve(context, moduleName, platform);
};

module.exports = config;
