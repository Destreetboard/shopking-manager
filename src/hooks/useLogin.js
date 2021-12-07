import { apiService } from "../auth/apiService";
import * as React from "react";

export const useLogin = (success, error) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async (args) => {
    setIsLoading(true);
    try {
      const res = await apiService.post("/auth/login", args);
      setIsLoading(false);
      return success ? success(res.data.data) : null;
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      return error ? error(e.response.data) : null;
    }
  };

  return { handleLogin, isLoading };
};
