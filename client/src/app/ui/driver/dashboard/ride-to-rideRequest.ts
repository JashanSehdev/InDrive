import type { Ride, RideRequest } from "@/type/ride.type";

export function toRideRequest(ride: Ride): RideRequest {
  return {
    id: ride.id,
    passengerName: ride.passenger.username,
    pickup: ride.pickup.location.trim(),
    pickupAddress: ride.pickup.location.trim(),
    drop: ride.drop.location.trim(),
    dropAddress: ride.drop.location.trim(),
    rating: 0,
    totalRides: 0, 
    distance: 0,
    duration: 0,
    price: ride.price,
    requestedAt: new Date(ride.createdAt).toLocaleTimeString(),
  };
}