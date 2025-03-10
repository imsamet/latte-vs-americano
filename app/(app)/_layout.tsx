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
          title: "Anasayfa",
        }}
        name="index"
      />
    </Tabs>
  );
}
