const express = require('express');
import {flightService} from '../services/flight';

const routerExpress = express.Router();

routerExpress.post('/', async (req, res, next) => {
  const data = req.body.flights;
  try {
    await flightService.validateFlight(data);
    await flightService.insertFlight(data);
    res.status(201).json({ message: 'flights saved.', contact: data });
  } catch (error) {
    next(error);
  }
});

export const flightRouter =  routerExpress;
