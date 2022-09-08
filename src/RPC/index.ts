import fetch from "isomorphic-unfetch";
import {
  BlockId,
  BlockHash,
  BlockNumber,
  BlockWithTxHashes,
  BlockWithTxs,
  ChainId,
  ClassHash,
  ContractAddress,
  ContractClass,
  Events,
  FeeEstimate,
  FunctionInvocationObj,
  Felt,
  Filter,
  Index,
  IsLastPage,
  JSONRPCRequest,
  Key,
  MaxFee,
  PageNumber,
  PendingBlockWithTxHashes,
  PendingBlockWithTxs,
  ProtocolVersion,
  Request,
  StateUpdate,
  TransactionHash,
  Txn,
  TxnReceipt,
  SignatureObj,
  SyncStatus,
  Version,
  ContractClassObj,
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
    params?: any;
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

    const responseJSON = await response.json();

    const { error, result }: any = responseJSON;

    if (error) {
      throw error;
    } else {
      return result;
    }
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
    key,
    contract_address,
    block_id = "pending",
  }: Key & ContractAddress & Partial<BlockId>): Promise<Felt> {
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

  async getTransactionByBlockIdAndIndex(params: Index & BlockId): Promise<Txn> {
    return this.fetchJSONRPC({
      method: "starknet_getTransactionByBlockIdAndIndex",
      params,
    });
  }

  async getTransactionReceipt(params: TransactionHash): Promise<TxnReceipt> {
    return this.fetchJSONRPC({
      method: "starknet_getTransactionReceipt",
      params,
    });
  }

  async getClass(params: ClassHash): Promise<ContractClass> {
    return this.fetchJSONRPC({
      method: "starknet_getClass",
      params,
    });
  }

  async getClassHashAt({
    contract_address,
    block_id = "pending",
  }: ContractAddress & Partial<BlockId>): Promise<Felt> {
    return this.fetchJSONRPC({
      method: "starknet_getClassHashAt",
      params: { contract_address, block_id },
    });
  }

  async getClassAt({
    contract_address,
    block_id = "pending",
  }: ContractAddress & Partial<BlockId>): Promise<ContractClass> {
    return this.fetchJSONRPC({
      method: "starknet_getClassAt",
      params: { contract_address, block_id },
    });
  }

  async getBlockTransactionCount(params: BlockId): Promise<number> {
    return this.fetchJSONRPC({
      method: "starknet_getBlockTransactionCount",
      params,
    });
  }

  async call({
    request,
    block_id = "pending",
  }: Request & Partial<BlockId>): Promise<Felt> {
    return this.fetchJSONRPC({
      method: "starknet_call",
      params: { request, block_id },
    });
  }

  async estimateFee({
    request,
    block_id = "pending",
  }: Request & Partial<BlockId>): Promise<FeeEstimate> {
    return this.fetchJSONRPC({
      method: "starknet_estimateFee",
      params: { request, block_id },
    });
  }

  async blockNumber(): Promise<BlockNumber["block_number"]> {
    return this.fetchJSONRPC({
      method: "starknet_blockNumber",
    });
  }

  async blockHashAndNumber(): Promise<BlockHash & BlockNumber> {
    return this.fetchJSONRPC({
      method: "starknet_blockHashAndNumber",
    });
  }

  async chainId(): Promise<ChainId> {
    return this.fetchJSONRPC({
      method: "starknet_chainId",
    });
  }

  async pendingTransactions(): Promise<Array<Txn>> {
    return this.fetchJSONRPC({
      method: "starknet_pendingTransactions",
    });
  }

  async protocolVersion(): Promise<ProtocolVersion> {
    return this.fetchJSONRPC({
      method: "starknet_protocolVersion",
    });
  }

  async syncing(): Promise<false | SyncStatus> {
    return this.fetchJSONRPC({
      method: "starknet_syncing",
    });
  }

  async getEvents(params: Filter): Promise<Events & PageNumber & IsLastPage> {
    return this.fetchJSONRPC({
      method: "starknet_getEvents",
      params,
    });
  }

  async getNonce(params: ContractAddress): Promise<Felt> {
    return this.fetchJSONRPC({
      method: "starknet_getNonce",
      params,
    });
  }

  async addInvokeTransaction(
    params: FunctionInvocationObj & SignatureObj & MaxFee & Version
  ): Promise<TransactionHash> {
    return this.fetchJSONRPC({
      method: "starknet_addInvokeTransaction",
      params,
    });
  }

  async addDeclareTransaction(
    params: ContractClassObj & Version
  ): Promise<TransactionHash & ClassHash> {
    return this.fetchJSONRPC({
      method: "starknet_addDeclareTransaction",
      params,
    });
  }

  // not implemented in pathfinder -- openrpc trace api file
  // async traceTransaction(params: TransactionHash): Promise<Trace> {
  //   return this.fetchJSONRPC({
  //     method: "starknet_traceTransaction",
  //     params,
  //   });
  // }

  // // not implemented in pathfinder -- openrpc trace api file
  // async traceBlockTransactions(params: any) {
  //   return this.fetchJSONRPC({
  //     method: "starknet_traceBlockTransactions",
  //     params,
  //   });
  // }
}

export default RPC;
