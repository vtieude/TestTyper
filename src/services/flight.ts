import { FlightRepos, instance } from '../db/flight';
import { ValidateEmptyFlight } from '../util/validation';
class FlightService {
    private _flightRepo: FlightRepos;
  
    constructor(private flightRepo: FlightRepos) {
      this._flightRepo = flightRepo;
    }
    public async validateFlight(data: [string]): Promise<boolean> {
        if (ValidateEmptyFlight(data)) {

        };
        return false;
    }
    public async insertFlight(data: [string]): Promise<boolean> {
        this.flightRepo.insert('flight', data);
        return true;
    }
}
export const flightService = new FlightService(instance);