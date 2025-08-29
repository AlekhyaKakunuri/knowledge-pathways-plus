import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Always start at top when navigating to any page
    // No scroll restoration - fresh start every time
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
