import express from 'express';
import { handleRegister } from '../controllers/resgister.controller.js';
import { notAllowed } from '../controllers/employee.controller.js';
const NA = ['*', notAllowed];
const router = express.Router();

router
  .post('/', handleRegister)
  .get(...NA)
  .put(...NA)
  .delete(...NA);

export { router };
