import { apiService } from "../auth/apiService";
import * as React from "react";

export const useReferrals = (success, error) => {
  const [isFetchingReferrals, setIsFetchingReferrals] = React.useState(false);

  const fetchReferrals = async (id) => {
    setIsFetchingReferrals(true);
    try {
      const res = await apiService.get(`/users/${id}/referrals`);
      setIsFetchingReferrals(false);
      return success && success(res.data.data);
    } catch (e) {
      console.log(e);
      setIsFetchingReferrals(false);
      return error && error(e?.response?.data || { message: e?.message });
    }
  };

  return { fetchReferrals, isFetchingReferrals };
};
