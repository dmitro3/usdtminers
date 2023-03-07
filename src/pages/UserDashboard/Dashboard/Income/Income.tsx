import { GiReceiveMoney } from "react-icons/gi";
import { ComponentContainer } from "../ComponentContainer";
import { ReferralIncomeNative } from "./ReferralIncomeNative";
import { ReferralIncomeStaking } from "./ReferralIncomeStaking";
import { ReferralIncomeUSDT } from "./ReferralIncomeUSDT";

export const Income = () => {
  return (
    <ComponentContainer name="Income" icon={<GiReceiveMoney />}>
      <ReferralIncomeNative />
      <ReferralIncomeUSDT />
      <ReferralIncomeStaking />
    </ComponentContainer>
  );
};
