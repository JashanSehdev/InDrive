import { Vehicle } from "@/type/vehicle.type";
import SedanImage from "@/../public/car.png";
import BikeImage from '@/../public/bike.png'

export const vehicle : Vehicle[] = [
    {
        image : SedanImage,
        type : "Car",
        price : '1200',
        luggage : '2 bags',
        people : "3-4"
    },
    {
        image : BikeImage,
        type : "Bike",
        price : '50',
        luggage : '1bags',
        people : "1"
    }
]