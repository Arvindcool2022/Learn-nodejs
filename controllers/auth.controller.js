import path from 'path';
import bcrypt from 'bcrypt';
import { readFileSync } from 'fs';
import { writeFile } from 'fs/promises';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const jsonPath = path.join(process.cwd(), 'model', 'userData.json');
const usersDB = {
  users: JSON.parse(readFileSync(jsonPath, 'utf8')),
  setUsers: function (data) {
    this.users = data;
  },
};

const handleLogIn = async (req, res) => {
  const { userName, password } = req.body;
  console.log(req.body);
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
    const accessToken = JWT.sign(
      { userName: findUser?.userName },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' }
    );
    const refreshToken = JWT.sign(
      { userName: findUser?.userName },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' }
    );
    const otherUser = usersDB.users.filter(
      per => per.userName !== findUser.userName
    );
    const currentUser = { ...findUser, refreshToken };
    usersDB.setUsers([...otherUser, currentUser]);
    await writeFile(jsonPath, JSON.stringify(usersDB.users));
    res.cookie('jwt'.refreshToken, { http: true, maxAge: 1000 * 60 * 60 * 24 });
    res.json({ accessToken });
  } else {
    res.status(401).json({ error: 'invalid credentials' });
  }
};

export { handleLogIn };
