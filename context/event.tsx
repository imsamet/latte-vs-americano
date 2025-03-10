import { IEvent, IUser } from "@/core/_model";
import {
  collection,
  onSnapshot,
  orderBy,
  query,
  addDoc,
} from "firebase/firestore";
import { db } from "@/firebaseConfig";
import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";

type EventState = {
  activeEvent: IEvent | null;
  eventList: IEvent[];
  setEventList: (events: IEvent[]) => void;
  addEvent: (event: IEvent) => Promise<void>;
  removeEvent: (eventUid: string) => void;
  getUserName: (uid: string) => string;
};

// Başlangıç durumu
const initialState: EventState = {
  activeEvent: null,
  eventList: [],
  setEventList: (events: IEvent[]) => {},
  addEvent: async (event: IEvent) => {},
  removeEvent: (eventUid: string) => {},
  getUserName: (uid: string) => "",
};

// Context oluştur
const EventContext = createContext<EventState>(initialState);

export const EventProvider = ({ children }: { children: ReactNode }) => {
  const [activeEvent, setActiveEvent] = useState<IEvent | null>(null);
  const [eventList, setEventList] = useState<IEvent[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  // Firestore'dan etkinlikleri çek
  useEffect(() => {
    fetchUsers();
    const q = query(collection(db, "calendar"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const eventList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as IEvent[];
      setEventList(eventList);
    });
    return () => unsubscribe();
  }, []);

  const fetchUsers = () => {
    const userRef = collection(db, "users");
    return onSnapshot(userRef, (snapshot) => {
      const users: IUser[] = [];
      snapshot.docs.forEach((doc) => {
        const { name, title } = doc.data();
        users.push({ name, title, uid: doc.id });
      });
      setUsers(users);
    });
  };

  const addEvent = async (event: IEvent) => {
    try {
      await addDoc(collection(db, "calendar"), event);
      setEventList((prev) => [...prev, event]);
      return;
    } catch (error) {
      console.error("Etkinlik eklerken hata oluştu: ", error);
      throw error;
    }
  };

  const removeEvent = (eventUid: string) => {
    setEventList((prev) => prev.filter((e) => e.id !== eventUid));
  };

  const getUserName = (uid: string): string => {
    const user = users.find((i) => i.uid === uid);
    return user ? `${user.title} ${user.name}` : "";
  };

  return (
    <EventContext.Provider
      value={{
        activeEvent,
        eventList,
        setEventList,
        addEvent,
        removeEvent,
        getUserName,
      }}
    >
      {children}
    </EventContext.Provider>
  );
};

// Custom hook
export const useEventContext = () => {
  const context = useContext(EventContext);
  if (!context) {
    throw new Error("useEventContext must be used within an AppProvider");
  }
  return context;
};
