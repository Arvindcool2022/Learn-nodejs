const whitelist = [
  'https://www.google.com',
  'http://127.0.0.1:5500',
  'http://localhost:1234',
];
export const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};
