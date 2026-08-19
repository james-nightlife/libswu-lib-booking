import express from "express";
import {
  getUserByUsername
} from "../controllers/userControllers.js";
import { validateToken } from "../middlewares/tokenValidation.js";

const router = express.Router();

//router.get('/:username', getUserByUsername);

export default router;