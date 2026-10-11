
"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import type { Ride } from "@/type/ride.type";

export function useDriverSocket() {
  const [incomingRides, setIncomingRides] = useState<Ride[]>([]);

  useEffect(() => {
    const onConnect = () => {
      console.log("Socket connected:", socket.id);
    };

    const onDisconnect = (reason: string) => {
      console.log("Socket disconnected:", reason);
    };

    const onConnectError = (error: Error) => {
      console.error("Socket connection error:", error.message);
    };

    const onNewRide = (data: Ride) => {
      console.log("New ride received:", data);

      setIncomingRides((previousRides) => {
        if (previousRides.some((ride) => ride.id === data.id)) {
          return previousRides;
        }

        return [data, ...previousRides];
      });
    };

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("ride:created", onNewRide);

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off("ride:created", onNewRide);
    };
  }, []);

  return { incomingRides, setIncomingRides };
}
