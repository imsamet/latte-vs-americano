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
        <Text size={18} color={colors.secondary} style={{ marginBottom: 12 }}>
          📋 Tam Liste Etkinlikler:
        </Text>
        <FlatList
          data={eventList}
          keyExtractor={(item) => item.createdAt.toString()}
          renderItem={({ item }) => (
            <View style={styles.eventItem}>
              <View style={styles.eventItemContent}>
                <Text size={16} color={colors.dark}>
                  {formatDate(item.date)}
                </Text>
                <Text size={14} color={colors.secondary}>
                  {getUserName(item.createdBy)}
                </Text>
              </View>
              {item?.description && (
                <Text size={12} fontWeight="400" color={colors.dark}>
                  {item?.description}
                </Text>
              )}
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
    gap: 12,
    paddingVertical: 12,
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: colors.text,
    marginBottom: 24,
  },
  eventItemContent: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

export default EventList;
