import path from 'path';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/user.model.js';
import connectToDB from '../config/connectToDB.js';
import logEvent from '../middleware/logEvents.js';
dotenv.config();

export const handleRefreshToken = async (req, res) => {
  try {
    await connectToDB();

    const { cookies } = req;
    if (!cookies?.jwt) return res.sendStatus(401);

    const refreshToken = cookies.jwt;
    const findUser = await User.findOne({ refreshToken });
    if (!findUser) {
      res.clearCookie('jwt', { httpOnly: true });
      return res.sendStatus(403);
    }

    JWT.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      async (err, decoded) => {
        if (err || findUser?.userName !== decoded?.userName) {
          res.clearCookie('jwt', { httpOnly: true });
          const compromisedUser = await User.findOneAndUpdate(
            { userName: decoded?.userName },
            { refreshToken: null },
            { new: true }
          );
          logEvent(
            `compromisedUser: ${JSON.stringify(compromisedUser)}`,
            'securityBreach.txt'
          );
          return res.sendStatus(403);
        }

        const roles = Object.values(findUser.roles);

        const accessToken = JWT.sign(
          { userInfo: { userName: decoded.userName, roles } },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: '60s' }
        );
        const newRefreshToken = JWT.sign(
          { userName: decoded.userName },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: '1d' }
        );
        findUser.refreshToken = newRefreshToken;

        await findUser.save();

        res.clearCookie('jwt', { httpOnly: true });
        res.cookie('jwt', newRefreshToken, {
          httpOnly: true,
          maxAge: 1000 * 60 * 60 * 24
        });
        res.json(accessToken);
      }
    );
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error while verifying refresh token', error });
  }
};
