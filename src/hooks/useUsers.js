import { apiService } from "../auth/apiService";
import * as React from "react";

export const useUsers = (success, error) => {
  const [isFetchingUsers, setIsFetchingUsers] = React.useState(false);

  const fetchUsers = async () => {
    setIsFetchingUsers(true);
    try {
      const res = await apiService.get("/users");
      setIsFetchingUsers(false);
      return success && success(res.data.data);
    } catch (e) {
      console.log(e);
      setIsFetchingUsers(false);
      return error && error(e?.response?.data || { message: e?.message });
    }
  };

  return { fetchUsers, isFetchingUsers };
};
