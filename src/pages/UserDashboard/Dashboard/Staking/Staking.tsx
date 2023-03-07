import { TiChartLine } from "react-icons/ti";
import { ComponentContainer } from "../ComponentContainer";
import { TotalPendingStakingReward } from "./TotalPendingStakingReward";
import { TotalStakedValue } from "./TotalStakedValue";
import { TotalStakingRewardClaimed } from "./TotalStakingRewardClaimed";

export const Staking = () => {
  return (
    <ComponentContainer name="Staking" icon={<TiChartLine />}>
      <TotalStakedValue />
      <TotalStakingRewardClaimed />
      <TotalPendingStakingReward />
    </ComponentContainer>
  );
};
