export interface JSONRPCRequest {
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

export type StorageKey = string;

export type TxnHash = Felt;

export type TxnStatus =
  | "PENDING"
  | "ACCEPTED_ON_L2"
  | "ACCEPTED_ON_L1"
  | "REJECTED";

export type TxnType = "declare" | "deploy" | "invoke" | "l1Handler";

export interface BlockHash {
  block_hash: Felt;
}

export interface BlockNumber {
  block_number: number;
}

export type BlockTag = "latest" | "pending";

type BlockStatus = "PENDING" | "ACCEPTED_ON_L2" | "ACCEPTED_ON_L1" | "REJECTED";

interface BlockHeader {
  blockHash: BlockHash;
  parentHash: BlockHash;
  blockNumber: BlockNumber;
  newRoot: Felt;
  timestamp: number;
  sequencerAddress: Felt;
}

export type BlockWithTxHashes = BlockHeader &
  BlockBodyWithTxHashes & {
    status: TxnStatus;
  };

export type PendingBlockWithTxHashes = BlockBodyWithTxHashes & {
  timestamp: number;
  sequencerAddress: Felt;
  parentHash: BlockHash;
};

interface BlockBodyWithTxHashes {
  transactions: Array<TxnHash>;
}

export type BlockWithTxs = BlockHeader &
  BlockBodyWithTxs & { status: BlockStatus };

export type PendingBlockWithTxs = BlockBodyWithTxs & {
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
  contract_address: Address;
  entry_point_selector: Felt;
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
  program: string;
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

export type SyncStatus =
  | boolean
  | {
      startingBlockHash: BlockHash;
      startingBlockNum: NumAsHex;
      currentBlockHash: BlockHash;
      currentBlockNum: NumAsHex;
      highestBlockHash: BlockHash;
      highestBlockNum: NumAsHex;
    };

export interface Filter {
  filter: EventFilter & ResultPageRequest;
}
export interface EventFilter {
  fromBlock: BlockId["block_id"];
  toBlock: BlockId["block_id"];
  address: Address;
  keys: Array<Felt>;
}

export interface ResultPageRequest {
  page_size: number;
  page_number: number;
}

export interface Events {
  events: Array<EventFilter>;
}

export interface PageNumber {
  page_number: number;
}

export interface IsLastPage {
  is_last_page: boolean;
}

export type EmittedEvent = Event & {
  blockHash: BlockHash;
  blockNumber: BlockNumber;
  transactionHash: TxnHash;
};

export interface TransactionHash {
  transaction_hash: TxnHash;
}

interface TraceRoot {
  nonce: Felt;
  signature: Felt;
  function_invocation: FunctionInvocation;
}

interface FunctionInvocation {
  caller_address: Felt;
  code_address: Felt;
  entry_point_type: EntryPointType;
  call_type: CallType;
  result: Array<Felt>;
  calls: Array<FunctionInvocation>;
  events: Array<Event>;
  messages: Array<MsgToL1>;
}

enum EntryPointType {
  EXTERNAL,
  L1_HANDLER,
  CONSTRUCTOR,
}

enum CallType {
  DELEGATE,
  CALL,
}

export interface Trace {
  trace: TraceRoot;
}

export interface ClassHash {
  class_hash: Felt;
}

export interface ContractAddress {
  contract_address: Address;
}

export interface Request {
  request: FunctionCall;
}

export interface Key {
  key: StorageKey;
}

export interface Index {
  index: number;
}

export type ChainId = string;

export type ProtocolVersion = string;

export interface FunctionInvocationObj {
  function_invocation: FunctionCall;
}

export interface SignatureObj {
  signature: Signature;
}

export interface MaxFee {
  max_fee: NumAsHex;
}

export interface Version {
  version: NumAsHex;
}

export interface ContractClassObj {
  contract_class: ContractClass;
}
