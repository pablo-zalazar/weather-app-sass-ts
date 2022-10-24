import { Router } from "express";
import * as videoController from "../controllers/city.controller";

const router = Router();

router.get("/videos/:name", videoController.getCity);
router.post("/videos", videoController.postCity);

export default router;
