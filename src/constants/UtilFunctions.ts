import {
  Falsy,
  useEtherBalance,
  useEthers,
  useTokenBalance,
} from "@usedapp/core";
import { BigNumber, Contract } from "ethers";
import { formatEther, formatUnits, Interface } from "ethers/lib/utils";
import { useEffect, useState } from "react";
import {
  AddressDead,
  useCurrentNetwork,
  useReadContract,
  useReadPresaleContract,
} from "./Data";

export const useNativeBalance = (address: string | Falsy): number => {
  const [value, setValue] = useState(0);
  const addresDead = AddressDead;
  const etherBalance: BigNumber | undefined = useEtherBalance(
    address ?? addresDead
  );
  const formatedEtherBalance: number = Number(formatEther(etherBalance ?? 0));

  useEffect(() => {
    setValue(formatedEtherBalance);
  }, [value, formatedEtherBalance]);

  return value;
};

export const UserTokenBalance = (
  address: string | Falsy,
  TokenAddress?: string
): number => {
  const currentNetwork = useCurrentNetwork();
  const tokenAddress = TokenAddress ?? currentNetwork?.TokenAddress;
  const tokenBalance: BigNumber | undefined | null = useTokenBalance(
    tokenAddress,
    address
  );
  const formatedTokenBalance: number = Number(formatEther(tokenBalance ?? 0));
  return formatedTokenBalance ?? 0;
};

export const useUserUSDTBalance = (address: string | Falsy): number => {
  const [value, setValue] = useState(0);
  const currentNetwork = useCurrentNetwork();
  const tokenBalance: BigNumber = useReadContract(
    currentNetwork?.USDAddress,
    currentNetwork?.USDInterface,
    "balanceOf",
    [address]
  );
  const formatedTokenBalance: number = Number(
    formatUnits(tokenBalance ?? 0, 6)
  );

  useEffect(() => {
    setValue(formatedTokenBalance);
  }, [value, formatedTokenBalance]);

  return value;
};

export const ETH_Price = (): number => {
  const priceInWei: BigNumber = useReadPresaleContract("getETH_USDPrice");
  const priceInETH: number = priceInWei
    ? Number(formatEther(priceInWei?.[0]))
    : 0;
  return priceInETH;
};

export const Allowance = (
  contractAddress: string | Falsy,
  ownerAddress: string | Falsy,
  spenderAddress: string | Falsy
): number | Falsy => {
  const currentNetwork = useCurrentNetwork();
  const selectedToken =
    contractAddress === "USDT"
      ? currentNetwork?.USDAddress
      : currentNetwork?.TokenAddress;
  const selectedInterface =
    contractAddress === "USDT"
      ? currentNetwork?.USDInterface
      : currentNetwork?.TokenInterface;
  const value: BigNumber = useReadContract(
    selectedToken,
    selectedInterface,
    "allowance",
    [ownerAddress, spenderAddress]
  );
  const formattedValue = Number(formatEther(value ?? 0));
  return formattedValue;
};
