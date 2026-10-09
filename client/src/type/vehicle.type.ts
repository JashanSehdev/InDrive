import { StaticImageData } from "next/image"

export type Vehicle = {
    type : string,
    image : string | StaticImageData,
    price  : string,
    luggage : string,
    people : string
}