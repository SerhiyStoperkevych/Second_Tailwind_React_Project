import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";
import { postBusiness, getBusiness } from "../controllers/businessController";

const router = Router();

router.get('/', getBusiness);
router.post('/', authMiddleware, postBusiness);

export default router;