import { createContext, useState } from "react";

export const CategoryContext = createContext(null);
const CatContext = ({ children }) => {
  const [category, setCategory] = useState("");

  return (
    <CategoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

export default CatContext;
