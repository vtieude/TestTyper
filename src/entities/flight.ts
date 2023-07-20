import { FlightInput } from "../models/flight";

export class Flight {
    id: number;
    ip_address: string;
    original_itinerary: FlightInput[];
    final_itinerary:     FlightInput[];    
    created_at: Date
}