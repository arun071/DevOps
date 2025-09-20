import React from 'react';
import { Upload, Download } from 'lucide-react';

export const ImportExportButtons = () => {

const handleExport = async () => {
  try {
    
    const res = await fetch('http://localhost:8080/api/links/getAllLinks');
    const data = await res.json();
    const convertedData = {};

    for (const [categoryName, items] of Object.entries(data)) {
      convertedData[categoryName] = items.map(item => ({
        title: item.title || '',
        url: item.url   || ''
      }));
    }

    const blob = new Blob([JSON.stringify(convertedData, null, 2)], {
      type: 'application/json'
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'links-export.json';
    link.click();
    URL.revokeObjectURL(url);
  } catch (err) {
    console.error('Export failed:', err);
  }
};



  const handleImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const text = await file.text();
      const importedData = JSON.parse(text);

      for (const categoryName of Object.keys(importedData)) {
        // Create category
        const catRes = await fetch('http://localhost:8080/api/categories', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: categoryName })
        });

        const createdCategory = await catRes.json();

        // Add each link under the new category
        for (const link of importedData[categoryName]) {
          await fetch(`http://localhost:8080/api/links/${createdCategory.id}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(link)
          });
        }
      }

      alert('Import successful!');
      window.location.reload(); // Refresh to show new data
    } catch (err) {
      console.error('Import failed:', err);
      alert('Import failed. Check console for error.');
    }
  };

  return (
    <div className="flex gap-2">
      <label className="cursor-pointer bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-xl flex items-center gap-1">
        <Upload size={16} />
        Import
        <input
          type="file"
          accept=".json"
          onChange={handleImport}
          className="hidden"
        />
      </label>
      <button
        onClick={handleExport}
        className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-xl flex items-center gap-1"
      >
        <Download size={16} />
        Export
      </button>
    </div>
  );
};
