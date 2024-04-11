import express from 'express';
import { handleLogout } from '../controllers/logout.controller.js';
import { notAllowed } from '../controllers/employee.controller.js';
const NA = ['*', notAllowed];
const router = express.Router();

router
  .get('/', handleLogout)
  .post(...NA)
  .put(...NA)
  .delete(...NA);

export { router };
