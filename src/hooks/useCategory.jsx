import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../Shared/ReduxToolkit/categorySlice";

const useCategory = () => {
  const category = useSelector((state) => state.category.category);
  const dispatch = useDispatch();

  return {
    category,
    setCategory: (value) => dispatch(setCategory(value)),
  };
};

export default useCategory;
