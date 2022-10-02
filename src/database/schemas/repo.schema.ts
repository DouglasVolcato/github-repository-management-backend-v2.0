import mongoose from 'mongoose';

const repoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  link: { type: String, required: true },
  priority: { type: String, required: true },
  deadline: { type: String, required: true },
  note: { type: String, required: true },
});

export default repoSchema;
