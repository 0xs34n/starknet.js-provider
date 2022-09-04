import "isomorphic-unfetch";
import {
  Address,
  BlockHashAndNumberOutput,
  BlockId,
  BlockTag,
  BlockWithTxHashes,
  BlockWithTxs,
  ContractClass,
  Events,
  FeeEstimate,
  Felt,
  Filter,
  FunctionCall,
  InvokeTxn,
  JSONRPCRequest,
  PendingBlockWithTxHashes,
  PendingBlockWithTxs,
  StateUpdate,
  StorageKey,
  SyncingOutput,
  Txn,
  TxnHash,
  TxnReceipt,
} from "./types";

class RPC {
  url: URL;

  constructor(url: string) {
    this.url = new URL(url);
  }

  private async fetchJSONRPC({
    method,
    params,
  }: {
    method: string;
    params: any;
  }) {
    const body: JSONRPCRequest = {
      jsonrpc: "2.0",
      id: "0",
      method,
      params,
    };

    const response = await fetch(this.url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    return response.json();
  }

  async getBlockWithTxHashes(
    params: BlockId
  ): Promise<BlockWithTxHashes | PendingBlockWithTxHashes> {
    return this.fetchJSONRPC({
      method: "starknet_getBlockWithTxHashes",
      params,
    });
  }

  async getBlockWithTxs(
    params: BlockId
  ): Promise<BlockWithTxs | PendingBlockWithTxs> {
    return this.fetchJSONRPC({
      method: "starknet_getBlockWithTxs",
      params,
    });
  }

  async getStateUpdate(params: BlockId): Promise<StateUpdate> {
    return this.fetchJSONRPC({
      method: "starknet_getStateUpdate",
      params,
    });
  }

  async getStorageAt(params: {
    contract_address: Address;
    key: StorageKey;
    block_id?: BlockId["block_id"];
  }): Promise<Felt> {
    return this.fetchJSONRPC({
      method: "starknet_getStorageAt",
      params: { block_id: "pending", ...params },
    });
  }

  // async getTransactionByHash(transactionHash: TxnHash): Promise<Txn> {}

  // async getTransactionByBlockIdAndIndex(
  //   blockId: BlockId,
  //   txIndex: number
  // ): Promise<Txn> {}

  // async getTransactionReceipt(transactionHash: TxnHash): Promise<TxnReceipt> {}

  // async getClassHashAt(
  //   blockId: BlockId,
  //   contractAddress: Address
  // ): Promise<Felt> {}

  // async getClassAt(
  //   blockId: BlockId,
  //   contractAddress: Address
  // ): Promise<ContractClass> {}

  // async getBlockTransactionCount(blockId: BlockId): Promise<number> {}

  // starknetCall(request: FunctionCall, blockId: BlockId): Promise<Felt> {}

  // estimateFee(request: InvokeTxn, blockId: BlockId): Promise<FeeEstimate> {}

  // blockNumber(): Promise<number> {}

  // blockHashAndNumber(): Promise<BlockHashAndNumberOutput> {}

  // pendingTransactions(): Promise<Array<Txn>> {}

  // protocolVersion(): Promise<string> {}

  // syncing(): Promise<SyncingOutput> {}

  // async getEvents(filter: Filter): Promise<Events> {}

  // async getNonce(contractAddress: Address): Promise<Felt> {}
}

export default RPC;
