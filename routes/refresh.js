import express from 'express';
import { handleRefreshToken } from '../controllers/refreshToken.controller.js';
import { notAllowed } from '../controllers/employee.controller.js';
const NA = ['*', notAllowed];
const router = express.Router();

router
  .get('/', handleRefreshToken)
  .post(...NA)
  .put(...NA)
  .delete(...NA);

export { router };
