import React, { useState, useEffect } from 'react';
import { Save, X } from 'lucide-react';

const InputModal = ({ placeholders = [], onSubmit, onCancel }) => {
  const [values, setValues] = useState({});

  useEffect(() => {
    const initialValues = {};
    placeholders.forEach(ph => {
      initialValues[ph] = '';
    });
    setValues(initialValues);
  }, [placeholders]);

  const handleChange = (key, val) => {
    setValues(prev => ({ ...prev, [key]: val }));
  };

  const handleSubmit = () => {
    onSubmit(values);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl relative transition-transform transform scale-100">
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
          onClick={onCancel}
          aria-label="Close modal"
        >
          <X size={22} />
        </button>

        {/* Modal Header */}
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Enter Values to Open Link
        </h2>

        <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className="space-y-5">
          {placeholders.map((ph) => (
            <div key={ph}>
              {/* <label className="block text-sm font-medium text-gray-700 mb-1">
                {ph}
              </label> */}
              <input
                type="text"
                className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
                placeholder={`Enter ${ph}`}
                value={values[ph]}
                onChange={(e) => handleChange(ph, e.target.value)}
                required
              />
            </div>
          ))}

          {/* Submit */}
          <button
            type="submit"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl px-4 py-3 flex items-center justify-center gap-2 w-full transition shadow-md"
          >
            <Save size={18} /> Open Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputModal;
