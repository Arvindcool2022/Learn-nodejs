import path from 'path';
import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';
const data = {};
const jsonPath = path.join(
  process.cwd(),
  'public',
  'data',
  'employeesData.json'
);
data.employees = JSON.parse(readFileSync(jsonPath, 'utf-8'));
const requiredFields = Object.keys(data.employees[0]);

export const allEmp = (req, res) => {
  res.json(data.employees);
};

export const addEmp = (req, res) => {
  if (data.employees.map(x => x.employee_id).includes(req.body.employee_id)) {
    res.status(400).json({ error: 'Employee ID already exists' });
    return;
  }
  if (!validateEmployee(req.body)) {
    res.status(400).json({ error: 'Please send valid details' });
    return;
  }
  data.employees.push(req.body);
  res.json(req.body);
  updateJSON(jsonPath, JSON.stringify(data.employees));
};

export const getOne = (req, res) => {
  const index = data.employees
    .map(x => x.employee_id)
    .indexOf(parseInt(req.params.id));
  if (index !== -1) {
    const [resData] = data.employees.filter(
      x => x?.employee_id === parseInt(req.params.id)
    );
    res.json(resData);
  } else res.status(400).json({ error: "Employee ID doesn't exists" });
};

export const updateOne = (req, res) => {
  if (!Object.entries(req.body).length) {
    res.status(400).json({ error: 'Empty Body received' });
    return;
  }
  if (!requiredFields.includes(...Object.keys(req.body))) {
    res.status(405).json({ error: 'Invalid Data' });
    return;
  }
  const index = data.employees
    .map(x => x.employee_id)
    .indexOf(parseInt(req.params.id));
  if (index !== -1) {
    data.employees[index] = { ...data.employees[index], ...req.body };
    res.json(data.employees[index]);
    updateJSON(jsonPath, JSON.stringify(data.employees));
  } else res.status(400).json({ error: "Employee ID doesn't exists" });
};

export const deleteOne = (req, res) => {
  const index = data.employees
    .map(x => x.employee_id)
    .indexOf(parseInt(req.params.id));
  console.log(index);
  if (index === -1) {
    res.status(400).json({ error: "Employee ID doesn't exists" });
    return;
  } else {
    const newData = data.employees;
    const deletedData = data.employees.splice(index, 1);
    data.employees = newData;
    res.json(deletedData);
    updateJSON(jsonPath, JSON.stringify(data.employees));
  }
};

export const notAllowed = (req, res) => {
  res.status(405).json({ error: 'Invalid Method' });
};

function validateEmployee(employee) {
  // Check if all fields exist
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

async function updateJSON(filePath, fileData) {
  try {
    await writeFile(filePath, fileData);
  } catch (error) {
    console.log(error);
  }
}
