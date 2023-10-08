import * as chains from "wagmi/chains";
import { Chain } from "wagmi";

export type ScaffoldConfig = {
  targetNetwork: chains.Chain;
  pollingInterval: number;
  alchemyApiKey: string;
  walletConnectProjectId: string;
  onlyLocalBurnerWallet: boolean;
  walletAutoConnect: boolean;
};



export const polkadotlocal = {
  id: 1000,
  name: "polkadot EVM",
  network: "polkadotEVM",
  nativeCurrency: {
    symbol: "ETH",
    name: "Ether",
    decimals: 18,
  },
  rpcUrls: {
    public: { http: ["http://127.0.0.1:9944"] },
    default: { http: ["http://127.0.0.1:9944"] },
  },
  blockExplorers: {
    etherscan: { name: "Polkadot EVM scan", url: "https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9944#/explorer" },
    default: { name: "Polkadot EVM scab", url: "https://polkadot.js.org/apps/?rpc=ws://127.0.0.1:9944#/explorer" },
  },
} as const satisfies Chain;

const scaffoldConfig = {
  // The network where your DApp lives in

  

  targetNetwork: polkadotlocal,

  // The interval at which your front-end polls the RPC servers for new data
  // it has no effect on the local network
  pollingInterval: 30000,

  // This is ours Alchemy's default API key.
  // You can get your own at https://dashboard.alchemyapi.io
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY || "oKxs-03sij-U_N0iOlrSsZFr29-IqbuF",

  // This is ours WalletConnect's default project ID.
  // You can get your own at https://cloud.walletconnect.com
  // It's recommended to store it in an env variable:
  // .env.local for local testing, and in the Vercel/system env config for live apps.
  walletConnectProjectId: process.env.NEXT_PUBLIC_WALLET_CONNECT_PROJECT_ID || "3a8170812b534d0ff9d794f19a901d64",

  // Only show the Burner Wallet when running on hardhat network
  onlyLocalBurnerWallet: true,

  /**
   * Auto connect:
   * 1. If the user was connected into a wallet before, on page reload reconnect automatically
   * 2. If user is not connected to any wallet:  On reload, connect to burner wallet if burnerWallet.enabled is true && burnerWallet.onlyLocal is false
   */
  walletAutoConnect: true,
} satisfies ScaffoldConfig;

export default scaffoldConfig;
