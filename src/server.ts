import express, { Request, Response, NextFunction } from 'express';

require('dotenv').config();
const bodyParser = require('body-parser');
import { db } from './db/db';
import { flightRouter } from './routes/flight';
const app = express();

app.use(bodyParser.json());
app.use('/flight', flightRouter);
// Error middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
db.connectDb().then((result) => {
  const port = process.env.PORT ?? 5000
  app.listen(port, () => {
    console.log('Server is running on port', port);
  });
})
