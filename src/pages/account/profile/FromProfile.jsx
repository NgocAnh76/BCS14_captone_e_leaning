import { useQuery } from "@tanstack/react-query";
import React from "react";
import { getInfo } from "../../../util/API/User/UserApi";
import CustomsIsPending from "../../../util/customs/CustomsIsPending";
import YourProfile from "./YourProfile";
import YourCourse from "./YourCourse";

const FromProfile = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["getInfo"],
    queryFn: getInfo,
    staleTime: 5 * 60 * 1000,
    cacheTime: 6 * 60 * 1000,
  });

  if (isLoading) {
    return <CustomsIsPending />;
  }
  if (error) {
    return <div className="alert alert-danger">{error.message}</div>;
  }
  return (
    <div className="w-full bg-dark">
      <YourProfile data={data} />
      <YourCourse data={data} />
    </div>
  );
};

export default FromProfile;
