import React, { useEffect, useState } from 'react';
import Markdown from 'markdown-to-jsx';

const MarkdownRenderer = ({ filePath }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch(`${filePath}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${filePath}`);
        }
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error loading markdown content:', error);
      }
    };

    loadContent();
  }, [filePath]);

  return <Markdown options={{ forceBlock: true }}>{content}</Markdown>;
};

export default MarkdownRenderer;
