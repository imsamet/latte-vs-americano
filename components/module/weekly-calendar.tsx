import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { Calendar } from "react-native-calendars";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import Button from "../ui/button";
import { colors } from "@/theme";
import { useAppContext } from "@/context";
import { router } from "expo-router";

const WeeklyCalendar = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const { dispatch } = useAppContext();

  // Yeni etkinlik oluştur
  const addEvent = async () => {
    if (!selectedDate) return;

    try {
      await addDoc(collection(db, "calendar"), {
        date: selectedDate,
        createdBy: auth.currentUser?.uid, // Kullanıcı kimliğini burada dinamik yap
        createdAt: new Date(),
      });
      setSelectedDate("");
      dispatch({
        type: "ADD_TOAST",
        payload: {
          type: "success",
          title: "Etkinlik Eklendi",
          description: "Etkinlik başarıyla eklendi",
        },
      });
      router.push("/(app)");
    } catch (error) {}
  };

  return (
    <View style={styles.container}>
      {/* Takvim */}
      <Calendar
        onDayPress={(day: any) => setSelectedDate(day.dateString)}
        markedDates={{
          [selectedDate]: { selected: true, selectedColor: colors.primary },
        }}
        theme={{
          calendarBackground: "transparent", // Arka planı şeffaf yapar
          dayTextColor: colors.grey, // Gün metni rengi
          todayTextColor: colors.primary, // Bugünün rengi
          arrowColor: colors.primary, // Okların rengi
          monthTextColor: "#000", // Ay başlığının rengi
        }}
      />
      <Button
        label="Etkinlik Ekle"
        onPress={addEvent}
        style={{ marginVertical: 24 }}
        disabled={selectedDate === ""}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});

export default WeeklyCalendar;
