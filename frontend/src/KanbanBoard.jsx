import React, { useState, useEffect } from 'react'; 

import { X,Plus, Edit2, Trash2, Calendar, User, Flag } from 'lucide-react';

const KanbanBoard = () => {
  const [columns, setColumns] = useState([
    { id: 'todo', title: 'To Do', status: 'todo', color: 'bg-blue-100 border-blue-300', tasks: [] },
    { id: 'in-progress', title: 'In Progress', status: 'in-progress', color: 'bg-yellow-100 border-yellow-300', tasks: [] },
    { id: 'done', title: 'Done', status: 'done', color: 'bg-green-100 border-green-300', tasks: [] }
  ]);

  const [isAddingTask, setIsAddingTask] = useState(null);
  const [editingTask, setEditingTask] = useState(null);
  const [draggedTask, setDraggedTask] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/tasks")
      .then(res => res.json())
      .then(data => {
        const updatedColumns = columns.map(column => ({
          ...column,
          tasks: data.filter(task => task.status === column.status)
        }));
        setColumns(updatedColumns);
      });
  }, []);

  const handleDragStart = (e, task) => {
    setDraggedTask(task);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, targetStatus) => {
    e.preventDefault();
    if (!draggedTask || draggedTask.status === targetStatus) return;

    const updatedTask = { ...draggedTask, status: targetStatus };

    fetch(`http://localhost:8080/api/tasks/${draggedTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask)
    })
      .then(res => res.json())
      .then(savedTask => {
        const updatedColumns = columns.map(column => {
          if (column.status === draggedTask.status) {
            return {
              ...column,
              tasks: column.tasks.filter(task => task.id !== draggedTask.id)
            };
          }
          if (column.status === targetStatus) {
            return {
              ...column,
              tasks: [...column.tasks, savedTask]
            };
          }
          return column;
        });
        setColumns(updatedColumns);
        setDraggedTask(null);
      });
  };

  const addTask = (columnStatus, taskData) => {
    const newTask = {
      ...taskData,
      status: columnStatus,
      createdAt: new Date().toISOString()
    };

    fetch("http://localhost:8080/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    })
      .then(res => res.json())
      .then(savedTask => {
        const updatedColumns = columns.map(column =>
          column.status === columnStatus
            ? { ...column, tasks: [...column.tasks, savedTask] }
            : column
        );
        setColumns(updatedColumns);
        setIsAddingTask(null);
      });
  };

  const updateTask = (updatedTask) => {
    fetch(`http://localhost:8080/api/tasks/${updatedTask.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask)
    })
      .then(res => res.json())
      .then(savedTask => {
        const updatedColumns = columns.map(column => ({
          ...column,
          tasks: column.tasks.map(task =>
            task.id === savedTask.id ? savedTask : task
          )
        }));
        setColumns(updatedColumns);
        setEditingTask(null);
      });
  };

  const deleteTask = (taskId) => {
    fetch(`http://localhost:8080/api/tasks/${taskId}`, {
      method: "DELETE"
    }).then(() => {
      const updatedColumns = columns.map(column => ({
        ...column,
        tasks: column.tasks.filter(task => task.id !== taskId)
      }));
      setColumns(updatedColumns);
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Kanban Board</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {columns.map(column => (
            <div key={column.id} className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className={`${column.color} border-b-2 p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-lg font-semibold text-gray-800">{column.title}</h2>
                  <span className="bg-white px-2 py-1 rounded-full text-sm text-gray-600">{column.tasks.length}</span>
                </div>
                <button
                  onClick={() => setIsAddingTask(column.status)}
                  className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  <Plus size={16} /> Add Task
                </button>
              </div>

              <div
                className="p-4 space-y-3 min-h-96"
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, column.status)}
              >
                {column.tasks.map(task => (
                  <div
                    key={task.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, task)}
                    className="bg-white border border-gray-200 rounded-lg p-4 cursor-move hover:shadow-md group"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 group-hover:text-blue-600">{task.title}</h3>
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                        <button onClick={() => setEditingTask(task)} className="text-gray-400 hover:text-blue-600">
                          <Edit2 size={14} />
                        </button>
                        <button onClick={() => deleteTask(task.id)} className="text-gray-400 hover:text-red-600">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{task.description}</p>

                    <div className="flex gap-2 mb-2">
                      <span className={`px-2 py-1 text-xs border rounded-full ${getPriorityColor(task.priority)}`}>
                        <Flag size={10} className="inline mr-1" /> {task.priority}
                      </span>
                      {task.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full">{tag}</span>
                      ))}
                    </div>

                    <div className="flex justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1"><User size={12} /> {task.assignee}</div>
                      <div className="flex items-center gap-1"><Calendar size={12} /> {new Date(task.dueDate).toLocaleDateString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {isAddingTask && (
          <TaskModal
            isOpen={!!isAddingTask}
            onClose={() => setIsAddingTask(null)}
            onSave={(taskData) => addTask(isAddingTask, taskData)}
            title="Add New Task"
          />
        )}

        {editingTask && (
          <TaskModal
            isOpen={!!editingTask}
            onClose={() => setEditingTask(null)}
            onSave={updateTask}
            task={editingTask}
            title="Edit Task"
          />
        )}
      </div>
    </div>
  );
};

const TaskModal = ({ isOpen, onClose, onSave, task, title }) => {
  const [formData, setFormData] = useState({
    title: task?.title || '',
    description: task?.description || '',
    priority: task?.priority || 'medium',
    assignee: task?.assignee || '',
    dueDate: task?.dueDate || '',
    tags: task?.tags?.join(', ') || ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const taskData = {
      ...formData,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };

    if (task) {
      onSave({ ...task, ...taskData });
    } else {
      onSave(taskData);
    }
  };

  if (!isOpen) return null;

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    //   <div className="bg-white rounded-xl max-w-md w-full p-6">
    //     <h2 className="text-xl font-bold mb-4">{title}</h2>
    //     <form onSubmit={handleSubmit} className="space-y-4">
    //       <input type="text" placeholder="Title" required className="w-full border px-3 py-2 rounded" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
    //       <textarea placeholder="Description" className="w-full border px-3 py-2 rounded" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} />
    //       <div className="grid grid-cols-2 gap-4">
    //         <select className="border px-3 py-2 rounded" value={formData.priority} onChange={(e) => setFormData({ ...formData, priority: e.target.value })}>
    //           <option value="low">Low</option>
    //           <option value="medium">Medium</option>
    //           <option value="high">High</option>
    //         </select>
    //         <input type="date" className="border px-3 py-2 rounded" value={formData.dueDate} onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })} />
    //       </div>
    //       <input type="text" placeholder="Assignee" className="w-full border px-3 py-2 rounded" value={formData.assignee} onChange={(e) => setFormData({ ...formData, assignee: e.target.value })} />
    //       <input type="text" placeholder="Tags (comma separated)" className="w-full border px-3 py-2 rounded" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} />

    //       <div className="flex gap-2">
    //         <button type="button" onClick={onClose} className="flex-1 border px-4 py-2 rounded">Cancel</button>
    //         <button type="submit" className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Save Task</button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
  <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-xl relative transition-transform transform scale-100">
    <button
      className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition"
      onClick={onClose}
      aria-label="Close modal"
    >
      <X size={22} />
    </button>

    <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">{title}</h2>

    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
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
        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
        <textarea
          placeholder="Enter a description"
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
          <select
            className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={formData.priority}
            onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={formData.dueDate}
            onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
        <input
          type="text"
          placeholder="Assignee"
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={formData.assignee}
          onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
        <input
          type="text"
          placeholder="e.g. frontend, urgent"
          className="w-full border border-gray-300 p-3 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          value={formData.tags}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
        />
      </div>

      <div className="flex gap-4 mt-6">
        <button
          type="button"
          onClick={onClose}
          className="flex-1 border border-gray-300 px-4 py-3 rounded-xl text-gray-700 hover:bg-gray-100 transition"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl font-semibold shadow-md transition"
        >
          Save Task
        </button>
      </div>
    </form>
  </div>
</div>

  );
};

export default KanbanBoard;