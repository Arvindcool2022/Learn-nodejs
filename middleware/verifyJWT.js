import JWT from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export const verifyJWT = (req, res, next) => {
  const authHeader =
    req.headers['authorization'] ?? req.headers['Authorization'];
  if (!authHeader?.startsWith('Bearer')) return res.sendStatus(401);
  console.log(authHeader);
  const token = authHeader.split(' ').at(1);
  JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err) return res.sendStatus(403);
    console.log('decoded: ', decoded);
    const { userName, roles } = decoded.userInfo;
    req.user = userName;
    req.roles = roles;
  });
  next();
};
