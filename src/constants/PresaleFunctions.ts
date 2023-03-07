import { Falsy, TypedFilter, useEthers, useLogs } from "@usedapp/core";
import { BigNumber, providers } from "ethers";
import { formatEther, formatUnits } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import {
  AddressZero,
  useCurrentNetwork,
  useReadContract,
  useReadPresaleContract,
} from "./Data";

export type UserAccountMapType = {
  referrer: string | Falsy;
  referredAddresses: string[] | Falsy;
  teamAddress: string[] | Falsy;
  totalBusinessETH: BigNumber | Falsy;
  totalBusinessUSD: BigNumber | Falsy;
  rewardPaidETH: BigNumber[] | Falsy;
  rewardPaidUSD: BigNumber[] | Falsy;
};

export const usePresaleETH_USDPrice = () => {
  const priceInWei = useReadPresaleContract("getETH_USDPrice");
  const priceInETH = priceInWei ? Number(formatEther(priceInWei)) : 0;

  return priceInETH;
};

export const PresaleUserAccountMap = (): UserAccountMapType => {
  const { account } = useEthers();
  const Data = useReadPresaleContract("AccountMap", [account]);
  return Data;
};

export const usePresaleAccountMap = (
  address: string | Falsy
): UserAccountMapType | Falsy => {
  const Data = useReadPresaleContract("AccountMap", [address]);
  return Data;
};

export const TokenPrice = (): number => {
  const price: BigNumber | undefined | null =
    useReadPresaleContract("getPricePerUSD");
  const formattedPrice: number = Number(formatEther(price ?? 0));
  return formattedPrice ?? 0;
};

export const PresaleMinContributionInETH = (): number => {
  const [value, setValue] = useState(0);
  const Data = useReadPresaleContract("getUSDContract");
  console.log(Data);
  const formattedData: number = Number(formatEther(Data ?? 0));

  useEffect(() => {
    setValue(formattedData);
  }, [formattedData, value]);

  return value;
};

export const PresaleMinContributionInUSD = (): number => {
  const [value, setValue] = useState(0);
  const Data = useReadPresaleContract("minContribution");
  const formattedData: number = Number(formatEther(Data ?? 0));

  useEffect(() => {
    setValue(formattedData);
  }, [formattedData, value]);

  return value;
};

export const PresalehasReferrer = (
  account: string | null | undefined
): boolean | undefined => {
  try {
    const Data = useReadPresaleContract("hasReferrer", [account]);
    return Data;
  } catch (err) {
    console.log(err);
  }
};

export const BNBtoUSD = (amount: Number): Number => {
  const bnbValue = amount ? amount : 0;
  const bnbPrice = usePresaleETH_USDPrice();
  const BNBtoUSD = Number(bnbValue) * (bnbPrice ? bnbPrice : 0);
  return Number(BNBtoUSD.toFixed(2)) ?? 0;
};

export const USDtoBNB = (amount: Number): Number => {
  const usdValue = amount ? amount : 0;
  const bnbPrice = usePresaleETH_USDPrice();
  const USDtoBNB = Number(usdValue) / (bnbPrice ? bnbPrice : 0);
  return Number(USDtoBNB.toFixed(2)) ?? 0;
};

export const TotalETHRaised = (): number => {
  const Data: BigNumber = useReadPresaleContract("getTotalETHRaised");
  const formattedData: number = Number(formatEther(Data));
  return formattedData;
};

export const UserTotalBusinessETH = (address: string | Falsy): number => {
  const value: BigNumber = useReadPresaleContract("getUserTotalBusinessETH", [
    address,
  ]);
  const formattedValue: number = Number(formatEther(value ?? 0));
  return formattedValue;
};

export const UserTotalBusinessUSD = (address: string | Falsy): number => {
  const value: BigNumber = useReadPresaleContract("getUserTotalBusinessUSD", [
    address,
  ]);
  const formattedValue: number = Number(formatUnits(value ?? 0, 6));
  return formattedValue;
};

export const usePresaleUserReferrrerAddress = (
  address: string | Falsy
): string | Falsy => {
  const value: string | Falsy = useReadPresaleContract(
    "getUserReferrerAddress",
    [address]
  );
  return value;
};

export const usePresaleUserRefereeAddress = (address: string | Falsy): [] => {
  const value: [] = useReadPresaleContract("getUserRefereeAddress", [address]);
  return value;
};

export const usePresaleUserRefereeCount = (address: string | Falsy): number => {
  const value: BigNumber = useReadPresaleContract("getUserRefereeCount", [
    address,
  ]);
  const formattedValue: number = Number(value ? value.toString() : 0);
  return formattedValue;
};

export const usePresaleUserRefereeTeamCount = (
  address: string | Falsy
): number => {
  const value: BigNumber = useReadPresaleContract("getUserTeamRefereeCount", [
    address,
  ]);
  const formattedValue: number = Number(value ? value.toString() : 0);
  return formattedValue;
};

export const usePresaleUserRefereeTeamAddress = (
  address: string | Falsy
): [] => {
  const value: [] = useReadPresaleContract("getUserTeamRefereeAddress", [
    address,
  ]);
  return value;
};

export const usePresaleUserTotalIncomeNative = (
  address: string | Falsy
): number => {
  const value: BigNumber = useReadPresaleContract("getUserTotalRewardPaidETH", [
    address,
  ]);
  const formattedValue: number = Number(formatEther(value ?? 0));
  return formattedValue;
};

export const usePresaleUserTotalIncomeUSDT = (
  address: string | Falsy
): number => {
  const value: BigNumber = useReadPresaleContract("getUserTotalRewardPaidUSD", [
    address,
  ]);

  const formattedValue: number = Number(formatUnits(value ?? 0, 6));

  return formattedValue;
};

// https://api.polygonscan.com/api?module=logs&action=getLogs
//    &fromBlock=5000000
//    &toBlock=latest
//    &address=0x27b41aAa11c9eD61e05e3601E0BDaeD157424838
//    &topic0=0xfaf63637882ff2d63ca76881cf92fb857130e36f350c926f9cc884b499b42b77
//    &apikey=RUY5JRJTF9ZZMVWYFXMKE48ZDZHNXEQNCR
