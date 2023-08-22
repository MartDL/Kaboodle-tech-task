import React, { createContext, useContext, useEffect, useState } from "react";
import data from "../data/accommodation.json";
import rooms from "../data/accommodation_availability.json";

type Room = {
  id: number;
  max_occupancy: number;
  min_occupancy: number;
  name: string;
  type: string;
  price: Price;
  available?: number;
  total?: number;
};

type Price = {
  price: string;
  value: number;
  currency_exponent: number;
  currency_id: number;
  currency_iso_code: string;
};

type Facilities = {
  label: string;
  id: number;
};

type Accommodation = {
  id: number;
  image: string;
  rooms: Room[];
  accommodationName: string;
  description: string;
  accommodationType: string;
  facilities: Facilities[];
};

type RoomContextType = {
  allRooms: Accommodation[] | undefined;
};

const RoomContext = createContext<RoomContextType | undefined>(undefined);

export type { Accommodation };

export const useRoomContext = () => {
  const context = useContext(RoomContext);
  if (!context) {
    throw new Error("useRoomContext must be used within a RoomProvider");
  }
  return context;
};

type RoomProviderProps = {
  children: React.ReactNode;
};

export const RoomProvider: React.FC<RoomProviderProps> = ({ children }) => {
  const [allRooms, setAllRooms] = useState<Accommodation[]>();

  useEffect(() => {
    const roomAvailabilityMap = new Map();
    for (const room of rooms.rooms) {
      roomAvailabilityMap.set(room.id, room);
    }

    const updatedAccommodations = data.accommodations.map((accommodation) => {
      const updatedRooms = accommodation.rooms.map((room) => {
        const availabilityInfo = roomAvailabilityMap.get(room.id);
        if (availabilityInfo) {
          return { ...room, ...availabilityInfo };
        }
        return room;
      });
      return { ...accommodation, rooms: updatedRooms };
    });

    const updated = updatedAccommodations.map((item) => {
      return {
        id: item.id,
        accommodationName: item.name,
        description: item.description,
        accommodationType: item.type.name,
        image: item.images[0].filename,
        facilities: item.facilities.map((item) => item),
        rooms: item.rooms.map((item) => item),
      };
    });

    setAllRooms(updated);
  }, []);

  const contextValue: RoomContextType = {
    allRooms,
  };

  return (
    <RoomContext.Provider value={contextValue}>{children}</RoomContext.Provider>
  );
};
