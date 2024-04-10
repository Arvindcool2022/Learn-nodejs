import express from 'express';
import { handleLogIn } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/', handleLogIn);

export { router };
