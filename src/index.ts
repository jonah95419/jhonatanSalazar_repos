import express, { Express } from 'express';
import dotenv from 'dotenv';

import { config } from './config/config';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

config(app).listen(port, () => {
  console.info(`Server (localhost:${port}): \x1b[32m%s\x1b[0m`, 'online');
});