import express  from 'express';
import elementLibraryController from '../controllers/elementLibrary.controller';
import { errorMiddleware } from '../middleware/error.middleware';
// import multer from 'multer';

const router = express.Router();
// const upload = multer();

// GET - elementlib
router.get('/', elementLibraryController.get);

router.get("/testing",elementLibraryController.testing);

// GET - elementlib/:id
router.get('/:id', elementLibraryController.getById);

// POST - elementlib
router.post('/',elementLibraryController.post);

// PUT  - elementlib
router.put("/:id",elementLibraryController.update);


// DELETE  - elementlib
router.delete("/:id",elementLibraryController.deleteById);


router.use(errorMiddleware);
export default router;