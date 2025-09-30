import mongoose from 'mongoose';

const NoteSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String },
  content: { type: String },
  pinned: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model('Note', NoteSchema);
