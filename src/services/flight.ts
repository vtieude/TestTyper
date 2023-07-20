import { FlightRepos, instance } from '../db/flight';
import { FlightInput } from '../models/flight';
import { ReorderFlight } from '../util/helper';
class FlightService {
    private _flightRepo: FlightRepos;
  
    constructor(private flightRepoInput: FlightRepos) {
      this._flightRepo = flightRepoInput;
    }
    public async insertFlight(data: FlightInput[], ipAddress: string): Promise<any> {
        try {
            const reorderFlights = ReorderFlight(data);
            const input = {
                ip_address: ipAddress,
                original_itinerary: JSON.stringify(data),
                final_itinerary: JSON.stringify(reorderFlights)
            }
            const newId = await this._flightRepo.insert('flight', input);
            return {...reorderFlights, id: newId};
        } catch (error) {
            throw new Error(error.message);
        }
    }
}
export const flightService = new FlightService(instance);