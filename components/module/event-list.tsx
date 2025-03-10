import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "@/firebaseConfig";
import Text from "../ui/text";
import { colors } from "@/theme";
import { formatDate } from "@/utils/formatedDate";

type Event = {
  id: string;
  date: string;
  createdBy: string;
};
type User = { name: string; title: string; uid: string };

const EventList = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  // Firestore'dan etkinlikleri çek
  useEffect(() => {
    fetchUsers();
    const q = query(collection(db, "calendar"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Event[];
      setEvents(eventList);
    });
    return () => unsubscribe();
  }, []);

  const fetchUsers = () => {
    const userRef = collection(db, "users");
    return onSnapshot(userRef, (snapshot) => {
      const users: User[] = [];
      snapshot.docs.forEach((doc) => {
        const { name, title } = doc.data();
        users.push({ name, title, uid: doc.id });
      });
      setUsers(users);
    });
  };

  const getUserName = (uid: string): string => {
    const user = users.find((i) => i.uid === uid);
    return user ? `${user.title} ${user.name}` : "";
  };

  return (
    <View style={styles.container}>
      {/* En Son Eklenen Aktif Etkinlik */}
      {events.length > 0 && (
        <View style={styles.activeEvent}>
          <Text size={18} color={colors.primary}>
            🟢 Aktif Etkinlik:
          </Text>
          <Text size={24} color={colors.grey}>
            {formatDate(events[0].date)} - {getUserName(events[0].createdBy)}
          </Text>
        </View>
      )}

      {/* Etkinlik Listesi */}
      <View style={{ flex: 1 }}>
        <Text size={18} color={colors.primary}>
          📋 Tam Liste Etkinlikler:
        </Text>
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
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
  activeEvent: { marginTop: 20, padding: 10, gap: 8, marginBottom: 32 },
  activeTitle: { fontWeight: "bold", marginBottom: 5 },
  eventItem: {
    flex: 1,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});

export default EventList;
