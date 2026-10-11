export type Offer = {
  id: number;
  rideId: number;
  driverId: number;
  price: number;
  message: string | null;
  createdAt: string;
  updatedAt: string;
  driver: {
    id: number;
    username: string;
  };
  Ride: {
    passengerId: number;
  };
};
