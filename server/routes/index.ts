import express from "express";
import GameRoutes from "./game-routes";
const router = express.Router();

router.use(GameRoutes);

export default router;
