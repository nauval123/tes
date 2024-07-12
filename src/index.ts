import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import { Request, Response } from 'express';
import { port } from './config';
import usersRoutes from './routes/users.routes';

import api from './application/api';


// const port = 3000;
// const app = express();
// app.use('/users', usersRoutes);

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// app.get("/messages", (req, res) => {
//   res.send("Hello");
// });

// app.get('/', async (req: Request, res: Response) => {
//   res.status(200).json({
//     message: 'Hello World'
//   });
// });

const server = http.createServer(api);
server.listen(port, () => {
  console.log(`API started at http://localhost:${port}`);
});