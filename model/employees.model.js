import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
  employee_id: { type: Number, required: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  salary: { type: Number, required: true },
  hire_date: { type: Date, required: true }
});

const alreadyExists = mongoose.models?.Employee; //# Prevents Duplicate Models
const Employee = alreadyExists ?? mongoose.model('Employee', employeeSchema);

export default Employee;
