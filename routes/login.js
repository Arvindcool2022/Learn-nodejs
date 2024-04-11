import express from 'express';
import { handleLogIn } from '../controllers/auth.controller.js';
import { notAllowed } from '../controllers/employee.controller.js';
const NA = ['*', notAllowed];
const router = express.Router();

router
  .post('/', handleLogIn)
  .get(...NA)
  .put(...NA)
  .delete(...NA);

export { router };
