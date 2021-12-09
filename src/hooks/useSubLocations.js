import { apiService } from "../auth/apiService";
import * as React from "react";

export const useSubLocations = (success, error) => {
  const [isCreatingSubLocation, setIsCreatingSubLocation] =
    React.useState(false);
  const [isUpdatingSubLocation, setIsUpdatingSubLocation] =
    React.useState(false);
  const [isDeletingSubLocation, setIsDeletingSubLocation] =
    React.useState(false);

  const createSubLocation = async (id, data) => {
    setIsCreatingSubLocation(true);
    try {
      const res = await apiService.post(`/locations/${id}/sub-locations`, data);
      setIsCreatingSubLocation(false);
    } catch (e) {
      console.log(e);
      setIsCreatingSubLocation(false);
      return error && error(e.response.data);
    }
  };

  const updateSubLocation = async ({ locationId, subLocationId }, data) => {
    setIsUpdatingSubLocation(true);
    try {
      const res = await apiService.patch(`/locations/${id}/update`, data);
      setIsUpdatingSubLocation(false);
    } catch (e) {
      console.log(e);
      setIsUpdatingSubLocation(false);
      return error && error(e.response.data);
    }
  };

  const deleteSubLocation = async (id) => {
    setIsDeletingSubLocation(true);
    try {
      const res = await apiService.delete(`/locations/${id}/delete`);
      setIsDeletingSubLocation(false);
    } catch (e) {
      console.log(e);
      setIsDeletingSubLocation(false);
      return error && error(e.response.data);
    }
  };

  return {
    createSubLocation,
    updateSubLocation,
    deleteSubLocation,
    isCreatingSubLocation,
    isUpdatingSubLocation,
    isDeletingSubLocation,
  };
};
