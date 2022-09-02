import "isomorphic-unfetch";
import { JSONRPCBody, BlockID } from "./types";

class RPC {
  url: URL;

  constructor(url: string) {
    this.url = new URL(url);
  }
  async getBlockWithTxHashes(block_id: BlockID): Promise<any> {
    const body: JSONRPCBody = {
      jsonrpc: "2.0",
      id: "0",
      method: "starknet_getBlockWithTxHashes",
      params: block_id,
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
