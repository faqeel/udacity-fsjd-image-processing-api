import express, { Express } from 'express';
import 'dotenv/config';

import { HOST, PORT } from './config';
import imageRoute from './route/image.route';

const app: Express = express();

app.use('/api/1.0/images', imageRoute);

app.listen(PORT, () => {
    return console.log(`Server is listening at ${HOST}:${PORT}`);
});

export default app;
