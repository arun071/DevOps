import React, { useEffect, useState } from 'react';
import LinkCard from './LinkCard';
import { RefreshCw, Plus, Trash2 } from 'lucide-react';
import { ImportExportButtons } from './ImportExportButtons';
import { LinkFormModal } from './LinkFormModel';
import ConfirmModel from './ConfirmModel';

const LinkDashboard = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editLink, setEditLink] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);


  const fetchLinks = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8080/api/links/getAllLinks');
      const json = await res.json();
      setData(json);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };
    const clearAllLinks = async () => {
  setShowConfirmModal(false);
  setLoading(true);
  try {
    await fetch('http://localhost:8080/api/links/clearAllLinks', {
      method: 'DELETE',
    });
    await fetchLinks();
  } catch (error) {
    console.error('Error clearing links:', error);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchLinks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6 text-gray-900 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-wrap gap-4 items-center justify-between mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
            <span className="bg-blue-600 p-2 rounded-lg text-white shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-folder-open">
                <path d="M6 14a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2a2 2 0 0 0-2-2h-3.87a.29.29 0 0 1-.23-.11l-.84-1.26a2 2 0 0 0-3.22-.05L6 14Z"/>
                <path d="M2 7V4a2 2 0 0 1 2-2h7.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v3"/>
              </svg>
            </span>
            DevOps Link Dashboard
          </h1>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => {
                setEditLink(null);
                setShowModal(true);
              }}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-colors"
            >
              <Plus size={20} /> Add New Link
            </button>

            <button
  onClick={() => setShowConfirmModal(true)}
  className="flex items-center gap-2 px-5 py-2.5 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 transition-colors"
>
  <Trash2 size={20} /> 
  {/* Clear All */}
</button>
{showConfirmModal && (
  <ConfirmModel
    title="Clear All Links?"
    message="This will permanently delete all saved links. Are you sure?"
    onConfirm={clearAllLinks}
    onCancel={() => setShowConfirmModal(false)}
  />
)}


            

            <ImportExportButtons /> 

            <button
              onClick={fetchLinks}
              className="flex items-center gap-2 px-5 py-2.5 bg-white text-gray-700 font-semibold rounded-lg shadow-md border border-gray-200 hover:bg-gray-100 transition-colors"
            >
              <RefreshCw className={loading ? 'animate-spin' : ''} size={20} />
              Refresh
            </button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {Object.entries(data).map(([category, links]) => (
            <LinkCard 
              key={category} 
              category={category} 
              links={links} 
              onEdit={(link) => {
                setEditLink(link);
                setShowModal(true);
              }} 
            />
          ))}
        </div>

        {/* Empty State */}
        {Object.keys(data).length === 0 && !loading && (
          <div className="text-center text-gray-500 mt-16 p-6 bg-white rounded-lg shadow-md border border-gray-200">
            <p className="text-xl font-medium mb-4">No links available yet!</p>
            <p className="text-md">Click "Add New Link" to get started.</p>
          </div>
        )}

        {/* Link Form Modal */}
        {showModal && (
          <LinkFormModal
            onClose={() => setShowModal(false)}
            onSuccess={fetchLinks}
            editLink={editLink}
          />
        )}
      </div>
    </div>
  );
};

export default LinkDashboard;