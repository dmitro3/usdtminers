import { Contract } from "@ethersproject/contracts";
import {
  BNB,
  BSC,
  BSCTestnet,
  Polygon,
  useCall,
  useEthers,
} from "@usedapp/core";
import { getDefaultProvider } from "ethers";
import {
  BNBLogoSVG,
  CoinBaseLogoSVG,
  MetamaskLogoSVG,
  PolygonLogoSVG,
  tokenLogo,
  TrustWalletLogoSVG,
  USDTLogoSVG,
  WalletConnectLogoSVG,
} from "../assets";
import { PresaleABI, TokenABI, StakingABI, ReferralABI } from "../contracts";

export const MetamaskLogo = MetamaskLogoSVG;

export const WalletConnectLogo = WalletConnectLogoSVG;
export const CoinbaseLogo = CoinBaseLogoSVG;
export const TrustWalletLogo = TrustWalletLogoSVG;
export const BNBLogo = BNBLogoSVG;
export const USDTLogo = USDTLogoSVG;
export const PolygonLogo = PolygonLogoSVG;

export const TokenSymbol = "MGUT";
export const TokenName = "MaticGold Universe";
export const TokenDecimals = 18;
export const TotalSupply = 150000000;
export const TotalSupplyString = "15 Millions";
export const TokenLogo = tokenLogo;
export const PresalePrice = "$0.078";
export const AddressDead = "0x000000000000000000000000000000000000dEaD";
export const AddressZero = "0x0000000000000000000000000000000000000000";

export const SupportedChainIds = {
  [BSCTestnet.chainId]: "https://data-seed-prebsc-1-s3.binance.org:8545",
  [Polygon.chainId]: getDefaultProvider("https://polygon-rpc.com"),
};

export const SupportedChains = [Polygon.chainId, BSCTestnet.chainId];

export const GetLogoByChain = {
  [BSC.chainId]: BNBLogo,
  [BSCTestnet.chainId]: BNBLogo,
  [Polygon.chainId]: PolygonLogo,
};

export const website = window.location.href;

export type CurrentNetworkType = {
  TokenAddress: string;
  PresaleAddress: string;
  ReferralAddress: string;
  StakingAddress: string;
  USDAddress: string;
  DFMTAddress?: string;
  TokenOwner: string;
  DefaultReferrer: string;
  NetworkName: string;
  NetworkSymbol: string | undefined;
  NetworkChainId: number;
  NetworkLogoURL: typeof BNBLogo;
  NetworkRPCUrl: string;
  NetworkExplorerLink: string | undefined;
  TokenInterface: Contract;
  PresaleInterface: Contract;
  ReferralInterface: Contract;
  StakingInterface: Contract;
  USDInterface: Contract;
};

export const DeepLinks = {
  trustwallet: `https://link.trustwallet.com/open_url?coin_id=966&url=${website}`,
  metamask: `https://metamask.app.link/dapp/${website}`,
  coinbase: `https://go.cb-w.com/dapp?cb_url=${website}`,
};

export const BSCTestnetInfo: CurrentNetworkType = {
  TokenAddress: "0x10A45f2D67a9810eDD75a041f5f1246A41f6e8e2",
  PresaleAddress: "0x4A805032708399940A87D2a593Ca51cC38C79668",
  ReferralAddress: "0x5dCe6e00A27F962c82cd7a11cdf5ED61fB5Df5e3",
  StakingAddress: "0x48F2C09424A5d3C8bCfB92E9D6ad9336935DF04b",
  USDAddress: "0xbfA0e2F4b2676c62885B1033670C71cdefd975fB",
  DFMTAddress: "",
  TokenOwner: "0x4345492B7bf4967e8Ff7b3D0858945560391eab1",
  DefaultReferrer: "0x4345492B7bf4967e8Ff7b3D0858945560391eab1",
  NetworkName: BSCTestnet.chainName,
  NetworkSymbol: BNB.ticker,
  NetworkChainId: BSCTestnet.chainId,
  NetworkLogoURL: BNBLogo,
  NetworkRPCUrl: "https://data-seed-prebsc-1-s3.binance.org:8545",
  NetworkExplorerLink: BSCTestnet.blockExplorerUrl,
  TokenInterface: new Contract(
    "0x10A45f2D67a9810eDD75a041f5f1246A41f6e8e2",
    TokenABI.abi
  ),
  PresaleInterface: new Contract(
    "0x4A805032708399940A87D2a593Ca51cC38C79668",
    PresaleABI.abi
  ),
  ReferralInterface: new Contract(
    "0x5dCe6e00A27F962c82cd7a11cdf5ED61fB5Df5e3",
    ReferralABI.abi
  ),
  StakingInterface: new Contract(
    "0x48F2C09424A5d3C8bCfB92E9D6ad9336935DF04b",
    StakingABI.abi
  ),
  USDInterface: new Contract(
    "0xbfA0e2F4b2676c62885B1033670C71cdefd975fB",
    TokenABI.abi
  ),
};

export const BSCInfo: CurrentNetworkType = {
  TokenAddress: "0x0706DCf3DcC08BBcaCbE0B4ff8e9A9E10552A778",
  ReferralAddress: "0x757e2C2F74dF91b9A465B730316bC16B2f3295f4",
  PresaleAddress: "0x080743d861597a0CDcD742b1eED20C951F507988",
  StakingAddress: "",
  USDAddress: "0xbfA0e2F4b2676c62885B1033670C71cdefd975fB",
  DFMTAddress: "",
  TokenOwner: "0x7a0DeC713157f4289E112f5B8785C4Ae8B298F7F",
  DefaultReferrer: "0x7a0DeC713157f4289E112f5B8785C4Ae8B298F7F",
  NetworkName: BSC.chainName,
  NetworkSymbol: BSC.nativeCurrency?.symbol,
  NetworkLogoURL: BNBLogo,
  NetworkChainId: BNB.chainId,
  NetworkRPCUrl: "https://bsc-dataseed.binance.org/",
  NetworkExplorerLink: BSC.blockExplorerUrl,
  TokenInterface: new Contract(
    "0x0706dcf3dcc08bbcacbe0b4ff8e9a9e10552a778",
    TokenABI.abi
  ),
  PresaleInterface: new Contract(
    "0x080743d861597a0CDcD742b1eED20C951F507988",
    StakingABI.abi
  ),
  ReferralInterface: new Contract(
    "0x080743d861597a0CDcD742b1eED20C951F507988",
    ReferralABI.abi
  ),
  StakingInterface: new Contract(
    "0x080743d861597a0CDcD742b1eED20C951F507988",
    PresaleABI.abi
  ),
  USDInterface: new Contract(
    "0xbfA0e2F4b2676c62885B1033670C71cdefd975fB",
    TokenABI.abi
  ),
};

export const PolygonInfo: CurrentNetworkType = {
  TokenAddress: "0x4194f5990704DAAc8690834d24863aAEaeFaFDa9",
  ReferralAddress: "0x757e2C2F74dF91b9A465B730316bC16B2f3295f4",
  PresaleAddress: "0xdb3FD7A44513cd26fF33ec5f850dfBc35dDCE813",
  StakingAddress: "0x43dC81709f53839169Ffc6aD7Af486Be7FADfBAA",
  USDAddress: "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
  TokenOwner: "0x4a3E55b9C8e2C7278D3D8F7E0e524Be3Cd76BA8f",
  DefaultReferrer: "0x4a3E55b9C8e2C7278D3D8F7E0e524Be3Cd76BA8f",
  NetworkName: Polygon.chainName,
  NetworkSymbol: Polygon.nativeCurrency?.symbol,
  NetworkChainId: Polygon.chainId,
  NetworkLogoURL: PolygonLogo,
  NetworkRPCUrl: "https://polygon-rpc.com",
  NetworkExplorerLink: Polygon.blockExplorerUrl,
  TokenInterface: new Contract(
    "0x4194f5990704DAAc8690834d24863aAEaeFaFDa9",
    TokenABI.abi
  ),
  ReferralInterface: new Contract(
    "0x080743d861597a0CDcD742b1eED20C951F507988",
    ReferralABI.abi
  ),
  PresaleInterface: new Contract(
    "0xdb3FD7A44513cd26fF33ec5f850dfBc35dDCE813",
    PresaleABI.abi
  ),
  StakingInterface: new Contract(
    "0x43dC81709f53839169Ffc6aD7Af486Be7FADfBAA",
    StakingABI.abi
  ),
  USDInterface: new Contract(
    "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
    TokenABI.abi
  ),
};

export const SupportedNetworks = {
  [BSCTestnet.chainId]: BSCTestnetInfo,
  [Polygon.chainId]: PolygonInfo,
};

export const useCurrentNetwork = () => {
  const { chainId } = useEthers();
  const supportedChainId = SupportedChainIds[chainId ?? 1]
    ? chainId
    : Polygon.chainId;
  return SupportedNetworks[supportedChainId ?? Polygon.chainId];
};

export function useReadContract(
  ContractAddress: string,
  ContractInterface: any,
  FunctionName: string,
  Arg: any
) {
  const { value, error } =
    useCall(
      ContractAddress && {
        contract: ContractInterface,
        method: FunctionName,
        args: Arg,
      }
    ) ?? {};
  if (error) {
    console.error(error.message);
    return undefined;
  }
  return value;
}

export function useReadTokenContract(FunctionName: string, Arg?: any) {
  const currentNetwork = useCurrentNetwork();
  let Data = useReadContract(
    currentNetwork?.TokenAddress ?? AddressZero,
    currentNetwork?.TokenInterface,
    FunctionName,
    Arg ? Arg : []
  );

  return Data;
}

export function useReadPresaleContract(FunctionName: string, Arg?: any) {
  const currentNetwork = useCurrentNetwork();
  let Data = useReadContract(
    currentNetwork?.PresaleAddress ?? AddressZero,
    currentNetwork?.PresaleInterface,
    FunctionName,
    Arg ? Arg : []
  );
  return Data;
}
