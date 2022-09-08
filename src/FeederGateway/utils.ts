import { Network } from "./types";

export function getFeederGatewayUrl(network: Network) {
  if (network === "MAIN_NET") {
    return "https://alpha-mainnet.starknet.io";
  } else if (network === "TEST_NET") {
    return "https://alpha4.starknet.io";
  } else {
    throw new Error(`Unknown network: ${network}`);
  }
}

export function checkGateway(endpoint: string) {
  if (endpoint === "add_transaction") {
    return "gateway";
  } else {
    return "feeder_gateway";
  }
}

export async function handleResponse(response: Response) {
  if (response.ok) {
    return await response.json();
  } else {
    throw response;
  }
}
