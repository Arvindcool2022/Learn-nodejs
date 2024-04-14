import path from 'path';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/user.model.js';
import connectToDB from '../config/connectToDB.js';
dotenv.config();

export const handleRefreshToken = async (req, res) => {
  try {
    const connected = await connectToDB();
    if (!connected) throw new Error('DB no connected');

    const { cookies } = req;
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;
    const findUser = await User.findOne({ refreshToken });
    if (!findUser) return res.sendStatus(403);

    JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (err, decoded) => {
        if (err || findUser?.userName !== decoded?.userName)
          return res.sendStatus(403);
        const roles = Object.values(findUser.roles);

        const accessToken = JWT.sign(
          { userInfo: { userName: decoded.userName, roles } },
          process.env.ACCESS_TOKEN_SECRET,
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
