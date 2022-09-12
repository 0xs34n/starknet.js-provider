import {
  BlockNumber,
  BlockHash,
  BlockTag,
  Address,
  StorageKey,
  BlockId,
  Filter,
} from "../types";

export const block_number: BlockNumber = { block_number: 322475 };

export const block_hash: BlockHash = {
  block_hash:
    "0x1398bcf388534773c7709c6c457cffb80b5e88268c001f6615df0568a5a2d15",
};

export const block_tag_latest: BlockTag = "latest";

export const block_tag_pending: BlockTag = "pending";

export const contract_address: Address =
  "0x03CA81a47bf5E646b45382b7FF397fc5A2CbCb193341019bbc75f6C0Fa58de64";

export const key: StorageKey = "0x999";

export const transaction_hash =
  "0x603bae070c79836e8795a278e82f4b065adda3b554eac1759cbb43a57e675a8";

export const index = 0;

export const class_hash =
  "0x03c96d830d2fe7279434da695c5b6476caf2c3394976b767f1700c7675071b61";

export const request = {
  contract_address:
    "0x049d36570d4e46f48e99674bd3fcc84644ddd6b96f7c741b1562b82f9e004dc7",
  entry_point_selector:
    "0x2e4263afad30923c891518314c3c95dbe830a16874e8abc5777a9a20b54c76e",
  calldata: [
    "0x04c83d3fa770187d7b0a23b3aa7132c7c8273fb4ec3db416f86e4a385596769a",
  ],
};

export const page_size = 1;

export const page_number = 1;

export function filter(block_id: BlockId["block_id"]) {
  return {
    filter: {
      fromBlock: block_id,
      toBlock: block_id,
      address: contract_address,
      keys: [key],
      page_number,
      page_size,
    },
  };
}

export const invoke = {
  function_invocation: request,
  signature: [],
  max_fee: "0x0",
  version: "1",
};

export const declare = {
  contract_class: {
    program: "",
    entryPointsByType: {
      constructor: "",
      external: "",
      l1Handler: "",
    },
  },
  version: "1",
};

export const filterAstralyEvent: Filter = {
  filter: {
    fromBlock: { block_number: 300000 },
    toBlock: { block_number: 320000 },
    address:
      "0x03236409bbcd10f29d56cbe270e383d865e71837959cea7127611d4890bb46d",
    keys: ["0x49e950a233749038bf94fe7e3862784769a3d602cf49f29a7d815a2baed32b"],
    page_number: 1,
    page_size: 50,
  },
};
