import express from 'express';
import auth from '../middleware/auth.js';
import Note from '../models/Note.js';

const router = express.Router();

// Create note
router.post('/', auth, async (req, res) => {
  try {
    const { title, content, pinned } = req.body;
    const note = new Note({ user: req.user.id, title, content, pinned });
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Get user's notes with optional search query
router.get('/', auth, async (req, res) => {
  try {
    const q = req.query.q || '';
    const filter = { user: req.user.id };
    if (q) filter.$or = [{ title: { $regex: q, $options: 'i' } }, { content: { $regex: q, $options: 'i' } }];
    const notes = await Note.find(filter).sort({ pinned: -1, createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Update note
router.put('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    const { title, content, pinned } = req.body;
    note.title = title ?? note.title;
    note.content = content ?? note.content;
    note.pinned = pinned ?? note.pinned;
    await note.save();
    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

// Delete note
router.delete('/:id', auth, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.user.toString() !== req.user.id) return res.status(401).json({ msg: 'Not authorized' });
    await note.remove();
    res.json({ msg: 'Note removed' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});

export default router;
