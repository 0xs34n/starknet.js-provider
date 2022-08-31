export type GetBlockWithTxHashesParam = BlockID;

export interface JSONRPCBody {
  jsonrpc: "2.0";
  id: "0";
  method: string;
  params: GetBlockWithTxHashesParam;
}

export interface BlockID {
  block_id: BlockHashObject | BlockNumberObject | BlockTag;
}

type BlockTag = "latest" | "pending";

interface BlockHashObject {
  block_hash: BlockHash;
}

interface BlockNumberObject {
  block_number: number;
}

type felt = number; // TODO

type BlockHash = felt;

interface GetBlockWithTxHashesRes {}

interface BlockWithTxs {
  status: BlockStatus;
  block_header: {
    block_hash: felt;
    parent_hash: felt;
  };
  block_body_with_txs: {
    items: {
      transaction: "";
    };
  };
}

type BlockStatus = "PENDING" | "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1" | "REJECTED";
