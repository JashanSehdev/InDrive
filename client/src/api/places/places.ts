import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request : NextRequest) {
    const query = request.nextUrl.searchParams.get("q")?.trim()

    if (!query || query.length < 3){
        return NextResponse.json({ results : [] })
    }

    const apiKey = process.env.GEOAPIFY_API_KEY

    if (!apiKey){
        return NextResponse.json(
            { message : 'Geocoding Api key is not configured'},
            { status : 500}
        )
    }

    try {
        const response = await axios.get(
            "https://api.geoapify.com/v1/geocode/autocomplete",
            {
                params: {
                    text: query,
                    format : "json",
                    limit : 5,
                    filter :  "countrycode:in",
                    apiKey
                }
            }
        )

        const results = (response.data.results ?? []).map((
            place : {
                place_id : string
            }
        ))
    }
}