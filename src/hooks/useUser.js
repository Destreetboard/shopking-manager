import { apiService } from "../auth/apiService";
import * as React from "react";

export const useUser = (success, error) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const updateUser = async (args) => {
    setIsLoading(true);
    try {
      const res = await apiService.patch("/users/me/update", args);
      setIsLoading(false);
      return success && success(res.data.data);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      return error && error(e.response.data);
    }
  };

  const getUser = async () => {
    setIsLoading(true);
    try {
      const res = await apiService.get("/users/me");
      setIsLoading(false);
      return success && success(res.data.data);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      return error && error(e.response.data);
    }
  };

  return { updateUser, getUser, isLoading };
};
