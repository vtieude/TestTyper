const express = require('express');
import {flightService} from '../services/flight';
import { ValidateFlight } from '../util/validation';
import { FlightInput } from '../models/flight';
const { getClientIp } = require('@supercharge/request-ip');

const routerExpress = express.Router();

routerExpress.post('/', async (req, res, next) => {
  const data = req.body.flights;
  try {
    const flightInput = data as FlightInput[];
    const messages = ValidateFlight(flightInput);
    if (messages.length) {
      return res.status(422).json({
        message: 'Adding the flight failed due to validation errors.',
        messages,
      });
    }
    const neworderFlight = await flightService.insertFlight(flightInput, getClientIp(req));
    res.status(201).json({ message: 'flights saved.', result: neworderFlight });
  } catch (error) {
    next(error);
  }
});



routerExpress.get('/:id', async (req, res, next) => {
  const flightId = req.params.id;
  try {
    const flightQuery = await flightService.getFlightById(flightId);
    res.status(200).json({ result: flightQuery });
  } catch (error) {
    next(error);
  }
});

export const flightRouter =  routerExpress;
