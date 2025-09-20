import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import LinkDashboard from './components/LinkDashboard';
import KanbanBoard from './KanbanBoard';
import PageNotFound from './components/PageNotFound';
import Time from './components/TimeZone/Time';
import Issue from './components/IssueTracker/Issue';
export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans antialiased"> {/* Slightly darker background, better font rendering */}
        <nav className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg px-6 py-4 flex flex-col sm:flex-row justify-between items-center text-white">
          <Link to="/" className="text-2xl font-extrabold mb-3 sm:mb-0 hover:scale-105 transition-transform duration-200">
            Web App
          </Link>
          <div className="flex space-x-6 text-lg">
            <Link 
              to="/" 
              className="hover:text-blue-200 transition-colors duration-200 relative group"
            >
              Dashboard
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link 
              to="/todo" 
              className="hover:text-blue-200 transition-colors duration-200 relative group"
            >
              Todo
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
                 <Link 
              to="/issue" 
              className="hover:text-blue-200 transition-colors duration-200 relative group"
            >
              Issue
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
            <Link 
              to="/time" 
              className="hover:text-blue-200 transition-colors duration-200 relative group"
            >
              TimeZone
              <span className="absolute left-0 bottom-0 w-full h-0.5 bg-blue-200 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
            </Link>
          </div>
        </nav>

        <main className="p-4 sm:p-6 lg:p-8"> {/* Increased padding for larger screens */}
          <Routes>
            <Route path="/" element={<LinkDashboard />} />
            <Route path="/todo" element={<KanbanBoard />} />
            <Route path="/time" element={<Time />} />
            <Route path="/issue" element={<Issue />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}