import express from "express";
import {
  signIn
} from "../controllers/authControllers.js";
import { validateToken } from "../middlewares/tokenValidation.js";

const router = express.Router();

router.post('/', signIn);

export default router;