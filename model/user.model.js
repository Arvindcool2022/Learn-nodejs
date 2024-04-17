import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const userSchema = new Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  roles: {
    admin: { type: Number, default: 5050 },
    editor: Number,
    user: Number,
  },
  refreshToken: { type: String, default: null },
});

const alreadyExists = mongoose.models?.User; //# Prevents Duplicate Models
const User = alreadyExists ?? mongoose.model('User', userSchema);
export default User;
