import { Router } from 'express';
import {
  addEmp,
  allEmp,
  deleteOne,
  getOne,
  notAllowed,
  updateOne,
} from '../../controllers/employee.controller.js';
import { ROLES_LIST } from '../../config/roles.js';
import { verifyRoles } from '../../middleware/verifyRoles.js';
const router = Router();
const { admin, editor, user } = ROLES_LIST;
router
  .route('/')
  .get(allEmp)
  .post(verifyRoles(admin, editor), addEmp)
  .put(notAllowed)
  .delete(notAllowed);
router
  .route('/:id')
  .get(getOne)
  .delete(verifyRoles(admin), deleteOne)
  .put(verifyRoles(admin, editor), updateOne);

export { router };
