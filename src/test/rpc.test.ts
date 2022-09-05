import RPCProvider from "../RPC";

import {
  block_number,
  block_hash,
  block_tag_latest,
  block_tag_pending,
  class_hash,
  contract_address,
  filter,
  index,
  key,
  request,
  transaction_hash,
} from "./fixtures";

const RPC_URL = process.env.RPC_URL || "http://localhost:9545";

const rpc = new RPCProvider(RPC_URL);

describe("JSON-RPC Provider", () => {
  describe("methods", () => {
    const blockIds = [
      block_number,
      block_hash,
      block_tag_latest,
      block_tag_pending,
    ];

    describe("getBlockWithTxHashes()", () => {
      test.each(blockIds)("block_id: %p", async (block_id) => {
        const response = await rpc.getBlockWithTxHashes({ block_id });
        expect(response).toHaveProperty("result");
      });
    });

    describe("getBlockWithTxs()", () => {
      test.each(blockIds)("block_id: %p", async (block_id) => {
        const response = await rpc.getBlockWithTxs({ block_id });
        expect(response).toHaveProperty("result");
      });
    });

    describe("getStateUpdate()", () => {
      test.todo("block_id: pending");
      // removed pending from blockIds because pathfinder fails on pending
      test.each(blockIds.slice(0, -1))("block_id: %p", async (block_id) => {
        const response = await rpc.getStateUpdate({ block_id });
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

      test.each(blockIds)("block_id: %p", async (block_id) => {
        const response = await rpc.getStorageAt({
          contract_address,
          key,
          block_id,
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
      test.each(blockIds)("block_id: %p", async (block_id) => {
        const response = await rpc.getTransactionByBlockIdAndIndex({
          index,
          block_id,
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
        expect(await rpc.getClass({ class_hash })).toHaveProperty("result");
      });
    });

    describe("getClassHashAt()", () => {
      test("block_id default pending", async () => {
        const response = await rpc.getClassHashAt({
          contract_address,
        });
        expect(response).toHaveProperty("result");
      });

      test.each(blockIds)("block_id: %p", async (block_id) => {
        const response = await rpc.getClassHashAt({
          contract_address,
          block_id,
        });
        expect(response).toHaveProperty("result");
      });
    });

    describe("getClassAt()", () => {
      test("block_id default pending", async () => {
        const response = await rpc.getClassAt({
          contract_address,
        });
        expect(response).toHaveProperty("result");
      });

      test.each(blockIds)("block_id: %p", async (block_id) => {
        const response = await rpc.getClassAt({
          contract_address,
          block_id,
        });
        expect(response).toHaveProperty("result");
      });
    });

    describe("getBlockTransactionCount()", () => {
      test.each(blockIds)("block_id: %p", async (block_id) => {
        const response = await rpc.getBlockTransactionCount({
          block_id,
        });
        expect(response).toHaveProperty("result");
      });
    });

    describe("starknetCall()", () => {
      test("block_id default pending", async () => {
        const response = await rpc.starknetCall({
          request,
        });
        expect(response).toHaveProperty("result");
      });

      test.each(blockIds)("block_id: %p", async (block_id) => {
        const response = await rpc.starknetCall({
          request,
          block_id,
        });
        expect(response).toHaveProperty("result");
      });
    });

    describe("estimateFee()", () => {
      test("block_id default pending", async () => {
        const response = await rpc.estimateFee({
          request,
        });
        expect(response).toHaveProperty("result");
      });

      test.each(blockIds)("block_id: %p", async (block_id) => {
        const response = await rpc.estimateFee({
          request,
          block_id,
        });
        expect(response).toHaveProperty("result");
      });
    });

    test("blockNumber()", async () => {
      const response = await rpc.blockNumber();
      expect(response).toHaveProperty("result");
    });

    test("blockHashAndNumber()", async () => {
      const response = await rpc.blockHashAndNumber();
      expect(response).toHaveProperty("result");
    });

    test("chainId()", async () => {
      const response = await rpc.chainId();
      expect(response).toHaveProperty("result");
    });

    test("pendingTransactions()", async () => {
      const response = await rpc.pendingTransactions();
      expect(response).toHaveProperty("result");
    });

    test.failing("protocolVersion()", async () => {
      const response = await rpc.protocolVersion();
      expect(response).toHaveProperty("result");
    });

    test("syncing()", async () => {
      const response = await rpc.syncing();
      expect(response).toHaveProperty("result");
    });

    describe("getEvents()", () => {
      test.each(blockIds)("block_id: %p", async (block_id) => {
        const response = await rpc.getEvents(filter(block_id));
        expect(response).toHaveProperty("result");
      });
    });

    test("getNonce()", async () => {
      const response = await rpc.getNonce({ contract_address });
      expect(response).toHaveProperty("result");
    });

    test.todo("addInvokeTransaction()");

    test.todo("addDeclareTransaction()");

    // not be implemented in pathfinder - skip
    describe.skip("traceTransaction() - not implemented in pathfinder", () => {
      test(`tx hash = ${transaction_hash}`, async () => {});
    });

    describe.skip("traceBlockTransactions() - not implemented in pathfinder", () => {
      test(``, async () => {});
    });
  });
});
