import RPCProvider from "../RPC";

const RPC_URL = process.env.RPC_URL || "http://localhost:9545";

import { BlockWithTxHashes, PendingBlockWithTxHashes } from "../RPC/types";
import {
  block_number,
  block_hash,
  block_tag_latest,
  block_tag_pending,
  contract_address,
  key,
  transaction_hash,
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
          contract_address: contract_address,
          key,
        });
        expect(block).toHaveProperty("result");
      });

      test.each(blockIds)("blockId: %p", async (blockId) => {
        const block = await rpc.getStorageAt({
          contract_address: contract_address,
          key,
          block_id: blockId,
        });
        expect(block).toHaveProperty("result");
      });
    });

    describe("getTransactionByHash()", () => {
      test(`transaction_hash = ${transaction_hash}`, async () => {
        const block = await rpc.getTransactionByHash({
          transaction_hash,
        });
        expect(block).toHaveProperty("result");
      });
    });

    // not be implemented in pathfinder - skip
    describe.skip("traceTransaction()", () => {
      test(`tx hash = ${transaction_hash}`, async () => {
        const block = await rpc.traceTransaction({
          transaction_hash: transaction_hash,
        });
        expect(block).toHaveProperty("result");
      });
    });

    // not implemented in pathfinder - skip
    describe.skip("traceBlockTransactions()", () => {
      test(``, async () => {
        const block = await rpc.traceBlockTransactions("");
        expect(block).toHaveProperty("result");
      });
    });
  });
});
