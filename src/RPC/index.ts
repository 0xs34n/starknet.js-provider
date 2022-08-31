import "isomorphic-unfetch";
import { JSON_RPC_BODY_COMMON } from "./constants";
import { JSONRPCBody, GetBlockWithTxHashesParam } from "./types";

class RPC {
  url: URL;

  constructor(url: string) {
    this.url = new URL(url);
  }

  async getBlockWithTxHashes(params: GetBlockWithTxHashesParam): Promise<any> {
    const body: JSONRPCBody = {
      ...JSON_RPC_BODY_COMMON,
      method: "starknet_getBlockWithTxHashes",
      params,
    };

    const response = await fetch(this.url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    return await response.json();
  }

  getBlockWithTxs() {}

  getStateUpdate() {}

  getStorageAt() {}

  getTransactionByHash() {}

  getTransactionByBlockIdAndIndex() {}

  getTransactionReceipt() {}

  getClassHashAt() {}

  getClassAt() {}

  getBlockTransactionCount() {}

  starknetCall() {}

  estimateFee() {}

  blockNumber() {}

  blockHashAndNumber() {}

  pendingTransactions() {}

  protocolVersion() {}

  syncing() {}

  getEvents() {}

  getNonce() {}
}

export default RPC;
