import 'dotenv/config';
import express from 'express';

import router from './api/routes/router';

const app = express();
const port =  process.env.PORT;

app.use('/api/v1', router);

app.listen(port, () => {
    console.log(`Running at port: [${port}]`);
});
