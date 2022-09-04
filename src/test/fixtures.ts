import {
  BlockNumber,
  BlockHash,
  BlockTag,
  Address,
  StorageKey,
} from "../RPC/types";

export const block_number: BlockNumber = { block_number: 49 };

export const block_hash: BlockHash = {
  block_hash:
    "0x1554f5ffdb2b911524293b626e5d34cc3b92cbea5f3206294645d6d8338351b",
};

export const block_tag_latest: BlockTag = "latest";

export const block_tag_pending: BlockTag = "pending";

export const contractAddress: Address =
  "0x03CA81a47bf5E646b45382b7FF397fc5A2CbCb193341019bbc75f6C0Fa58de64";

export const key: StorageKey = "0x999";
