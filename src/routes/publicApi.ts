import express from "express";
import elementRoutes from "./element.routes";
import elementlibRoutes from "./elementlib.routes";
import usersRoutes from "./users.routes";
import connectionsRoutes from "./connections.routes";
import elementLibraryController from "../controllers/elementLibrary.controller";
import router from "./users.routes";
import elementController from "../controllers/element.controller";
import connectionController from "../controllers/connection.controller";

export const apiRouter = express.Router();

apiRouter.use('/users', usersRoutes);

// elementslib section
// apiRouter.use('/elementslib',elementlibRoutes);
    // mendapatkan elementlibrary untuk element listbar
apiRouter.get('/elementslib/', elementLibraryController.get);
    // 
apiRouter.get("/elementslib/testing",elementLibraryController.testing);
apiRouter.get('/elementslib/:id', elementLibraryController.getById);
apiRouter.post('/elementslib/',elementLibraryController.post);
apiRouter.put("/elementslib/:id",elementLibraryController.update);
apiRouter.delete("/elementslib/:id",elementLibraryController.deleteById);
// elementslib section

// elements section
apiRouter.get('/elements/:id', elementController.getById);
apiRouter.post('/elements/createTest',elementController.testCreate);
    // create dari elment list
apiRouter.post('/elements/create',elementController.CreateElementFromElementlist);
    // dapatkan semua element yang ada pada diagram tertentu
    //====
    // create bulk  
apiRouter.post('/elements/bulkcreate',elementController.CreateBulkElement);    
    //=====
apiRouter.get('/elements/getAll/:diagram_id',elementController.getElementindDiagram)
    //=== 
apiRouter.post('/elements/',elementController.post);
apiRouter.put('/elements/updateAttribute/:id',elementController.updateOccurence);
    // update element position width
apiRouter.put('/elements/updateStyle/:id',elementController.updateElementStyle);
// apiRouter.delete("/elements/:id",elementController.deleteById);
apiRouter.delete("/elements/delete/:id",elementController.deleteElementFromCanvas);
apiRouter.post("/elements/bulkdelete",elementController.deleteBulkElementFromCanvas);
// ====== element section

// connection
apiRouter.get('/connection/diagram/:diagram_id', connectionController.getAllConnectionInDiagram);
apiRouter.get('/connection/:id', connectionController.getConnectionById);
apiRouter.post('/connection/create/',connectionController.makeConnection);
apiRouter.put("/connection/:id",connectionController.updateAttributeConnection);
apiRouter.delete("/connection/:id",connectionController.deleteConnectionById);
apiRouter.post("/connection/bulkdelete",connectionController.deleteBulkConnection);

// diagram
apiRouter.get('/diagram/:id', connectionController.getConnectionById);
apiRouter.put("/diagram/:id",connectionController.updateAttributeConnection);

