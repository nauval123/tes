import bodyParser from "body-parser";
import express  from "express";
import cors from "cors";
import usersRoutes from "../routes/users.routes";
import elementlibRoutes from "../routes/elementlib.routes";
import elementRoutes from "../routes/element.routes";
import connectionRoutes from "../routes/connections.routes";
import database from "../database";
import { initSequelize } from "../sequelize/sequelize_init";
import { errorMiddleware } from "../middleware/error.middleware";

const api = express();
initSequelize(database);

api.use(cors());

api.use(bodyParser.json());
// api.use(bodyParser.urlencoded({ extended: true }));
api.use('/users', usersRoutes);
api.use('/elementslib',elementlibRoutes);
api.use('/elements',elementRoutes);
api.use('/connections',connectionRoutes);
// api.use('/elements', usersRoutes);
// api.use('/diagrams', usersRoutes);
// api.use('/connections', usersRoutes);
api.use(errorMiddleware);


export default api;