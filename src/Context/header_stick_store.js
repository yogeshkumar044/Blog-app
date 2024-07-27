import React, { useState} from 'react';

import StickyContext from './StickyHeaderContext';

export const StickyProvider = ({ children }) => {
  const [isSticky, setIsSticky] = useState(false);


  return (
    <StickyContext.Provider value={{ isSticky, setIsSticky }}>
      {children}
    </StickyContext.Provider>
  );
};

export default StickyProvider;