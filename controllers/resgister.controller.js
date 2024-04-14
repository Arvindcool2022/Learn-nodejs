import bcrypt from 'bcrypt';
import User from '../model/user.model.js';
import connectToDB from '../config/connectToDB.js';

const handleRegister = async (req, res) => {
  try {
    await connectToDB();

    const { userName, password } = req.body;

    if (!userName || !password) {
      return res
        .status(400)
        .json({ message: 'userName and password are required' });
    }
    const alreadyExist = await User.findOne({ userName });
    if (alreadyExist)
      return res
        .status(409)
        .json({ message: `userName: ${userName} already exists` });

    const hashedPwd = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      roles: { user: 3000 },
      password: hashedPwd
    });

    await newUser.save();
    res.status(201).json('Registed');
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

export { handleRegister };
