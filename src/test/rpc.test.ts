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
  index,
  class_hash,
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
        const response = await rpc.getBlockWithTxHashes({ block_id: blockId });
        expect(response).toHaveProperty("result");
      });
    });

    describe("getBlockWithTxs()", () => {
      test.each(blockIds)("blockId: %p", async (blockId) => {
        const response = await rpc.getBlockWithTxs({ block_id: blockId });
        expect(response).toHaveProperty("result");
      });
    });

    describe("getStatusUpdate()", () => {
      test.each(blockIds)("blockId: %p", async (blockId) => {
        const response = await rpc.getStateUpdate({ block_id: blockId });
        expect(response).toHaveProperty("result");
      });
    });

    describe("getStorageAt()", () => {
      test("block_id default pending", async () => {
        const response = await rpc.getStorageAt({
          contract_address,
          key,
        });
        expect(response).toHaveProperty("result");
      });

      test.each(blockIds)("blockId: %p", async (blockId) => {
        const response = await rpc.getStorageAt({
          contract_address,
          key,
          block_id: blockId,
        });
        expect(response).toHaveProperty("result");
      });
    });

    describe("getTransactionByHash()", () => {
      test(`transaction_hash = ${transaction_hash}`, async () => {
        const response = await rpc.getTransactionByHash({
          transaction_hash,
        });
        expect(response).toHaveProperty("result");
      });
    });

    describe("getTransactionByBlockIdAndIndex()", () => {
      test.each(blockIds)("blockId: %p", async (blockId) => {
        const response = await rpc.getTransactionByBlockIdAndIndex({
          index,
          block_id: blockId,
        });
        expect(response).toHaveProperty("result");
      });
    });

    describe("getTransactionReceipt()", () => {
      test(`transaction_hash = ${transaction_hash}`, async () => {
        const response = await rpc.getTransactionReceipt({
          transaction_hash,
        });
        expect(response).toHaveProperty("result");
      });
    });

    describe("getClass()", () => {
      test(`contract_address = ${contract_address}`, async () => {
        const response = await rpc.getClass({ class_hash });
        expect(response).toHaveProperty("result");
      });
    });

    // not be implemented in pathfinder - skip
    describe.skip("traceTransaction()", () => {
      test(`tx hash = ${transaction_hash}`, async () => {
        const response = await rpc.traceTransaction({
          transaction_hash: transaction_hash,
        });
        expect(response).toHaveProperty("result");
      });
    });

    // not implemented in pathfinder - skip
    describe.skip("traceBlockTransactions()", () => {
      test(``, async () => {
        const response = await rpc.traceBlockTransactions("");
        expect(response).toHaveProperty("result");
      });
    });
  });
});
