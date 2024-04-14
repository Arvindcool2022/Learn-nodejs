import connectToDB from '../config/connectToDB.js';
import Employee from '../model/employees.model.js';

export const allEmp = async (req, res) => {
  try {
    await connectToDB();
    const data = await Employee.find({});
    if (!data.length)
      return res.status(204).json({ message: 'No employees found' });

    res.json(data);
  } catch (error) {
    console.error('Error retrieving employees:', error);
    res.status(500).json({ message: 'Error retrieving employees' });
  }
};

export const addEmp = async (req, res) => {
  try {
    await connectToDB();
    const employeeData = await Employee.findOne({
      employee_id: req?.body?.employee_id
    });
    if (employeeData)
      return res.status(409).json({ error: 'Employee ID already exists' });

    const newEmployee = new Employee(req.body);
    await newEmployee.save();
    res.json(newEmployee);
  } catch (error) {
    console.error('Error adding employee:', error);
    // Handle validation errors specifically
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in error.errors) {
        validationErrors[field] = error.errors[field].message;
      }
      return res
        .status(400)
        .json({ message: 'Validation errors', errors: validationErrors });
    } else return res.status(500).json({ message: 'Error adding employee' });
  }
};

export const getOne = async (req, res) => {
  try {
    const employeeData = await Employee.findOne({
      employee_id: req.params.id
    });
    if (employeeData) res.json(employeeData);
    else res.status(400).json({ error: "Employee ID doesn't exists" });
  } catch (err) {
    console.error(
      `error while retriving employee data id:${req.params.id}`,
      err
    );
    res.status(500).json({ message: 'Error adding employee' });
  }
};

export const updateOne = async (req, res) => {
  try {
    const query = { employee_id: req.params.id };
    const options = { new: true };
    const employeeData = await Employee.findOneAndUpdate(
      query,
      req.body,
      options
    );
    if (!employeeData)
      return res.status(400).json({ error: "Employee ID doesn't exists" });
    else return req.json(employeeData);
  } catch (error) {
    console.error(
      `error while updating employee data id:${req.params.id}`,
      err
    );
    res.status(500).json({ message: 'Error updating employee' });
  }
};

export const deleteOne = async (req, res) => {
  try {
    const deletedData = await Employee.findOneAndDelete({
      employee_id: req.params.id
    });
    if (!deleteOne)
      return res.status(400).json({ error: "Employee ID doesn't exists" });
    else res.status(200).json({ deletedData });
  } catch (err) {
    console.error(
      `error while deleting employee data id:${req.params.id}`,
      err
    );
    res.status(500).json({ message: 'Error deleting employee' });
  }
};

export const notAllowed = (req, res) =>
  res.status(405).json({ error: 'Invalid Method' });
