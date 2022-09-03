

export interface JsonRpcRequest {
  jsonrpc: "2.0";
  id: string;
  method: string;
  params: any;
}

export interface BlockId {
  block_id: BlockHash | BlockNumber | BlockTag;
}

export type Felt = string;

export type Address = Felt;

export type TxnHash = Felt;

type TxnStatus = "PENDING" | "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1" | "REJECTED";

type TxnType = "declare" | "deploy" | "invoke" | "l1Handler";

interface BlockHash {
  block_hash: Felt;
}

interface BlockNumber {
  block_number: number;
}

type BlockTag = "latest" | "pending";

type BlockStatus = "PENDING" | "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1" | "REJECTED";

interface BlockHeader {
  blockHash: BlockHash;
  parentHash: BlockHash;
  blockNumber: BlockNumber;
  newRoot: Felt;
  timestamp: number;
  sequencerAddress: Felt;
}

export type BlockWithTxHashesOutput =
  | BlockWithTxHashes
  | PendingBlockWithTxHashes;

type BlockWithTxHashes = BlockHeader &
  BlockBodyWithTxHashes & {
    status: TxnStatus;
  };

type PendingBlockWithTxHashes = BlockBodyWithTxHashes & {
  timestamp: number;
  sequencerAddress: Felt;
  parentHash: BlockHash;
};

interface BlockBodyWithTxHashes {
  transactions: Array<TxnHash>;
}

export type BlockWithTxsOutput = BlockWithTxs | PendingBlockWithTxs;

type BlockWithTxs = BlockHeader & BlockBodyWithTxs & { status: BlockStatus };

type PendingBlockWithTxs = BlockBodyWithTxs & {
  timestamp: number;
  sequencerAddress: Felt;
  parentHash: BlockHash;
};

interface BlockBodyWithTxs {
  transactions: Array<Txn>;
}

export interface StateUpdate {
  blockHash: BlockHash;
  newRoot: Felt;
  oldRoot: Felt;
  stateDiff: StateDiff;
}

interface StateDiff {
  storageDiffs: Array<StorageDiffItem>;
  declaredContracts: Array<DeclaredContractItem>;
  deployedContracts: Array<DeployedContractItem>;
  nonces: Array<Nonce>;
}

interface StorageDiffItem {
  address: Felt;
  key: Felt;
  value: Felt;
}

interface DeclaredContractItem {
  classHash: Felt;
}

interface DeployedContractItem {
  address: Felt;
  classHash: Felt;
}

interface Nonce {
  contractAddress: Address;
  nonce: Felt;
}

export type Txn = InvokeTxn | DeclareTxn | DeployTxn;

export type InvokeTxn = CommonTxnProperties & FunctionCall;

type DeclareTxn = CommonTxnProperties & {
  classHash: Felt;
  senderAddress: Address;
};

interface DeployTxn {
  transactionHash: TxnHash;
  classHash: Felt;
  version: NumAsHex;
  type: TxnType;
  contractAddress: Felt;
  contractAddressSalt: Felt;
  constructorCalldata: Array<Felt>;
}

interface CommonTxnProperties {
  transactionHash: TxnHash;
  maxFee: Felt;
  version: NumAsHex;
  signature: Signature;
  nonce: Felt;
  type: TxnType;
}

export interface FunctionCall {
  contractAddress: Address;
  entryPointSelector: Felt;
  calldata: Array<Felt>;
}

type NumAsHex = string;

type Signature = Array<Felt>;

export type TxnReceipt =
  | InvokeTxnReceipt
  | DeclareTxnReceipt
  | DeployTxnReceipt
  | PendingTxnReceipt;

type InvokeTxnReceipt = CommonReceiptProperties & InvokeTxnReceiptProperties;

type DeclareTxnReceipt = CommonReceiptProperties;

type DeployTxnReceipt = CommonReceiptProperties;

type PendingTxnReceipt =
  | PendingInvokeTxnReceipt
  | PendingCommonReceiptProperties;

interface CommonReceiptProperties {
  transactionHash: TxnHash;
  actualFee: Felt;
  status: TxnStatus;
  statusData: string;
  blockHash: BlockHash;
  blockNumber: BlockNumber;
}
interface InvokeTxnReceiptProperties {
  messagesSent: MsgToL1;
  l1OriginMessage: MsgToL2;
  events: Event;
}

type PendingInvokeTxnReceipt = PendingCommonReceiptProperties &
  InvokeTxnReceiptProperties;

interface PendingCommonReceiptProperties {
  transactionHash: TxnHash;
  actualFee: Felt;
  type?: TxnType;
}

interface MsgToL1 {
  toAddress: Felt;
  payload: Array<Felt>;
}

interface MsgToL2 {
  from_address: Felt;
  payload: Array<Felt>;
}

type Event = EventContent & {
  fromAddress: Felt;
};

interface EventContent {
  keys: Array<Felt>;
  data: Array<Felt>;
}

export interface ContractClass {
  program: string; // a base64 representation of the compressed program code
  entryPointsByType: {
    constructor: ContractEntryPointList;
    external: ContractEntryPointList;
    l1Handler: ContractEntryPointList;
  };
}

type ContractEntryPointList = Array<ContractEntryPoint>;

interface ContractEntryPoint {
  offset: NumAsHex;
  selector: Felt;
}

export interface FeeEstimate {
  gasConsumed: NumAsHex;
  gasPrice: NumAsHex;
  overallFee: NumAsHex;
}

export interface BlockHashAndNumberOutput {
  blockHash: BlockHash;
  blockNumber: BlockNumber;
}

export interface SyncingOutput {
  syncStatus: SyncStatus;
}

type SyncStatus =
  | boolean
  | {
      startingBlockHash: BlockHash;
      startingBlockNum: NumAsHex;
      currentBlockHash: BlockHash;
      currentBlockNum: NumAsHex;
      highestBlockHash: BlockHash;
      highestBlockNum: NumAsHex;
    };

export type Filter = EventFilter & ResultPageRequest;

interface EventFilter = {
  fromBlock: BlockId;
  toBlock: BlockId;
  address: Address;
  keys: Array<Felt>;
};

interface ResultPageRequest {
  pageSize: number;
  pageNumber: number;
};

export interface Events {
  events: Array<EmittedEvent>;
  pageNumber: number;
  isLastPage: boolean;
};

type EmittedEvent = Event & {
  blockHash: BlockHash;
  blockNumber: BlockNumber;
  transactionHash: TxnHash;
};
