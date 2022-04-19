import React, { useState, useEffect } from "react";
import useSWR from "swr";

export const UseProfile = () => {
  const me = useSWR("me");

  const getProfileUrl = () => {
    if (!me?.data?.images) {
      return "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyu_16kJYGD5Vc4JHmuCUEfcEymYpLEMGi2g&usqp=CAU";
    }
    return me?.data?.images[0]?.url
      ? me?.data?.images[0]?.url
      : "https://cdn-icons-png.flaticon.com/128/64/64572.png";
  };

  return { profileUrl: getProfileUrl() };
};
