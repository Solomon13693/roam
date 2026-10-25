import { TabsContent } from '@/components';
import { tabs } from '@/constants/tabs';
import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <TabsContent {...props} />}>
      { tabs.map((tab, index) => (
        <Tabs.Screen key={index} name={tab.name}
        options={{ tabBarShowLabel: false }} />
      )) }
    </Tabs>
  );
}
