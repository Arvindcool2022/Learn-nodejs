import path from 'path';
import { writeFile } from 'fs/promises';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
dotenv.config();

const jsonPath = path.join(process.cwd(), 'model', 'userData.json');
const usersDB = {
  users: JSON.parse(readFileSync(jsonPath, 'utf8')),
  setUsers: function (data) {
    this.users = data;
  },
};

export const handleLogout = async (req, res) => {
  try {
    const { cookie } = req;
    console.log(cookie);
    if (!cookie?.jwt) return res.sendStatus(204);
    const refreshToken = cookie.jwt;
    const findUser = usersDB.users.find(
      per => per.refreshToken === refreshToken
    );
    if (!findUser) {
      res.clearCookie('jwt', { httpOnly: true });
      return res.sendStatus(204);
    }

    const otherUser = usersDB.users.filter(
      per => per.refreshToken !== refreshToken
    );
    const currentUser = { ...findUser, refreshToken: null };
    usersDB.setUsers([...otherUser, currentUser]);
    await writeFile(jsonPath, JSON.stringify(usersDB.users));
    res.clearCookie('jwt', { httpOnly: true });
    res.sendStatus(204);
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error while verifying refresh token', error });
  }
};