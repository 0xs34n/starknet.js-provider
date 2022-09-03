export interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: string;
  method: string;
  params: any;
}

export type BlockId = BlockHash | BlockNumber | BlockTag;

export type Felt = string;

export type Address = Felt;

export type TxnHash = Felt;

type TxnStatus = 'PENDING' | 'ACCEPTED_ON_L2' | 'ACCEPTED_ON_L1' | 'REJECTED';

type TxnType = 'declare' | 'deploy' | 'invoke' | 'l1Handler';

type BlockHash = Felt;

type BlockNumber = number;

type BlockTag = "latest" | "pending";

type BlockStatus = "PENDING" | "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1" | "REJECTED";

type BlockHeader = {
  blockHash: BlockHash;
  parentHash: BlockHash;
  blockNumber: BlockNumber;
  newRoot: Felt;
  timestamp: number;
  sequencerAddress: Felt;
};

export type BlockWithTxHashesOutput = BlockWithTxHashes | PendingBlockWithTxHashes

type BlockWithTxHashes = BlockHeader & BlockBodyWithTxHashes & {
  status: TxnStatus
};

type PendingBlockWithTxHashes = BlockBodyWithTxHashes & {
  timestamp: number;
  sequencerAddress: Felt;
  parentHash: BlockHash;
};

type BlockBodyWithTxHashes = {
  transactions: Array<TxnHash>
};

export type BlockWithTxsOutput = BlockWithTxs | PendingBlockWithTxs

type BlockWithTxs = BlockHeader & BlockBodyWithTxs & { status: BlockStatus };

type PendingBlockWithTxs = BlockBodyWithTxs & {
  timestamp: number;
  sequencerAddress: Felt;
  parentHash: BlockHash;
};

type BlockBodyWithTxs = {
  transactions: Array<Txn>;
};

export type StateUpdate = {
  blockHash: BlockHash;
  newRoot: Felt;
  oldRoot: Felt;
  stateDiff: StateDiff;
}

type StateDiff = {
  storageDiffs: Array<StorageDiffItem>;
  declaredContracts: Array<DeclaredContractItem>;
  deployedContracts: Array<DeployedContractItem>;
  nonces: Array<Nonce>;
}

type StorageDiffItem = {
  address: Felt;
  key: Felt;
  value: Felt;
}

type DeclaredContractItem = {
  classHash: Felt;
}

type DeployedContractItem = {
  address: Felt;
  classHash: Felt;
}

type Nonce = {
  contractAddress: Address;
  nonce: Felt;
}

export type Txn = InvokeTxn | DeclareTxn | DeployTxn;

export type InvokeTxn = CommonTxnProperties & FunctionCall;

type DeclareTxn = CommonTxnProperties & {
  classHash: Felt;
  senderAddress: Address;
};

type DeployTxn = {
  transactionHash: TxnHash;
  classHash: Felt;
  version: NumAsHex;
  type: TxnType;
  contractAddress: Felt;
  contractAddressSalt: Felt;
  constructorCalldata: Array<Felt>;
};

type CommonTxnProperties = {
  transactionHash: TxnHash;
  maxFee: Felt;
  version: NumAsHex;
  signature: Signature;
  nonce: Felt;
  type: TxnType;
};

export type FunctionCall = {
  contractAddress: Address;
  entryPointSelector: Felt;
  calldata: Array<Felt>;
};

type NumAsHex = string;

type Signature = Array<Felt>;

export type TxnReceipt = InvokeTxnReceipt | DeclareTxnReceipt | DeployTxnReceipt | PendingTxnReceipt;

type InvokeTxnReceipt = CommonReceiptProperties & InvokeTxnReceiptProperties;

type DeclareTxnReceipt = CommonReceiptProperties;

type DeployTxnReceipt = CommonReceiptProperties;

type PendingTxnReceipt = PendingInvokeTxnReceipt | PendingCommonReceiptProperties;

type CommonReceiptProperties = {
   transactionHash: TxnHash;
   actualFee: Felt;
   status: TxnStatus;
   statusData: string;
   blockHash: BlockHash;
   blockNumber: BlockNumber;
 };
type InvokeTxnReceiptProperties = {
   messagesSent: MsgToL1;
   l1OriginMessage: MsgToL2;
   events: Event;
 };

type PendingInvokeTxnReceipt = PendingCommonReceiptProperties & InvokeTxnReceiptProperties;

type PendingCommonReceiptProperties = {
   transactionHash: TxnHash;
   actualFee: Felt;
   type?: TxnType;
 };

type MsgToL1 = {
  toAddress: Felt;
  payload: Array<Felt>;
};

type MsgToL2 = {
  from_address: Felt;
  payload: Array<Felt>;
};

type Event = EventContent & {
  fromAddress: Felt;
};

type EventContent = {
  keys: Array<Felt>;
  data: Array<Felt>;
}
 
export type ContractClass = {
   program: string; // a base64 representation of the compressed program code
   entryPointsByType: {
     constructor: ContractEntryPointList;
     external: ContractEntryPointList;
     l1Handler: ContractEntryPointList;
   };
 };
 
type ContractEntryPointList = Array<ContractEntryPoint>;

type ContractEntryPoint = {
   offset: NumAsHex;
   selector: Felt;
 };

export type FeeEstimate = {
  gasConsumed: NumAsHex;
  gasPrice: NumAsHex;
  overallFee: NumAsHex;
}

export type BlockHashAndNumberOutput = {
  blockHash: BlockHash;
  blockNumber: BlockNumber;
};

export type SyncingOutput = {
  syncStatus: syncStatus;
}

type syncStatus = boolean | {
  startingBlockHash: BlockHash;
  startingBlockNum: NumAsHex;
  currentBlockHash: BlockHash;
  currentBlockNum: NumAsHex;
  highestBlockHash: BlockHash;
  highestBlockNum: NumAsHex;
}

export type Filter = EventFilter & ResultPageRequest;

type EventFilter = {
  fromBlock: BlockId;
  toBlock: BlockId;
  address: Address;
  keys: Array<Felt>;
}

type ResultPageRequest = {
  pageSize: number;
  pageNumber: number;
}

export type Events = {
  events: Array<EmittedEvent>;
  pageNumber: number;
  isLastPage: boolean;
}

type EmittedEvent = Event & {
  blockHash: BlockHash;
  blockNumber: BlockNumber;
  transactionHash: TxnHash;
}