import dotenv from 'dotenv';
import connectToDB from '../config/connectToDB.js';
import User from '../model/user.model.js';
dotenv.config();

export const handleLogout = async (req, res) => {
  try {
    await connectToDB();

    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204);
    const refreshToken = cookies.jwt;
    const findUser = await User.findOne({ refreshToken });

    if (!findUser) {
      res.clearCookie('jwt', { httpOnly: true });
      return res.sendStatus(204);
    }

    await User.findOneAndUpdate({ refreshToken }, { refreshToken: null });
    res.clearCookie('jwt', { httpOnly: true });
    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: 'Error while Logout refresh token', error });
  }
};
