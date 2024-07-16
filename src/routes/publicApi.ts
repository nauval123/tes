import express from "express";
import elementRoutes from "./element.routes";
import elementlibRoutes from "./elementlib.routes";
import usersRoutes from "./users.routes";
import connectionsRoutes from "./connections.routes";
import elementLibraryController from "../controllers/elementLibrary.controller";
import router from "./users.routes";
import elementController from "../controllers/element.controller";

export const apiRouter = express.Router();

apiRouter.use('/users', usersRoutes);

// elementslib
// apiRouter.use('/elementslib',elementlibRoutes);
apiRouter.get('/elementslib/', elementLibraryController.get);
apiRouter.get("/elementslib/testing",elementLibraryController.testing);
apiRouter.get('/elementslib/:id', elementLibraryController.getById);
apiRouter.post('/elementslib/',elementLibraryController.post);
apiRouter.put("/elementslib/:id",elementLibraryController.update);
apiRouter.delete("/:id",elementLibraryController.deleteById);


// apiRouter.use('/elements',elementRoutes);
apiRouter.get('/elements/',elementController.get);
apiRouter.get('/elements/:id', elementController.getById);
apiRouter.post('/elements/',elementController.post);
apiRouter.put("/elements/:id",elementController.update);
apiRouter.delete("/elements/:id",elementController.deleteById);



