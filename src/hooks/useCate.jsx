import { useContext } from "react";
import { CategoryContext } from "../Shared/CateContext";
const useCate = () => {
  const cate = useContext(CategoryContext);
  return cate;
};

export default useCate;
