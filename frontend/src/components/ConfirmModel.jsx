// src/components/ConfirmModal.jsx
import React from 'react';
import { X, Trash2 } from 'lucide-react';

const ConfirmModal = ({ title, message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white p-6 rounded-2xl shadow-xl w-full max-w-md relative">
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
          onClick={onCancel}
        >
          <X size={22} />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <Trash2 className="text-red-500" size={28} />
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>

        <p className="text-gray-600 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            className="px-4 py-2 text-gray-600 hover:text-gray-800 rounded-lg border border-gray-300"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-red-600 text-white font-medium rounded-lg hover:bg-red-700"
            onClick={onConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
