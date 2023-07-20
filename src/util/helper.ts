import { FlightInput } from "../models/flight";

export function ReorderFlight(data: FlightInput[]): FlightInput[] {
    let startFlight = FindTheStartFlight(data);
    const orderedFlights : FlightInput[] = [startFlight];
    while(orderedFlights.length < data.length) {
        var nextFlight = FindNextDestination(data, orderedFlights[orderedFlights.length - 1]);
        if (!nextFlight) {
            startFlight = FindTheStartFlight(data.filter(item => !orderedFlights.some(ordered => ordered.from === item.from && ordered.to === item.to)));
            orderedFlights.push(startFlight);
            nextFlight = FindNextDestination(data, startFlight);
        }
        orderedFlights.push(nextFlight);
    }
    return orderedFlights;
}
function FindNextDestination(data: FlightInput[], currentFlight: FlightInput): FlightInput {
    return data.filter(item => currentFlight.to === item.from)[0];
}
function FindTheStartFlight(data: FlightInput[]) {
    const desFlights = data.map(item => item.to);
    const startFlight = data.filter(item => !desFlights.some(to=> to === item.from));
    if (startFlight.length) {
        return startFlight[0];
    }
    return  data[0];

}