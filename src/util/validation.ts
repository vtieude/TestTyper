import { FlightInput } from "../models/flight";

export function ValidateFlight(data: FlightInput[]): string {
    if (!data.length) {
        return "Empty flight";
    }
    
    if (!IsValidInputFlight(data)) {
        return "Invalid flight input";
    }

    if (!IsUniqueDestinationFlight(data)) {
        return "Douple destination flight";
    }
    if (IsOrphanFlight(data)) {
        return "Orphan flight";
    }
    return "";
}
function IsValidInputFlight(data: FlightInput[]) {
    return data.length === data.filter(item => !!item.from && !!item.to).length;
}
function IsUniqueDestinationFlight(data: FlightInput[]) {
    const desFlight = data.map(item => item.to);
    return desFlight.length === new Set(desFlight).size;
}
function IsOrphanFlight(data: FlightInput[]) {
    const fromFlights = data.map(item => item.from);
    const toFlights = data.map(item => item.to);
    return data.some(item => fromFlights.filter(flight => flight === item.to).length < 1 && toFlights.filter(flight => flight === item.from).length < 1);
}