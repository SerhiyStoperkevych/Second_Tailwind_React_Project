import { getUser, postUser, loginUser } from "../controllers/userController";
import { Router } from "express";

const router = Router();

router.get('/', getUser);
router.post('/', postUser);
router.post('/login', loginUser);

export default router;