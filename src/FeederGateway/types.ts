export type Network = "MAIN_NET" | "TEST_NET";

export interface BlockHash {
  blockHash: string;
}

export interface BlockId {
  blockId: number;
}

export interface TransactionId {
  transactionId: number;
}

export interface TransactionHash {
  transactionHash: string;
}

export interface ContractAddress {
  contractAddress: string;
}

export interface Key {
  key: number;
}

export interface BlockNumber {
  blockNumber: number;
}
