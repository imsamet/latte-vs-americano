import { Tabs } from "expo-router";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        options={{
          title: "Anasayfa",
        }}
        name="index"
      />
    </Tabs>
  );
}
