
"use client";

import { useEffect, useState } from "react";
import { socket } from "@/lib/socket";
import type { Ride } from "@/type/ride.type";
import { useRouter } from "next/navigation";

export function useDriverSocket() {
  const [incomingRides, setIncomingRides] = useState<Ride[]>([]);
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

    const onNewRide = (data: Ride) => {
      console.log("New ride received:", data);

      setIncomingRides((previousRides) => {
        if (previousRides.some((ride) => ride.id === data.id)) {
          return previousRides;
        }

        return [data, ...previousRides];
      });
    };

    const onRideAcceptance = (data: Ride)=> {
      console.log("ride accepted",data)
      router.push(`/driver/dashboard/ride/${data.id}`)
      
    }

    const onRideStatusChange = (data:Ride) => {
      console.log("Ride status changed",data)
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("ride:created", onNewRide);
    socket.on("ride:accepted", onRideAcceptance)
    socket.on("ride:status_change", onRideStatusChange)

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off("ride:created", onNewRide);
      socket.off("ride:accepted", onRideAcceptance);
      socket.off("ride:status_change", onRideStatusChange)

    };
  }, [router]);

  return { incomingRides, setIncomingRides };
}
