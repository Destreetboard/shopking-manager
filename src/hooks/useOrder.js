import { apiService } from "../auth/apiService";
import * as React from "react";

export const useOrder = (success, error) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchOrder = async (id) => {
    setIsLoading(true);
    try {
      const res = await apiService.get(`/admin/orders/${id}`);
      setIsLoading(false);
      return success && success(res.data.data);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      return error && error(e?.response?.data || { message: e?.message });
    }
  };

  const updateOrder = async (id, args) => {
    setIsLoading(true);
    try {
      const res = await apiService.patch(`/admin/orders/${id}`, args);
      setIsLoading(false);
      return success && success(res.data.data);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      return error && error(e?.response?.data || { message: e?.message });
    }
  };

  return { fetchOrder, updateOrder, isLoading };
};
