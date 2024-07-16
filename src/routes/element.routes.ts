import express from "express";
import elementController from "../controllers/element.controller";
// import userController from "../controller/user-controller.js";
// import contactController from "../controller/contact-controller.js";
// import addressController from "../controller/address-controller.js";
// import {authMiddleware} from "../middleware/auth-middleware.js";

const router = express.Router();
// elementRouter.use(authMiddleware);

// ElementLibrary API
router.get('/',);

// GET - elementlib/:id
router.get('/:id', elementController.getById);

// POST - elementlib
router.post('/',elementController.post);

// PUT  - elementlib
router.put("/:id",elementController.update);


// DELETE  - elementlib
router.delete("/:id",elementController.deleteById);

export default router;