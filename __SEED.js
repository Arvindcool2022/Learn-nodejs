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
    await connectToDB();
    await Employee.insertMany(employees);
    console.log('employees data seeded');
  } catch (error) {
    console.error(error);
  }
};

const seedUserData = async () => {
  try {
    const user = JSON.parse(readFileSync(userjsonPath, 'utf-8'));
    if (!user?.length) throw new Error('No data found in userData.json');
    await connectToDB();
    await User.insertMany(user);
    console.log('user data seeded');
  } catch (error) {
    console.error(error);
  }
};

seedEmployeeData();
seedUserData();
