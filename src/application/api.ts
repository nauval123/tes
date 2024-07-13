import bodyParser from "body-parser";
import express  from "express";
import usersRoutes from "../routes/users.routes";
import elementlibRoutes from "../routes/elementlib.routes";
import database from "../database";
import { initModel } from "../models/init.model";

const api = express();
initModel(database);

api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));
api.use('/users', usersRoutes);
api.use('/elementslib',elementlibRoutes);
// api.use('/elements', usersRoutes);
// api.use('/diagrams', usersRoutes);
// api.use('/connections', usersRoutes);

export default api;