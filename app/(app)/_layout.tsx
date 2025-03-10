import Header from "@/components/layout/header";
import TabBar from "@/components/layout/tabBar";
import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs
      screenOptions={{
        header: ({ navigation, route, options }) => (
          <Header title={options.title} />
        ),
      }}
      tabBar={(props) => <TabBar prop={props} />}
    >
      <Tabs.Screen
        options={{
          title: "📆 Eklenenler",
        }}
        name="index"
      />
      <Tabs.Screen
        options={{
          title: "📆 Haftalık Takvim",
        }}
        name="calendar"
      />
      <Tabs.Screen
        options={{
          title: "📆 Ayarlar",
        }}
        name="setting"
      />
    </Tabs>
  );
}
