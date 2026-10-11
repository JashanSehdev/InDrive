export type RideLocation = {
  latitude: number;
  longitude: number;
  location: string;
};

export type Ride = {
  id: number;
  passengerId: number;
  driverId: number | null;
  pickup: RideLocation;
  drop: RideLocation;
  price: number;
  cab_type: "economy" | "premium" | "luxury";
  status: "pending" | "accepted" | "completed" | "cancelled";
  passenger: Passenger;
  createdAt: string;
  updatedAt: string;
};

export type RideRequest = {
  id: number;
  passengerName: string;
  passengerImage?: string;
  rating: number;
  totalRides: number;
  pickup: string;
  pickupAddress: string;
  drop: string;
  dropAddress: string;
  distance: number;
  duration: number;
  price: number;
  requestedAt: string;
};

export type Passenger = {
  id : number,
  username : string
}

export type Rides = Ride[];