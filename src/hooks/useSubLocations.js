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
      await apiService.post(`/locations/${id}/sub-locations`, data);
      setIsCreatingSubLocation(false);
      return success && success();
    } catch (e) {
      console.log("Error ========>", e.message);
      setIsCreatingSubLocation(false);
      return error && error(e?.response?.data || { message: e?.message });
    }
  };

  const updateSubLocation = async ({ locationId, subLocationId }, data) => {
    setIsUpdatingSubLocation(true);
    try {
      const res = await apiService.patch(
        `/locations/${locationId}/sub-locations/${subLocationId}`,
        { subLocation: data }
      );
      setIsUpdatingSubLocation(false);
      return success && success();
    } catch (e) {
      console.log(e);
      setIsUpdatingSubLocation(false);
      return error && error(e?.response?.data || { message: e?.message });
    }
  };

  const deleteSubLocation = async (locationId, subLocationId) => {
    setIsDeletingSubLocation(true);
    try {
      const res = await apiService.delete(
        `/locations/${locationId}/sub-locations/${subLocationId}`
      );
      setIsDeletingSubLocation(false);
      return success && success();
    } catch (e) {
      console.log(e.message);
      setIsDeletingSubLocation(false);
      return error && error(e?.response?.data || { message: e?.message });
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
