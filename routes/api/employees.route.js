import { Router } from 'express';
import {
  addEmp,
  allEmp,
  deleteOne,
  getOne,
  notAllowed,
  updateOne,
} from '../../controllers/employee.controller.js';
const router = Router();

router.route('/').get(allEmp).post(addEmp).put(notAllowed).delete(notAllowed);
router.route('/:id').get(getOne).delete(deleteOne).put(updateOne);

export { router };
