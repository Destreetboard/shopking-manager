import { apiService } from "../auth/apiService";
import * as React from "react";

export const useOrders = (success, error) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const res = await apiService.get("/admin/orders");
      setIsLoading(false);
      return success && success(res.data.data.orders);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      return error && error(e?.response?.data || { message: e?.message });
    }
  };

  const fetchUserOrders = async (id) => {
    setIsLoading(true);
    try {
      const res = await apiService.get(`/users/${id}/orders`);
      setIsLoading(false);
      return success && success(res.data.data.orders);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      return error && error(e?.response?.data || { message: e?.message });
    }
  };

  return { fetchOrders, fetchUserOrders, isLoading };
};
