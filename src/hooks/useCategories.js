import { apiService } from "../auth/apiService";
import * as React from "react";

export const useCategories = (success, error) => {
  const [isLoadingCategories, setIsLoadingCategories] = React.useState(false);
  const [isCreatingCategory, setIsCreatingCategory] = React.useState(false);
  const [isDeletingCategory, setIsDeletingCategory] = React.useState(false);
  const [isUpdatingCategory, setIsUpdatingCategory] = React.useState(false);

  const fetchCategories = async () => {
    setIsLoadingCategories(true);
    try {
      const res = await apiService.get("/categories");
      setIsLoadingCategories(false);
      return success && success(res.data.data.categories);
    } catch (e) {
      console.log(e);
      setIsLoadingCategories(false);
      return error && error(e.response.data);
    }
  };

  const createCategory = async (data) => {
    setIsCreatingCategory(true);
    try {
      const res = await apiService.post("/categories", data);
      setIsCreatingCategory(false);
      fetchCategories();
    } catch (e) {
      console.log(e);
      setIsCreatingCategory(false);
      return error && error(e.response.data);
    }
  };

  const updateCategory = async (id, data) => {
    setIsUpdatingCategory(true);
    try {
      const res = await apiService.patch(`/categories/${id}/update`, data);
      setIsUpdatingCategory(false);
      fetchCategories();
    } catch (e) {
      console.log(e);
      setIsUpdatingCategory(false);
      return error && error(e.response.data);
    }
  };

  const deleteCategory = async (id) => {
    setIsDeletingCategory(true);
    try {
      const res = await apiService.delete(`/categories/${id}/delete`);
      setIsDeletingCategory(false);
      fetchCategories();
    } catch (e) {
      console.log(e);
      setIsDeletingCategory(false);
      return error && error(e.response.data);
    }
  };

  return {
    fetchCategories,
    createCategory,
    updateCategory,
    deleteCategory,
    isLoadingCategories,
    isCreatingCategory,
    isUpdatingCategory,
    isDeletingCategory,
  };
};
