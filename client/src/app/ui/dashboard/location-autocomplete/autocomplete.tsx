import "@geoapify/geocoder-autocomplete/styles/minimal.css";
import {
  GeoapifyContext,
  GeoapifyGeocoderAutocomplete
} from "@geoapify/react-geocoder-autocomplete";
import { UseFormSetValue } from "react-hook-form";
import { SetRideInput } from "../dashboard";

type Prop = {
    setValue : UseFormSetValue<SetRideInput>
    name : "pickup" | "drop"
}
export function AddressField({setValue, name} : Prop) {
  return (
    <GeoapifyContext apiKey={process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}>
      <GeoapifyGeocoderAutocomplete
        placeholder="Enter an address"
        limit={5}
        debounceDelay={400}
        placeSelect={(feature) => {
          console.log(feature)
          const setLocation = {

            location :` ${feature?.properties.address_line1}, ${feature?.properties.address_line2} `,
            latitude : feature?.properties.lat,
            longitude : feature?. properties.lon
          }

          setValue(name , setLocation)
        }}
      />
    </GeoapifyContext>
  );
}