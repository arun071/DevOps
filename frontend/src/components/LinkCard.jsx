import React, { useState } from "react";
import { Link2, Edit, Trash2 } from "lucide-react";
import InputModal from "./InputModel";


const LinkCard = ({ category, links, onEdit, onDelete }) => {
  const [modalData, setModalData] = useState(null); // { link, placeholders }

  const getPlaceholders = (url) => {
    const matches = url.match(/{([^}]+)}/g);
    return matches ? matches.map(m => m.replace(/[{}]/g, '')) : [];
  };

  const handleClick = (link) => {
    const placeholders = getPlaceholders(link.url);
    if (placeholders.length > 0) {
      setModalData({ link, placeholders });
    } else {
      window.open(link.url, "_blank", "noopener,noreferrer");
    }
  };

  const handleModalSubmit = (values) => {
    let finalUrl = modalData.link.url;
    for (const key in values) {
      finalUrl = finalUrl.replaceAll(`{${key}}`, encodeURIComponent(values[key]));
    }
    window.open(finalUrl, "_blank", "noopener,noreferrer");
    setModalData(null);
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-lg p-5 flex flex-col border border-gray-200 hover:shadow-xl transition-shadow duration-300">
        <h2 className="text-lg font-semibold mb-3 text-gray-800 pb-2">{category}</h2>

        <div className="space-y-2 overflow-y-auto max-h-64 pr-1 scrollbar-hide">
          {links.map((link) => (
            <div
              key={link.id}
              className="group flex justify-between items-center bg-gray-50 border border-gray-100 rounded-lg p-3 text-lg transition-all duration-200 hover:bg-gray-100 hover:border-gray-200"
            >
              <button
                type="button"
                onClick={() => handleClick(link)}
                className="flex items-center gap-2 truncate text-left text-gray-700 flex-grow focus:outline-none"
                title={link.title}
              >
                <Link2 size={19} className="text-blue-500 flex-shrink-0" />
                <span className="truncate group-hover:text-blue-600">{link.title}</span>
              </button>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  onClick={() => onEdit(link)}
                  className="text-gray-400 hover:text-blue-600 p-1 rounded-md hover:bg-blue-50 transition-colors"
                  title="Edit Link"
                >
                  <Edit size={16} />
                </button>
                {onDelete && (
                  <button
                    onClick={() => onDelete(link)}
                    className="text-gray-400 hover:text-red-600 p-1 rounded-md hover:bg-red-50 transition-colors"
                    title="Delete Link"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {links.length === 0 && (
          <div className="text-center text-gray-500 py-4 italic">No links in this category.</div>
        )}
      </div>

      {/* ⬇️ Runtime Modal for placeholders */}
      {modalData && (
        <InputModal
          placeholders={modalData.placeholders}
          onSubmit={handleModalSubmit}
          onCancel={() => setModalData(null)}
        />
      )}
    </>
  );
};

export default LinkCard;
