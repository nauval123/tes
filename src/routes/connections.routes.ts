import express  from 'express';
import connectionController from '../controllers/connection.controller';
// import multer from 'multer';

const router = express.Router();
// const upload = multer();

// GET - elementlib
router.get('/', connectionController.get);

// GET - elementlib/:id
router.get('/:id', connectionController.getById);

// POST - elementlib
router.post('/',connectionController.post);

// PUT  - elementlib
router.put("/:id",connectionController.update);


// DELETE  - elementlib
router.delete("/:id",connectionController.deleteById);

export default router;