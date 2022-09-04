import "isomorphic-unfetch";
import {
  Address,
  BlockHashAndNumberOutput,
  BlockId,
  BlockWithTxHashes,
  BlockWithTxsOutput,
  ContractClass,
  Events,
  FeeEstimate,
  Felt,
  Filter,
  FunctionCall,
  InvokeTxn,
  JsonRpcRequest,
  PendingBlockWithTxHashes,
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

  async getBlockWithTxHashes(
    blockId: BlockId
  ): Promise<BlockWithTxHashes | PendingBlockWithTxHashes> {
    const body: JsonRpcRequest = {
      jsonrpc: "2.0",
      id: "0",
      method: "starknet_getBlockWithTxHashes",
      params: blockId,
    };

    const response = await fetch(this.url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    return await response.json();
  }

  async getBlockWithTxs(blockId: BlockId): Promise<BlockWithTxsOutput> {
    const body: JsonRpcRequest = {
      jsonrpc: "2.0",
      id: "0",
      method: "starknet_getBlockWithTxs",
      params: blockId,
    };

    const response = await fetch(this.url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    return await response.json();
  }

  async getStateUpdate(params: BlockId): Promise<StateUpdate> {
    const body: JsonRpcRequest = {
      jsonrpc: "2.0",
      id: "0",
      method: "starknet_getStateUpdate",
      params,
    };

    const response = await fetch(this.url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    return await response.json();
  }

  async getStorageAt(params: {
    contract_address: Address;
    key: StorageKey;
    block_id: BlockId["block_id"];
  }): Promise<Felt> {
    const body: JsonRpcRequest = {
      jsonrpc: "2.0",
      id: "0",
      method: "starknet_getStorageAt",
      params,
    };

    const response = await fetch(this.url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    return await response.json();
  }

  async getTransactionByHash(transactionHash: TxnHash): Promise<Txn> {}

  async getTransactionByBlockIdAndIndex(
    blockId: BlockId,
    txIndex: number
  ): Promise<Txn> {}

  async getTransactionReceipt(transactionHash: TxnHash): Promise<TxnReceipt> {}

  async getClassHashAt(
    blockId: BlockId,
    contractAddress: Address
  ): Promise<Felt> {}

  async getClassAt(
    blockId: BlockId,
    contractAddress: Address
  ): Promise<ContractClass> {}

  async getBlockTransactionCount(blockId: BlockId): Promise<number> {}

  starknetCall(request: FunctionCall, blockId: BlockId): Promise<Felt> {}

  estimateFee(request: InvokeTxn, blockId: BlockId): Promise<FeeEstimate> {}

  blockNumber(): Promise<number> {}

  blockHashAndNumber(): Promise<BlockHashAndNumberOutput> {}

  pendingTransactions(): Promise<Array<Txn>> {}

  protocolVersion(): Promise<string> {}

  syncing(): Promise<SyncingOutput> {}

  async getEvents(filter: Filter): Promise<Events> {}

  async getNonce(contractAddress: Address): Promise<Felt> {}
}

export default RPC;
