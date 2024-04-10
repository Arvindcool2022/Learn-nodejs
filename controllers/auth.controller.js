import path from 'path';
import bcrypt from 'bcrypt';
import { readFileSync } from 'fs';
const jsonPath = path.join(process.cwd(), 'model', 'userData.json');
const usersDB = {
  users: JSON.parse(readFileSync(jsonPath, 'utf8')),
  setUsers: function (data) {
    this.users = data;
  },
};
console.log(usersDB.users);

const handleLogIn = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: 'userName and password are required' });
  }
  const findUser = usersDB.users.find(per => per.userName === userName);
  if (!findUser) {
    return res
      .status(401)
      .json({ message: `userName: ${userName} doesn't exists` });
  }

  const match = await bcrypt.compare(password, findUser.password);
  if (match) {
    //TODO: JWT Token
    res.json({ success: `User ${userName} is logged in` });
  } else {
    res.status(401).json({ error: 'invalid credentials' });
  }
};

export { handleLogIn };
