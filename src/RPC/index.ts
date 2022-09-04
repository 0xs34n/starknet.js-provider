import "isomorphic-unfetch";
import {
  Address,
  BlockId,
  BlockWithTxHashes,
  BlockWithTxs,
  Felt,
  JSONRPCRequest,
  PendingBlockWithTxHashes,
  PendingBlockWithTxs,
  StateUpdate,
  StorageKey,
  Trace,
  TransactionHash,
  Txn,
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

  async getStorageAt({
    contract_address,
    key,
    block_id = "pending",
  }: {
    contract_address: Address;
    key: StorageKey;
  } & Partial<BlockId>): Promise<Felt> {
    return this.fetchJSONRPC({
      method: "starknet_getStorageAt",
      params: { contract_address, key, block_id },
    });
  }

  async getTransactionByHash(params: TransactionHash): Promise<Txn> {
    return this.fetchJSONRPC({
      method: "starknet_getTransactionByHash",
      params,
    });
  }

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

  // not implemented in pathfinder
  async traceTransaction(params: TransactionHash): Promise<Trace> {
    return this.fetchJSONRPC({
      method: "starknet_traceTransaction",
      params,
    });
  }

  // not implemented in pathfinder
  async traceBlockTransactions(params: any) {
    return this.fetchJSONRPC({
      method: "starknet_traceBlockTransactions",
      params,
    });
  }
}

export default RPC;
