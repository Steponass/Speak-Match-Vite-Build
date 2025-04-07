import { useEffect } from 'react';

export const ViewTransition = ({ children }) => {
  useEffect(() => {
    // Add this to enable view transitions globally
    document.documentElement.classList.add('view-transition');
  }, []);

  return children;
};