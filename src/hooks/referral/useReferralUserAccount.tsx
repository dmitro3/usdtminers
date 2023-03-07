import { useCall } from "@usedapp/core";
import { BigNumber } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import { AddressZero, useCurrentNetwork } from "../../constants/Data";

export type UserAccountMapType = {
  pendingRewardETH: BigNumber;
  pendingRewardUSD: BigNumber;
  pendingRewardStaking: BigNumber;
  referrerAddress: string;
  hasReferrer: boolean;
  referredAddresses: string[];
  referredCount: number;
  hasReferee: boolean;
  teamAddress: string[];
  teamCount: number;
  rewardPaidETH: BigNumber[];
  userTotalIncomeETH: BigNumber | number;
  rewardPaidUSD: BigNumber[];
  userTotalIncomeUSD: BigNumber | number;
  rewardPaidStaking: BigNumber[];
  userTotalIncomeStaking: BigNumber | number;
  rewardPaidTimeETH: BigNumber[];
  rewardPaidTimeUSD: BigNumber[];
  rewardPaidTimeStaking: BigNumber[];
  totalBusinessETH: BigNumber;
  totalBusinessUSD: BigNumber;
};

export const useReferralUserAccount = (
  address: string | undefined
): UserAccountMapType | undefined => {
  const currentNetwork = useCurrentNetwork();
  const [userTotalIncomeETH, setUserTotalIncomeETH] = useState<
    BigNumber | number
  >(0);
  const [userTotalIncomeUSD, setUserTotalIncomeUSD] = useState<
    BigNumber | number
  >(0);
  const [userTotalIncomeStaking, setUserTotalIncomeStaking] = useState<
    BigNumber | number
  >(0);
  const { value, error } =
    useCall(
      currentNetwork?.ReferralAddress && {
        contract: currentNetwork?.ReferralInterface,
        method: "getUserAccount",
        args: [address],
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }

  useEffect(() => {
    let userIncomeETH = value
      ? value?.[0].rewardPaidETH.length > 0
        ? value?.[0].rewardPaidETH.reduce(
            (a: BigNumber, b: BigNumber): BigNumber => {
              const aFormatted: number = Number(formatEther(a));
              const bFormatted: number = Number(formatEther(b));
              const sum = aFormatted + bFormatted;
              return parseEther(sum.toString());
            }
          )
        : 0
      : 0;
    setUserTotalIncomeETH(userIncomeETH);
  }, [
    Number(formatEther(userTotalIncomeETH)),
    JSON.stringify(value?.[0].rewardPaidETH),
  ]);

  useEffect(() => {
    let userIncomeUSD = value
      ? value?.[0].rewardPaidUSD.length > 0
        ? value?.[0].rewardPaidUSD.reduce(
            (a: BigNumber, b: BigNumber): BigNumber => {
              const aFormatted: number = Number(formatEther(a));
              const bFormatted: number = Number(formatEther(b));
              const sum = aFormatted + bFormatted;
              return parseEther(sum.toString());
            }
          )
        : 0
      : 0;
    setUserTotalIncomeUSD(userIncomeUSD);
  }, [
    Number(formatEther(userTotalIncomeUSD)),
    JSON.stringify(value?.[0].rewardPaidUSD),
  ]);

  useEffect(() => {
    let userIncomeStaking = value
      ? value?.[0].rewardPaidStaking.length > 0
        ? value?.[0].rewardPaidStaking.reduce(
            (a: BigNumber, b: BigNumber): BigNumber => {
              const aFormatted: number = Number(formatEther(a));
              const bFormatted: number = Number(formatEther(b));
              const sum = aFormatted + bFormatted;
              return parseEther(sum.toString());
            }
          )
        : 0
      : 0;
    setUserTotalIncomeStaking(userIncomeStaking);
  }, [
    Number(formatEther(userTotalIncomeStaking)),
    JSON.stringify(value?.[0].rewardPaidStaking),
  ]);

  const valueFormatted: UserAccountMapType | undefined = value
    ? {
        pendingRewardETH: value?.[0].pendingRewardETH,
        pendingRewardUSD: value?.[0].pendingRewardUSD,
        pendingRewardStaking: value?.[0].pendingRewardStaking,
        referrerAddress: value?.[0].referrer,
        hasReferrer: value?.[0].referrer !== AddressZero ? true : false,
        referredAddresses: value?.[0].referredAddresses,
        referredCount: value?.[0].referredAddresses.length,
        hasReferee: value?.[0].referredAddresses.length > 0 ? true : false,
        teamAddress: value?.[0].teamAddress,
        teamCount: value?.[0].teamAddress.length,
        rewardPaidETH: value?.[0].rewardPaidETH,
        userTotalIncomeETH,
        rewardPaidUSD: value?.[0].rewardPaidUSD,
        userTotalIncomeUSD,
        rewardPaidStaking: value?.[0].rewardPaidStaking,
        userTotalIncomeStaking,
        rewardPaidTimeETH: value?.[0].rewardPaidTimeETH,
        rewardPaidTimeUSD: value?.[0].rewardPaidTimeUSD,
        rewardPaidTimeStaking: value?.[0].rewardPaidTimeStaking,
        totalBusinessETH: value?.[0].totalBusinessETH,
        totalBusinessUSD: value?.[0].totalBusinessUSD,
      }
    : undefined;

  return valueFormatted;
};
