import RPCProvider from "../RPC";
const RPC_URL = "http://localhost:9545";
import { BlockWithTxHashes, PendingBlockWithTxHashes } from "../RPC/types";
import {
  block_number,
  block_hash,
  block_tag_latest,
  block_tag_pending,
  contractAddress,
  key,
} from "./mocks";

const rpc = new RPCProvider(RPC_URL);

describe("JSON RPC Provider", () => {
  describe("methods", () => {
    const blockIds = [
      block_number,
      block_hash,
      block_tag_latest,
      // block_tag_pending, SKIPPED - need to enable pending block in pathfinder
    ];

    describe("getBlockWithTxHashes()", () => {
      test.each(blockIds)("blockId: %p", async (blockId) => {
        const block = await rpc.getBlockWithTxHashes({ block_id: blockId });
        expect(block).toHaveProperty("result");
      });
    });

    describe("getStorageAt()", () => {
      test.each(blockIds)("blockId: %p", async (blockId) => {
        const block = await rpc.getStorageAt({
          contract_address: contractAddress,
          key,
          block_id: blockId,
        });
        expect(block).toHaveProperty("result");
      });
    });
  });
});
