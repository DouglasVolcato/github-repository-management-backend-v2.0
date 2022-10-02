import mongoose from 'mongoose';

const securityKey = new mongoose.Schema({
  reference: { type: String, required: true },
  key: { type: String, required: true },
});

export default securityKey;
