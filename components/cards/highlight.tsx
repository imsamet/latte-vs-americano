import React from "react";
import { View, StyleSheet } from "react-native";
import Text from "../ui/text";
import { colors } from "@/theme";
import { formatDate } from "@/utils/formatedDate";
import { useEventContext } from "@/context/event";

const Highlight = () => {
  const { eventList, getUserName } = useEventContext();

  return (
    <>
      {/* En Son Eklenen Aktif Etkinlik */}
      {eventList.length > 0 && (
        <View style={styles.activeEvent}>
          <Text size={18} color={colors.secondary}>
            🟢 Aktif Etkinlik:
          </Text>
          <Text size={24} color={colors.dark}>
            {formatDate(eventList[0].date)}
            {/* {getUserName(eventList[0].createdBy)} */}
          </Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  activeEvent: { marginTop: 20, paddingVertical: 10, gap: 8, marginBottom: 32 },
});

export default Highlight;
