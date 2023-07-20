import express from 'express';
require('dotenv').config();
const bodyParser = require('body-parser');
import { flightRouter } from './routes/flight';
const app = express();

app.use(bodyParser.json());
app.use('/flight', flightRouter);

const port = process.env.PORT ?? 5000
app.listen(port, () => {
  console.log('Server is running on port', port);
});