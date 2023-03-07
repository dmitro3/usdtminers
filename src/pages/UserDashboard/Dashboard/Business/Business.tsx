import React from "react";
import { BsCartCheckFill } from "react-icons/bs";
import { ComponentContainer } from "../ComponentContainer";
import { BusinessETH } from "./BusinessETH";
import { BusinessUSD } from "./BusinessUSD";

export const Business = () => {
  return (
    <ComponentContainer name="Total Business" icon={<BsCartCheckFill />}>
      <BusinessETH />
      <BusinessUSD />
    </ComponentContainer>
  );
};
