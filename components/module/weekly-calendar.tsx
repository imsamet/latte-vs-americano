import React, { useState } from "react";
import { View, StyleSheet, Modal, Platform } from "react-native";
import { Calendar } from "react-native-calendars";
import { auth } from "@/firebaseConfig";
import Button from "../ui/button";
import { colors, layout } from "@/theme";
import { useAppContext } from "@/context/app";
import { router } from "expo-router";
import DateTimePicker from "@react-native-community/datetimepicker";
import Text from "../ui/text";
import useSafeArea from "@/hook/useSafeArea";
import Input from "../ui/input";
import Highlight from "../cards/highlight";
import { useEventContext } from "@/context/event";
import KeyboardHandle from "../expo-config/keyboard-handle";

const WeeklyCalendar = () => {
  const { addEvent } = useEventContext();
  const { dispatch } = useAppContext();
  const insets = useSafeArea();

  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const [isModalVisible, setModalVisible] = useState(false);

  // Tarih ve saat bilgisini "2015-03-25T12:00:00-06:30" formatına çevirir
  const formatDateTime = (date: string, time: Date) => {
    const timeZoneOffset = -time.getTimezoneOffset(); // Dakika cinsinden
    const offsetHours = Math.floor(Math.abs(timeZoneOffset) / 60);
    const offsetMinutes = Math.abs(timeZoneOffset) % 60;
    const offsetSign = timeZoneOffset >= 0 ? "+" : "-";

    const formattedTime = time.toTimeString().slice(0, 5); // HH:mm formatı

    return `${date}T${formattedTime}${offsetSign}${String(offsetHours).padStart(
      2,
      "0"
    )}:${String(offsetMinutes).padStart(2, "0")}`;
  };

  // Yeni etkinlik oluştur
  const handleClickAdd = async () => {
    if (!auth.currentUser?.uid) return;
    setModalVisible(false);
    dispatch({ type: "SET_LOADING", payload: true });
    try {
      const dateTime = formatDateTime(selectedDate, selectedTime);

      await addEvent({
        date: dateTime,
        createdBy: auth.currentUser.uid,
        createdAt: new Date(),
        ...(description.length > 0 ? { description } : {}),
      });

      dispatch({
        type: "ADD_TOAST",
        payload: {
          type: "success",
          title: "Etkinlik Eklendi",
          description: "Etkinlik başarıyla eklendi",
        },
      });
      router.push("/(app)");
    } catch (error) {
      console.error("Etkinlik eklerken hata oluştu: ", error);
    }
    dispatch({ type: "SET_LOADING", payload: false });
    setSelectedDate("");
    setDescription("");
  };

  // Modal'ı aç/kapat
  const openModal = () => setModalVisible(true);
  const closeModal = () => {
    setSelectedDate("");
    setDescription("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Highlight />

      {/* Takvim */}
      <Calendar
        onDayPress={(day: any) => {
          setSelectedDate(day.dateString);
          openModal();
        }}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: colors.primary },
        }}
        theme={{
          calendarBackground: "transparent",
          dayTextColor: colors.dark,
          todayTextColor: colors.primary,
          arrowColor: colors.primary,
          monthTextColor: colors.teriary,
        }}
      />
      {/* Saat Seçimi için Modal */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <KeyboardHandle>
          <View style={styles.modalOverlay}>
            <View
              style={[
                layout.container,
                styles.modalContent,
                { paddingBottom: insets.bottom },
              ]}
            >
              <Text
                size={20}
                align="center"
                color={colors.teriary}
                style={{ marginBottom: 20 }}
              >
                Saat Seç
              </Text>

              <DateTimePicker
                value={selectedTime}
                mode="time"
                is24Hour={true}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={(_, time) => time && setSelectedTime(time)}
              />

              <Input
                label="Açıklama (Opsiyonel 😁)"
                onChangeText={setDescription}
                value={description}
                placeholder="Açıklama"
                isTransparent
                multiline
              />
              <View style={styles.buttonContainer}>
                <Button
                  type="secondary"
                  label="❌  Vazgeç"
                  isCenter
                  onPress={closeModal}
                  style={styles.cancelButton}
                />
                <Button
                  label="✅  Oluştur"
                  isCenter
                  onPress={handleClickAdd}
                  style={styles.addButton}
                />
              </View>
            </View>
          </View>
        </KeyboardHandle>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    flex: 0,
    backgroundColor: colors.bg,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingTop: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 8,
  },
  cancelButton: {
    flex: 1,
  },
  addButton: {
    flex: 1,
  },
});

export default WeeklyCalendar;
