import express  from 'express';
import elementLibraryController from '../controllers/elementLibrary.controller';

const router = express.Router();

// GET - elementlib
router.get('/', elementLibraryController.get);

router.get("/testing",elementLibraryController.testing)

// GET - elementlib/:id
router.get('/:id', elementLibraryController.getById);

// POST - elementlib
// router.post('/', elementLibraryController.post);
// router.post('/', async (req: Request, res: Response) => {
//   let newUser = req.body as User;
//   UserMap(database);
//   const result = await User.create(newUser);
//   newUser = result.dataValues as User;
//   res.status(201).json({ user: newUser });
// });

export default router;