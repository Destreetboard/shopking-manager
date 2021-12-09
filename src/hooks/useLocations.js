import { apiService } from "../auth/apiService";
import * as React from "react";

export const useLocations = (success, error) => {
  const [isFetchingLocations, setIsFetchingLocations] = React.useState(false);
  const [isFetchingLocation, setIsFetchingLocation] = React.useState(false);
  const [isCreatingLocation, setIsCreatingLocation] = React.useState(false);
  const [isUpdatingLocation, setIsUpdatingLocation] = React.useState(false);
  const [isDeletingLocation, setIsDeletingLocation] = React.useState(false);

  const fetchLocations = async () => {
    setIsFetchingLocations(true);
    try {
      const res = await apiService.get("/locations");
      setIsFetchingLocations(false);
      return success && success(res.data.data.locations);
    } catch (e) {
      console.log(e);
      setIsFetchingLocations(false);
      return error && error(e.response.data);
    }
  };

  const fetchLocation = async (id) => {
    setIsFetchingLocation(true);
    try {
      const res = await apiService.get(`/locations/${id}`);
      setIsFetchingLocation(false);
      return success && success(res.data.data.location);
    } catch (e) {
      console.log(e);
      setIsFetchingLocation(false);
      return error && error(e.response.data);
    }
  };

  const createLocation = async (data) => {
    setIsCreatingLocation(true);
    try {
      const res = await apiService.post("/locations", data);
      setIsCreatingLocation(false);
      fetchLocations();
    } catch (e) {
      console.log(e);
      setIsCreatingLocation(false);
      return error && error(e.response.data);
    }
  };

  const updateLocation = async (id, data) => {
    setIsUpdatingLocation(true);
    try {
      const res = await apiService.patch(`/locations/${id}/update`, data);
      setIsUpdatingLocation(false);
      fetchLocations();
    } catch (e) {
      console.log(e);
      setIsUpdatingLocation(false);
      return error && error(e.response.data);
    }
  };

  const deleteLocation = async (id) => {
    setIsDeletingLocation(true);
    try {
      const res = await apiService.delete(`/locations/${id}/delete`);
      setIsDeletingLocation(false);
      fetchLocations();
    } catch (e) {
      console.log(e);
      setIsDeletingLocation(false);
      return error && error(e.response.data);
    }
  };

  return {
    fetchLocations,
    fetchLocation,
    createLocation,
    updateLocation,
    deleteLocation,
    isFetchingLocations,
    isFetchingLocation,
    isCreatingLocation,
    isUpdatingLocation,
    isDeletingLocation,
  };
};
