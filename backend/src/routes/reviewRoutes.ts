import { getReview, postReview } from "../controllers/reviewController";
import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware";

const router = Router();

router.get('/businessId', getReview);
router.post('/', authMiddleware, postReview);

export default router;