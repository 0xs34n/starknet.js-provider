import RPCProvider from "../RPC";

const RPC_URL = process.env.RPC_URL || "http://localhost:9545";

import { BlockWithTxHashes, PendingBlockWithTxHashes } from "../RPC/types";
import {
  block_number,
  block_hash,
  block_tag_latest,
  block_tag_pending,
  contractAddress,
  key,
} from "./fixtures";

const rpc = new RPCProvider(RPC_URL);

describe("JSON RPC Provider", () => {
  describe("methods", () => {
    const blockIds = [
      block_number,
      block_hash,
      block_tag_latest,
      block_tag_pending,
    ];

    describe("getBlockWithTxHashes()", () => {
      test.each(blockIds)("blockId: %p", async (blockId) => {
        const block = await rpc.getBlockWithTxHashes({ block_id: blockId });
        expect(block).toHaveProperty("result");
      });
    });

    describe("getBlockWithTxs()", () => {
      test.each(blockIds)("blockId: %p", async (blockId) => {
        const block = await rpc.getBlockWithTxs({ block_id: blockId });
        expect(block).toHaveProperty("result");
      });
    });

    describe("getStatusUpdate()", () => {
      test.each(blockIds)("blockId: %p", async (blockId) => {
        const block = await rpc.getStateUpdate({ block_id: blockId });
        expect(block).toHaveProperty("result");
      });
    });

    describe("getStorageAt()", () => {
      test("block_id default pending", async () => {
        const block = await rpc.getStorageAt({
          contract_address: contractAddress,
          key,
        });
        expect(block).toHaveProperty("result");
      });

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
