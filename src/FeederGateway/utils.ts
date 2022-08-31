import { network } from "./types";

export function getFeederGatewayUrl(network: network) {
  if (network === "MAIN_NET") {
    return "https://alpha-mainnet.starknet.io";
  } else if (network === "TEST_NET") {
    return "https://alpha4.starknet.io";
  } else {
    throw new Error(`Unknown network: ${network}`);
  }
}
