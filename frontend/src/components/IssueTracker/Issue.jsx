import React, { useEffect, useState } from "react";

export default function Issue() {
  const [issues, setIssues] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    description: "",
    status: "OPEN",
    priority: "MEDIUM",
    assignedTo: "",
    threadLink: "",
  });
  const [showForm, setShowForm] = useState(false);

  // Fetch issues
  useEffect(() => {
    fetch("http://localhost:8080/api/issues")
      .then((res) => res.json())
      .then((data) => setIssues(data))
      .catch((err) => console.error("Error fetching issues:", err));
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle submit (Add / Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();

    const method = formData.id ? "PUT" : "POST";
    const url = formData.id
      ? `http://localhost:8080/api/issues/${formData.id}`
      : "http://localhost:8080/api/issues";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const updatedIssue = await response.json();

        if (formData.id) {
          // Update issue in list
          setIssues((prev) =>
            prev.map((issue) =>
              issue.id === updatedIssue.id ? updatedIssue : issue
            )
          );
        } else {
          // Add new issue to list
          setIssues((prev) => [...prev, updatedIssue]);
        }

        // Reset form
        setFormData({
          id: null,
          title: "",
          description: "",
          status: "OPEN",
          priority: "MEDIUM",
          assignedTo: "",
          threadLink: "",
        });
        setShowForm(false);
      } else {
        alert("Failed to save issue.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Load issue into form for editing
  const handleEdit = (issue) => {
    setFormData(issue);
    setShowForm(true);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Issues</h1>

      {/* Toggle button */}
      <button
        onClick={() => setShowForm(!showForm)}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
      >
        {showForm ? "Back to Issues" : "Add Issue"}
      </button>

      {/* Form */}
      {showForm ? (
        <div className="bg-white p-6 rounded-2xl shadow-md max-w-lg">
          <h2 className="text-xl font-bold mb-4">
            {formData.id ? "Edit Issue" : "Create Issue"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block font-medium">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block font-medium">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block font-medium">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              >
                <option value="OPEN">OPEN</option>
                <option value="IN_PROGRESS">IN_PROGRESS</option>
                <option value="CLOSED">CLOSED</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Priority</label>
              <select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
              </select>
            </div>

            <div>
              <label className="block font-medium">Assigned To</label>
              <input
                type="text"
                name="assignedTo"
                value={formData.assignedTo}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <div>
              <label className="block font-medium">Thread Link</label>
              <input
                type="url"
                name="threadLink"
                value={formData.threadLink}
                onChange={handleChange}
                className="w-full border rounded-lg p-2"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-500 text-white font-semibold py-2 rounded-lg hover:bg-green-600"
            >
              {formData.id ? "Update Issue" : "Create Issue"}
            </button>
          </form>
        </div>
      ) : (
        /* List View */
        <ul className="space-y-4">
          {issues.map((issue) => (
            <li
              key={issue.id}
              className="p-4 bg-white rounded-2xl shadow-md border hover:shadow-lg transition"
            >
              <h2 className="text-lg font-semibold">{issue.title}</h2>
              <p className="text-gray-600">{issue.description}</p>
              <div className="mt-2 text-sm text-gray-500">
                <p>
                  <span className="font-medium">Status:</span> {issue.status}
                </p>
                <p>
                  <span className="font-medium">Priority:</span>{" "}
                  {issue.priority}
                </p>
                <p>
                  <span className="font-medium">Assigned To:</span>{" "}
                  {issue.assignedTo}
                </p>
                <p>
                  <span className="font-medium">Created At:</span>{" "}
                  {new Date(issue.createdAt).toLocaleString()}
                </p>
                {issue.updatedAt && (
                  <p>
                    <span className="font-medium">Updated At:</span>{" "}
                    {new Date(issue.updatedAt).toLocaleString()}
                  </p>
                )}
                {issue.threadLink && (
                  <a
                    href={issue.threadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View Thread
                  </a>
                )}
              </div>

              <button
                onClick={() => handleEdit(issue)}
                className="mt-3 px-3 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
