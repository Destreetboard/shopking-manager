import { apiService } from "../auth/apiService";
import * as React from "react";

export const useCategories = (success, error) => {
  const [isFetchingCategories, setIsFetchingCategories] = React.useState(false);

  const fetchCategories = async () => {
    setIsFetchingCategories(true);
    try {
      const res = await apiService.get("/categories");
      setIsFetchingCategories(false);
      return success && success(res.data.data.categories);
    } catch (e) {
      console.log(e);
      setIsFetchingCategories(false);
      return error && error(e.response.data);
    }
  };

  return { fetchCategories, isFetchingCategories };
};
