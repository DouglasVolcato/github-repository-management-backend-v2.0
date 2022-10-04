import mongoose from 'mongoose';
import repoSchema from './repo.schema';
import securityKey from './securityKey.schema';

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, reqired: true, unique: true },
  password: { type: String, reqired: true, select: false },
  photo: { type: String },
  repositories: [repoSchema],
  securityKeys: [securityKey],
});

export const userModel = mongoose.model('User', userSchema);
