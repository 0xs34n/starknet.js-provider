import "isomorphic-unfetch";
import {
  Address,
  BlockHashAndNumberOutput,
  BlockId,
  BlockWithTxHashesOutput,
  BlockWithTxsOutput,
  ContractClass,
  Events,
  FeeEstimate,
  Felt,
  Filter,
  FunctionCall,
  InvokeTxn,
  JsonRpcRequest,
  StateUpdate,
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

  async getBlockWithTxHashes(blockId: BlockId): Promise<BlockWithTxHashesOutput> {
    if (!blockId) {
      throw new Error ("INVALID_BLOCK_ID")
    }

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
    if (!blockId) {
      throw new Error ("INVALID_BLOCK_ID")
    }

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

  async getStateUpdate(blockId: BlockId): Promise<StateUpdate> {
    if (!blockId) {
      throw new Error ("INVALID_BLOCK_ID")
    }

    const body: JsonRpcRequest = {
      jsonrpc: "2.0",
      id: "0",
      method: "starknet_getStateUpdate",
      params: blockId,
    };

    const response = await fetch(this.url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    return await response.json();
  }

  async getStorageAt(contractAddress: Address, key: string, blockId: BlockId): Promise<Felt> {
    if (!blockId) {
      throw new Error ("INVALID_BLOCK_ID")
    } else if (!contractAddress) {
      throw new Error ("CONTRACT_NOT_FOUND")
    } 

    const body: JsonRpcRequest = {
      jsonrpc: "2.0",
      id: "0",
      method: "starknet_getStateUpdate",
      params: {
        contractAddress: contractAddress,
        key: key,
        blockId: blockId,
      },
    };

    const response = await fetch(this.url, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    return await response.json();
  }

  async getTransactionByHash(transactionHash: TxnHash): Promise<Txn> {
    // throw INVALID_TXN_HASH
    return;
  }

  async getTransactionByBlockIdAndIndex(blockId: BlockId, txIndex: number): Promise<Txn> {
    // throw INVALID_BLOCK_ID
    // throw INVALID_TXN_INDEX
    return;
  }

  async getTransactionReceipt(transactionHash: TxnHash): Promise<TxnReceipt> {
    // throw INVALID_TXN_HASH
    return;
  }

  async getClassHashAt(blockId: BlockId, contractAddress: Address): Promise<Felt> {
    // throw INVALID_BLOCK_ID
    // throw CONTRACT_NOT_FOUND
    return;
  }

  async getClassAt(blockId: BlockId, contractAddress: Address): Promise<ContractClass> {
    // throw INVALID_BLOCK_ID
    // throw CONTRACT_NOT_FOUND
    return;
  }

  async getBlockTransactionCount(blockId: BlockId): Promise<number> {
    // throw INVALID_BLOCK_ID
    return;
  }

  starknetCall(request: FunctionCall, blockId: BlockId): Promise<Felt> {
    // throw CONTRACT_NOT_FOUND
    // throw INVALID_MESSAGE_SELECTOR
    // throw INVALID_CALL_DATA
    // throw CONTRACT_ERROR
    // throw INVALID_BLOCK_ID
    return;
  }

  estimateFee(request: InvokeTxn, blockId: BlockId): Promise<FeeEstimate> {
    // throw CONTRACT_NOT_FOUND
    // throw INVALID_MESSAGE_SELECTOR
    // throw INVALID_CALL_DATA
    // throw CONTRACT_ERROR
    // throw INVALID_BLOCK_ID
    return;
  }

  blockNumber(): Promise<number> {
    return;
  }

  blockHashAndNumber(): Promise<BlockHashAndNumberOutput> {
    return;
  }

  pendingTransactions(): Promise<Array<Txn>> {
    return;
  }

  protocolVersion(): Promise<string> {
    return;
  }

  syncing(): Promise<SyncingOutput> {
    return;
  }

  async getEvents(filter: Filter): Promise<Events> {
    // throw PAGE_SIZE_TOO_BIG
    return;
  }

  async getNonce(contractAddress: Address): Promise<Felt> {
    // throw CONTRACT_NOT_FOUND
    return;
  }
}

export default RPC;
