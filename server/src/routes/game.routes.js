import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import { saveGameResult, getUserGameHistory } from "../controllers/game.controller.js";

const router = express.Router();

router.post("/save", authMiddleware, saveGameResult);
router.get("/history", authMiddleware, getUserGameHistory);

export default router;
