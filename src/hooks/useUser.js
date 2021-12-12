import { apiService } from "../auth/apiService";
import * as React from "react";

export const useUser = (success, error) => {
  const [isFetchingUser, setIsFetchingUser] = React.useState(false);
  const [isCreatingUser, setIsCreatingUser] = React.useState(false);
  const [isUpdatingUser, setIsUpdatingUser] = React.useState(false);
  const [isDeletingUser, setIsDeletingUser] = React.useState(false);
  const [isGettingProfile, setIsGettingProfile] = React.useState(false);

  const updateUser = async (id, args) => {
    setIsUpdatingUser(true);
    try {
      const res = await apiService.patch(`/users/${id}`, args);
      setIsUpdatingUser(false);
      return success && success(res.data.data);
    } catch (e) {
      console.log(e);
      setIsUpdatingUser(false);
      return error && error(e?.response?.data || { message: e?.message });
    }
  };

  const createUser = async (args) => {
    setIsCreatingUser(true);
    try {
      const res = await apiService.post("/users", args);
      setIsCreatingUser(false);
      return success && success(res.data.data);
    } catch (e) {
      console.log(e);
      setIsCreatingUser(false);
      return error && error(e?.response?.data || { message: e?.message });
    }
  };

  const getUser = async (id) => {
    setIsFetchingUser(true);
    try {
      const res = await apiService.get(`/users/${id}`);
      setIsFetchingUser(false);
      return success && success(res.data.data);
    } catch (e) {
      console.log(e);
      setIsFetchingUser(false);
      return error && error(e?.response?.data || { message: e?.message });
    }
  };

  const getProfile = async () => {
    setIsGettingProfile(true);
    try {
      const res = await apiService.get(`/users/me`);
      setIsGettingProfile(false);
      return success && success(res.data.data);
    } catch (e) {
      console.log(e);
      setIsGettingProfile(false);
      return error && error(e?.response?.data || { message: e?.message });
    }
  };

  const deleteUser = async (id) => {
    setIsDeletingUser(true);
    try {
      await apiService.delete(`/users/${id}`);
      setIsDeletingUser(false);
    } catch (e) {
      console.log(e);
      setIsDeletingUser(false);
      return error && error(e?.response?.data);
    }
  };

  return {
    createUser,
    updateUser,
    deleteUser,
    getUser,
    getProfile,
    isGettingProfile,
    isCreatingUser,
    isDeletingUser,
    isUpdatingUser,
    isFetchingUser,
  };
};
