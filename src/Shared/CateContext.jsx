import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const CategoryContext = createContext(null);
const CateContext = ({ children }) => {
  const [category, setCategory] = useState("");

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CateContext;
