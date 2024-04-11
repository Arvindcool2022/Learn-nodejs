import path from 'path';
import bcrypt from 'bcrypt';
import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';
const jsonPath = path.join(process.cwd(), 'model', 'userData.json');
const usersDB = {
  users: JSON.parse(readFileSync(jsonPath, 'utf8')),
  setUsers: function (data) {
    this.users = data;
  },
};
const handleRegister = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: 'userName and password are required' });
  }
  const alreadyExist = usersDB.users.find(per => per.userName === userName);
  if (alreadyExist)
    return res
      .status(409)
      .json({ message: `userName: ${userName} already exists` });

  try {
    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = { userName, password: hashedPwd };
    usersDB.setUsers([...usersDB.users, newUser]);
    await writeFile(jsonPath, JSON.stringify(usersDB.users));
    res.status(201).json('ok');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export { handleRegister };
