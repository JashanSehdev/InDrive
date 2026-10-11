"use client";

import { useCallback, useEffect, useState } from "react";
import { socket } from "@/lib/socket";

export type Offer = {
  id: number;
  rideId: number;
  driverId: number;
  price: number;
  status?: "PENDING" | "ACCEPTED" | "REJECTED";
};

export function useOffers(rideId: number) {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const handleConnected = () => {
      console.log("Socket connected:", socket.id);
    };

    const handleDisconnected = (reason: string) => {
      console.log("Socket disconnected:", reason);
    };

    const handleConnectionError = (error: Error) => {
      console.error("Socket connection error:", error.message);
    };

    const handleOfferCreated = (offer: Offer) => {
       
      if (Number(offer.rideId) !== Number(rideId)) return;
        console.log(offer)
      setOffers((previous) => {
        if (previous.some((item) => item.id === offer.id)) {
          return previous;
        }

        return [offer, ...previous];
      });
    };

    const handleOfferUpdated = (updatedOffer: Offer) => {
      if (Number(updatedOffer.rideId) !== Number(rideId)) return;

      setOffers((previous) =>
        previous.map((offer) =>
          offer.id === updatedOffer.id
            ? { ...offer, ...updatedOffer }
            : offer,
        ),
      );
    };

    socket.on("connect", handleConnected);
    socket.on("disconnect", handleDisconnected);
    socket.on("connect_error", handleConnectionError);
    socket.on("offer:created", handleOfferCreated);
    socket.on("offer:updated", handleOfferUpdated);

    if (!socket.connected) {
      socket.connect();
    }

    return () => {
      socket.off("connect", handleConnected);
      socket.off("disconnect", handleDisconnected);
      socket.off("connect_error", handleConnectionError);
      socket.off("offer:created", handleOfferCreated);
      socket.off("offer:updated", handleOfferUpdated);
    };
  }, [rideId]);

  const acceptOffer = useCallback((offerId: number) => {
    socket.emit("accept-offer", { offerId });
  }, []);

  const rejectOffer = useCallback((offerId: number) => {
    socket.emit("reject-offer", { offerId });
  }, []);

  return {
    offers,
    setOffers,
    acceptOffer,
    rejectOffer,
  };
}