import { apiService } from "../auth/apiService";
import * as React from "react";

export const useVendors = (success, error) => {
  const [isLoadingVendors, setIsLoadingVendors] = React.useState(false);
  const [isCreatingVendor, setIsCreatingVendor] = React.useState(false);
  const [isDeletingVendor, setIsDeletingVendor] = React.useState(false);
  const [isUpdatingVendor, setIsUpdatingVendor] = React.useState(false);

  const fetchVendors = async () => {
    setIsLoadingVendors(true);
    try {
      const res = await apiService.get("/vendors");
      setIsLoadingVendors(false);
      return success && success(res.data.data.vendors);
    } catch (e) {
      console.log(e);
      setIsLoadingVendors(false);
      return error && error(e?.response?.data || { message: e?.message });
    }
  };

  const createVendor = async (data) => {
    setIsCreatingVendor(true);
    try {
      const res = await apiService.post("/vendors", data);
      setIsCreatingVendor(false);
      fetchVendors();
    } catch (e) {
      console.log(e);
      setIsCreatingVendor(false);
      return error && error(e?.response?.data || { message: e?.message });
    }
  };

  const updateVendor = async (id, data) => {
    setIsUpdatingVendor(true);
    try {
      const res = await apiService.patch(`/vendors/${id}`, data);
      setIsUpdatingVendor(false);
      fetchVendors();
    } catch (e) {
      console.log(e);
      setIsUpdatingVendor(false);
      return error && error(e?.response?.data || { message: e?.message });
    }
  };

  const deleteVendor = async (id) => {
    setIsDeletingVendor(true);
    try {
      const res = await apiService.delete(`/vendors/${id}`);
      setIsDeletingVendor(false);
      fetchVendors();
    } catch (e) {
      console.log(e);
      setIsDeletingVendor(false);
      return error && error(e?.response?.data || { message: e?.message });
    }
  };

  return {
    fetchVendors,
    createVendor,
    updateVendor,
    deleteVendor,
    isLoadingVendors,
    isCreatingVendor,
    isUpdatingVendor,
    isDeletingVendor,
  };
};
