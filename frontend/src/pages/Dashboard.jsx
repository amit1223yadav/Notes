import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';

const API = (import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api';

function NoteCard({ note, onDelete, onEdit }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="p-4 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-lg transition"
    >
      <div className="flex flex-col sm:flex-row justify-between gap-3">
        <div>
          <h3 className="font-semibold text-lg text-gray-800">
            {note.title || 'Untitled'}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{note.content}</p>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <button
            onClick={() => onEdit(note)}
            className="text-sm px-3 py-1 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="text-sm px-3 py-1 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition"
          >
            Delete
          </button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState(null);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      window.location.href = '/login';
      return;
    }
    fetchNotes();
  }, []);

  async function fetchNotes(q = '') {
    try {
      const res = await fetch(
        API + '/notes' + (q ? '?q=' + encodeURIComponent(q) : ''),
        { headers: { Authorization: 'Bearer ' + token } }
      );
      const data = await res.json();

      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        }
        throw data;
      }

      setNotes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch notes error:', err);
      setNotes([]);
    }
  }

  async function addNote(e) {
    e.preventDefault();
    try {
      const res = await fetch(API + '/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      if (!res.ok) throw data;
      setNotes((prev) => [data, ...prev]);
      setTitle('');
      setContent('');
    } catch (err) {
      alert(err.msg || 'Error adding note');
    }
  }

  async function deleteNote(id) {
    if (!confirm('Delete this note?')) return;
    try {
      const res = await fetch(API + '/notes/' + id, {
        method: 'DELETE',
        headers: { Authorization: 'Bearer ' + token },
      });
      const data = await res.json();
      if (!res.ok) throw data;
      setNotes((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      alert(err.msg || 'Delete failed');
    }
  }

  function startEdit(note) {
    setEditing(note);
    setTitle(note.title || '');
    setContent(note.content || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function submitEdit(e) {
    e.preventDefault();
    try {
      const res = await fetch(API + '/notes/' + editing._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token,
        },
        body: JSON.stringify({ title, content }),
      });
      const data = await res.json();
      if (!res.ok) throw data;
      setNotes((prev) =>
        prev.map((n) => (n._id === data._id ? data : n))
      );
      setEditing(null);
      setTitle('');
      setContent('');
    } catch (err) {
      alert(err.msg || 'Update failed');
    }
  }

  function cancelEdit() {
    setEditing(null);
    setTitle('');
    setContent('');
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-yellow-50">
      <header className="bg-white/70 backdrop-blur sticky top-0 z-10 shadow-sm">
        <Navbar />
      </header>
      <main className="max-w-5xl mx-auto p-4">
        <motion.div
          layout
          className="bg-white/90 backdrop-blur-lg rounded-2xl shadow-md p-6 mb-6"
        >
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            {editing ? 'Edit Note' : 'Create a Note'}
          </h2>
          <form
            onSubmit={editing ? submitEdit : addNote}
            className="flex flex-col gap-4"
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 transition"
              placeholder="Title"
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-purple-400 transition"
              placeholder="Content"
              rows="4"
            />
            <div className="flex flex-col sm:flex-row gap-2 items-center">
              <button
                type="submit"
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-semibold rounded-lg shadow-md transition transform hover:scale-105"
              >
                {editing ? 'Update' : 'Add'}
              </button>
              {editing && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
              )}
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  fetchNotes(e.target.value);
                }}
                placeholder="Search notes..."
                className="ml-auto border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-400 transition mt-2 sm:mt-0"
              />
            </div>
          </form>
        </motion.div>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {Array.isArray(notes) && notes.length > 0 ? (
              notes.map((n) => (
                <NoteCard
                  key={n._id}
                  note={n}
                  onDelete={deleteNote}
                  onEdit={startEdit}
                />
              ))
            ) : (
              <p className="text-gray-500 col-span-full text-center">
                No notes found.
              </p>
            )}
          </AnimatePresence>
        </section>
      </main>
    </div>
  );
}
