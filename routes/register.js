import express from 'express';
import { handleRegister } from '../controllers/resgister.controller.js';
const router = express.Router();

router.post('/', handleRegister);

export { router };
