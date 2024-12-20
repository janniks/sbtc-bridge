"use client";

import { atom, createStore } from "jotai";
import { NotificationEventType } from "@/comps/Notifications";
import getSbtcBridgeConfig from "@/actions/get-sbtc-bridge-config";
import { atomWithStorage } from "jotai/utils";

export const store = createStore();

export type BridgeConfig = Awaited<ReturnType<typeof getSbtcBridgeConfig>>;

export const bridgeConfigAtom = atom<BridgeConfig>({
  EMILY_URL: undefined,
  WALLET_NETWORK: undefined,
  SBTC_CONTRACT_DEPLOYER: undefined,
  BANNER_CONTENT: undefined,
  RECLAIM_LOCK_TIME: undefined,
});
export const depositMaxFeeAtom = atom(80000);

export enum ENV {
  MAINNET = "MAINNET",
  TESTNET = "TESTNET",
  DEVENV = "DEVENV",
}

export const envAtom = atom(ENV.TESTNET);

export const showConnectWalletAtom = atom<boolean>(false);

export const eventsAtom = atom<NotificationEventType[]>([]);
export enum WalletProvider {
  LEATHER = "leather",
  XVERSE = "xverse",
}

type Address = {
  address: string;
  publicKey: string;
};

export const walletInfoAtom = atomWithStorage<{
  selectedWallet: WalletProvider | null;
  addresses: {
    // can't call this p2wpkh because xverse sometimes uses segwit rather than native segwit
    payment: Address | null;
    taproot: Address | null;
    stacks: Address | null;
  };
}>("walletInfoV3", {
  selectedWallet: null,
  addresses: {
    payment: null,
    taproot: null,
    stacks: null,
  },
});
