import { useEthers } from "@usedapp/core";
import { SupportedChainIds } from "../../constants";
import { ConnectWalletPage, UnsupportedNetwork } from "../../pages/ErrorPage";

export const ProtectedRoutes = ({ children }) => {
  const { account, chainId } = useEthers();

  return account && !SupportedChainIds[chainId ?? 1] ? (
    <UnsupportedNetwork />
  ) : account ? (
    <>{children} </>
  ) : (
    <ConnectWalletPage />
  );
};
