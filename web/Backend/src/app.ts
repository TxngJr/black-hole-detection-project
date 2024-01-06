import './config/database';
import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoute from './routes/user.route';
import holdRoute from './routes/hold.route';
import machineRoute from './routes/machine.route';
import governmentRoute from './routes/government.route';


const app: Application = express();

dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const { PORT } = process.env;

app.use('/users', userRoute);
app.use('/holds', holdRoute);
app.use('/machines', machineRoute);
app.use('/governments', governmentRoute);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});