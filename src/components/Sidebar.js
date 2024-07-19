import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiFolder,
  FiFile,
  FiChevronDown,
  FiChevronRight,
} from 'react-icons/fi';

const Sidebar = ({ routes }) => {
  const [openFolders, setOpenFolders] = useState({});

  const toggleFolder = (folder) => {
    setOpenFolders((prev) => ({
      ...prev,
      [folder]: !prev[folder],
    }));
  };

  const renderRoutes = (routes) => {
    const folderMap = {};
    routes.forEach((route) => {
      const parts = route.path.split('/');
      const folder = parts.slice(0, -1).join('/');
      const file = parts[parts.length - 1];
      if (!folderMap[folder]) {
        folderMap[folder] = [];
      }
      folderMap[folder].push({
        file,
        path: route.path,
        isFile: !route.path.endsWith('index'),
      });
    });

    return Object.keys(folderMap).map((folder) => (
      <div key={folder}>
        <div className="folder" onClick={() => toggleFolder(folder)}>
          {openFolders[folder] ? <FiChevronDown /> : <FiChevronRight />}
          <FiFolder />
          {folder.split('/').pop()}
        </div>
        {openFolders[folder] && (
          <div className="folder-contents">
            {folderMap[folder].map((item) =>
              item.isFile ? (
                <Link key={item.path} to={item.path} className="file">
                  <FiFile />
                  {item.file}
                </Link>
              ) : (
                <div key={item.path} className="file index-file">
                  <FiFile />
                  {item.file}
                </div>
              )
            )}
          </div>
        )}
      </div>
    ));
  };

  return <div className="sidebar">{renderRoutes(routes)}</div>;
};

export default Sidebar;
