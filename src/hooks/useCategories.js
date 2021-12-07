import { apiService } from '@/services';
import * as React from 'react';

export type categoryType = {
  _id: string;
  name: string;
}

type hookReturnType = (
  success?: (data: categoryType[]) => void,
  error?: (data: {message: string}) => void
) => {
  fetchCategories: () => void;
  isFetchingCategories: boolean;
};

export const useCategories: hookReturnType = (success, error) => {
  const [isFetchingCategories, setIsFetchingCategories] = React.useState(false);
  
  const fetchCategories = async () => {
    setIsFetchingCategories(true);
    try {
      const res = await apiService.get('/categories');
      setIsFetchingCategories(false);
      success && success(res.data.data.categories);
    } catch (e: any) {
      console.log(e);
      setIsFetchingCategories(false);
      error && error(e.response.data);
    }
  }

  return {fetchCategories, isFetchingCategories};
}
