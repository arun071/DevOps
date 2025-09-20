import React, { useState, useEffect } from 'react';
import { X, Save } from 'lucide-react';

export const LinkFormModal = ({ onClose, onSuccess, editLink }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    url: '',
    categoryId: '',
    newCategory: ''
  });

  useEffect(() => {
    fetch('http://localhost:8080/api/categories')
      .then(res => res.json())
      .then(setCategories)
      .catch(err => console.error('Category load error', err));
  }, []);

  useEffect(() => {
    if (editLink) {
      setFormData({
        title: editLink.title,
        url: editLink.url,
        categoryId: editLink.category.id,
        newCategory: ''
      });
    }
  }, [editLink]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let categoryId = formData.categoryId;

    if (formData.newCategory) {
      const res = await fetch('http://localhost:8080/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: formData.newCategory })
      });
      const newCat = await res.json();
      categoryId = newCat.id;
    }

    if (editLink) {
      await fetch(`http://localhost:8080/api/links/${editLink.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          url: formData.url,
          category: { id: categoryId }
        })
      });
    } else {
      await fetch(`http://localhost:8080/api/links/${categoryId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          url: formData.url
        })
      });
    }

    onSuccess();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl relative transition-transform transform scale-100">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
          onClick={onClose}
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {editLink ? 'Edit Link' : 'Add New Link'}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link Title</label>
            <input
              type="text"
              placeholder="Enter a title"
              className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Link URL</label>
            <input
              type="url"
              placeholder="https://example.com"
              className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Select Category</label>
            <select
              className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value, newCategory: '' })}
            >
              <option value="">-- Choose Existing --</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className="text-center text-gray-500 font-medium">OR</div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Add New Category</label>
            <input
              type="text"
              placeholder="e.g., Dev Tools"
              className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={formData.newCategory}
              onChange={(e) => setFormData({ ...formData, newCategory: e.target.value, categoryId: '' })}
            />
          </div>

          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-4 py-3 flex items-center justify-center gap-2 w-full transition shadow-md"
          >
            <Save size={18} /> {editLink ? 'Update Link' : 'Save Link'}
          </button>
        </form>
      </div>
    </div>
  );
};
