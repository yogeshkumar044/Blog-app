import { useEffect, useCallback, useContext, useRef } from 'react';
import StickyContext from '../Context/StickyHeaderContext';

const useStickyHeader = () => {
  const { isSticky, setIsSticky } = useContext(StickyContext);
  const lastScrollTop = useRef(0);

  const handleScroll = useCallback(() => {
    const currentScrollTop = window.scrollY;

    if (currentScrollTop > lastScrollTop.current) {
      setIsSticky(false); // Scrolling down
      console.log("scroll down")
    } else {
      setIsSticky(true); // Scrolling up
      console.log("scroll up")
    }

    lastScrollTop.current = currentScrollTop <= 0 ? 0 : currentScrollTop;
  }, [setIsSticky]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return {};
};

export default useStickyHeader;
