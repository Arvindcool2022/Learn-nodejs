import bcrypt from 'bcrypt';
import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../model/user.model.js';
dotenv.config();

const handleLogIn = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password) {
    return res
      .status(400)
      .json({ message: 'userName and password are required' });
  }
  const findUser = await User.findOne({ userName });
  if (!findUser) {
    return res
      .status(401)
      .json({ message: `userName: ${userName} doesn't exists` });
  }

  const match = await bcrypt.compare(password, findUser.password);
  if (!match) return res.status(401).json({ error: 'invalid credentials' });
  const roles = Object.values(findUser.roles);
  const accessToken = JWT.sign(
    { userInfo: { userName, roles } },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: '60s' }
  );
  const refreshToken = JWT.sign(
    { userName },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: '1d' }
  );

  const updatedUser = await User.findOneAndUpdate(
    { userName },
    { $set: { refreshToken } },
    { new: true } // Return the updated document
  );
  res.cookie('jwt', refreshToken, {
    http: true,
    maxAge: 1000 * 60 * 60 * 24
  });
  res.json({ accessToken });
};

export { handleLogIn };
