export interface JSONRPCBody {
  jsonrpc: "2.0";
  id: string;
  method: string;
  params: BlockID;
}

export interface BlockID {
  block_id: BlockHash | BlockNumber | BlockTag;
}

type BlockTag = "latest" | "pending";

export interface BlockHash {
  block_hash: felt;
}

export interface BlockNumber {
  block_number: number;
}

type felt = number; // TODO

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
