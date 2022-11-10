import React from "react";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

// import useCachedResources from "./src/hooks/useCachedResources";
import Navigation from "./src/navigation";

LogBox.ignoreAllLogs();

export default function App() {
  // const isLoadingComplete = useCachedResources();

  // if (!isLoadingComplete) {
  //   return null;
  // } else {
  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
  // }
}
