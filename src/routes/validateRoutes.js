import express from "express";
import { validateToken } from "../middlewares/tokenValidation.js";
import { validateEmails } from "../controllers/validateControllers.js";

const router = express.Router();

router.post('/emails', validateEmails);

export default router;