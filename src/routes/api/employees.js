import { Router } from 'express';
import path from 'path';
import { readFileSync, writeFileSync } from 'fs';

const router = Router();
const data = {};
const jsonPath = path.join(
  process.cwd(),
  'public',
  'data',
  'employeesData.json'
);
data.employees = JSON.parse(readFileSync(jsonPath, 'utf-8'));
console.log(data.employees.filter(x => x?.employee_id === 1));
router
  .route('/')
  .get((req, res) => {
    res.json(data.employees);
  })
  .post((req, res) => {
    if (data.employees.map(x => x.employee_id).includes(req.body.employee_id)) {
      res.status(400).json({ error: 'Employee ID already exists' });
      return; // Stop execution to prevent further processing
    }
    if (!validateEmployee(req.body)) {
      res.status(400).json({ error: 'Please send valid details' });
      return; // Stop execution to prevent further processing
    }
    data.employees.push(req.body);
    writeFileSync(jsonPath, JSON.stringify(data.employees));
    res.json(req.body);
  })
  .put((req, res) => {});

router.route('/:id').get((req, res) => {
  const [resData] = data.employees.filter(
    x => x?.employee_id === parseInt(req.params.id)
  );
  res.json(resData);
});

export { router };

function validateEmployee(employee) {
  // Check if all fields exist
  const requiredFields = [
    'employee_id',
    'first_name',
    'last_name',
    'date_of_birth',
    'email',
    'department',
    'salary',
    'hire_date'
  ];
  for (const field of requiredFields) {
    if (!employee.hasOwnProperty(field)) return false; // Field is missing
  }

  // Check if fields have the correct type
  if (
    typeof employee.employee_id !== 'number' ||
    typeof employee.first_name !== 'string' ||
    typeof employee.last_name !== 'string' ||
    typeof employee.date_of_birth !== 'string' || // Assuming date_of_birth is a string in MM/DD/YYYY format
    typeof employee.email !== 'string' ||
    typeof employee.department !== 'string' ||
    typeof employee.salary !== 'number' ||
    typeof employee.hire_date !== 'string' // Assuming hire_date is a string in MM/DD/YYYY format
  )
    return false;

  // Additional validation for date_of_birth and hire_date format can be added here if needed

  return true;
}
