import { apiService } from "../auth/apiService";
import * as React from "react";

export const useLocations = (success, error) => {
  const [isLoading, setIsLoading] = React.useState(false);

  const fetchLocations = async () => {
    setIsLoading(true);
    try {
      const res = await apiService.get("/locations");
      setIsLoading(false);
      return success && success(res.data.data.locations);
    } catch (e) {
      console.log(e);
      setIsLoading(false);
      return error && error(e.response.data);
    }
  };

  return { fetchLocations, isLoading };
};
