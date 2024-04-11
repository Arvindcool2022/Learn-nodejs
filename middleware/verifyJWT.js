import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.sendStatus(401);
};
