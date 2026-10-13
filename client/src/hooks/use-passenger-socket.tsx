
"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import type { Ride } from "@/type/ride.type";
import { useRouter } from "next/navigation";

export function usePassengerSocket() {
  const [ride, setRide] = useState<Ride | null>(null);
  const router = useRouter()
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

    const onRideStatusChange = (data:Ride) => {
      console.log("Ride status changed",data)
      setRide(data)
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("ride:status_change", onRideStatusChange)

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off("ride:status_change", onRideStatusChange)

    };
  }, [router]);

  return { ride, setRide };
}
