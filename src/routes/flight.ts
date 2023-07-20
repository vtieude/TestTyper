const express = require('express');
import {flightService} from '../services/flight';
import { ValidateFlight } from '../util/validation';
import { FlightInput } from '../models/flight';
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
    const ipAddress = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const neworderFlight = await flightService.insertFlight(flightInput, ipAddress);
    res.status(201).json({ message: 'flights saved.', result: neworderFlight });
  } catch (error) {
    next(error);
  }
});

export const flightRouter =  routerExpress;
