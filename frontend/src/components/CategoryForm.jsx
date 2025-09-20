import React, { useState } from 'react';
import { Plus } from 'lucide-react';

export const CategoryForm = ({ onSuccess }) => {
  const [name, setName] = useState('');

  const handleCreate = async () => {
    if (!name.trim()) return;
    await fetch('http://localhost:8080/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name })
    });
    setName('');
    onSuccess();
  };

  return (
    <div className="flex gap-2 items-center">
      <input
        type="text"
        placeholder="New category"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="p-2 border rounded-xl"
      />
      <button onClick={handleCreate} className="bg-green-600 hover:bg-green-700 text-white rounded-xl px-3 py-2 flex items-center gap-1">
        <Plus size={16} />
        Add
      </button>
    </div>
  );
};
