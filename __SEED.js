import path from 'path';
import { readFileSync } from 'fs';
import connectToDB from './config/connectToDB.js';
import Employee from './model/employees.model.js';
import User from './model/user.model.js';
const jsonPath = path.join(process.cwd(), 'model', 'employeesData.json');
const userjsonPath = path.join(process.cwd(), 'model', 'userData.json');

const seedEmployeeData = async () => {
  try {
    const employees = JSON.parse(readFileSync(jsonPath, 'utf-8'));
    if (!employees?.length)
      throw new Error('No data found in employeesData.json');
    const connected = await connectToDB();
    if (connected) await Employee.insertMany(employees);
    else throw new Error('DB no connected');

    console.log('employees data seeded');
  } catch (error) {
    console.error(error);
  }
};

const seedUserData = async () => {
  try {
    const user = JSON.parse(readFileSync(userjsonPath, 'utf-8'));
    if (!user?.length) throw new Error('No data found in userData.json');
    const connected = await connectToDB();
    if (connected) await User.insertMany(user);
    else throw new Error('DB no connected');
    console.log('user data seeded');
  } catch (error) {
    console.error(error);
  }
};

seedEmployeeData();
seedUserData();
