import path from 'path';
import JWT from 'jsonwebtoken';
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

export const handleRefreshToken = (req, res) => {
  try {
    const { cookie } = req;
    if (!cookie?.jwt) return res.sendStatus(401);
    console.log(cookie.jwt);

    const refreshToken = cookie.jwt;
    const findUser = usersDB.users.find(
      per => per.refreshToken === refreshToken
    );
    if (!findUser) return res.sendStatus(403);

    JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || findUser?.userName !== decoded?.userName)
          return res.sendStatus(403);

        const accessToken = JWT.sign(
          { userName: decoded.userName },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '60s' }
        );

        res.json(accessToken);
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error while verifying refresh token', error });
  }
};
