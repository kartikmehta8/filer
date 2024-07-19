import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MarkdownRenderer from './MarkdownRenderer';
import Sidebar from './Sidebar';
import routes from '../public/routes.json';
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Sidebar routes={routes} />
        <div className="content-container max-w-4xl">
          <Routes>
            <Route
              path="/"
              element={
                <h1 className="text-2xl font-bold text-gray-800">
                  A Docusaurus Alternative based on React, Tailwind & Parcel
                </h1>
              }
            />
            {routes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <Suspense fallback={<div>Loading...</div>}>
                    <MarkdownRenderer filePath={route.file} />
                  </Suspense>
                }
              />
            ))}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
