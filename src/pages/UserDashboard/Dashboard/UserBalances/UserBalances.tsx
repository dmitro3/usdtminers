import { IoIosWallet } from "react-icons/io";
import { ComponentContainer } from "../ComponentContainer";
import { UserNativeBalanceContainer } from "./UserNativeBalanceContainer";
import { UserTokenBalanceContainer } from "./UserTokenBalanceContainer";
import { UserUSDTBalanceContainer } from "./UserUSDTBalanceContainer";

export const UserBalances = () => {
  return (
    <ComponentContainer name="Balance" icon={<IoIosWallet />}>
      <UserTokenBalanceContainer />
      <UserNativeBalanceContainer />
      <UserUSDTBalanceContainer />
    </ComponentContainer>
  );
};
