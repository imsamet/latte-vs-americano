import React from "react";
import { View, FlatList, StyleSheet } from "react-native";
import Text from "../ui/text";
import { colors } from "@/theme";
import { formatDate } from "@/utils/formatedDate";
import { useEventContext } from "@/context/event";
import Highlight from "../cards/highlight";

const EventList = () => {
  const { eventList, getUserName } = useEventContext();

  return (
    <View style={styles.container}>
      <Highlight />

      {/* Etkinlik Listesi */}
      <View style={{ flex: 1 }}>
        <Text size={18} color={colors.primary}>
          📋 Tam Liste Etkinlikler:
        </Text>
        <FlatList
          data={eventList}
          keyExtractor={(item) => item.createdAt.toString()}
          renderItem={({ item }) => (
            <View style={styles.eventItem}>
              <Text size={16} color={colors.text}>
                {formatDate(item.date)} - {getUserName(item.createdBy)}
              </Text>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  eventItem: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default EventList;
