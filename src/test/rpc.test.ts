import RPCProvider from "../RPC";
const RPC_URL = "http://localhost:9545";

const rpc = new RPCProvider(RPC_URL);

describe("JSON RPC Provider", () => {
  describe("methods", () => {
    describe("getBlockWithTxHashes()", () => {
      test("param block_id is block_number", async () => {
        const response = await rpc.getBlockWithTxHashes({
          block_id: { block_number: 10 },
        });

        expect(response).toHaveProperty("result");
      });

      test.skip("param block_id is block_hash", async () => {
        // TODO - need to do after we validate block_hash with regex typing
      });

      test.skip("param block_id wis block_tag=pending", async () => {
        // TODO - need to enable pending block in pathfinder
        const response = await rpc.getBlockWithTxHashes({
          block_id: "pending",
        });

        expect(response).toHaveProperty("result");
      });

      test("param block_id is block_tag=latest", async () => {
        const response = await rpc.getBlockWithTxHashes({
          block_id: "latest",
        });

        expect(response).toHaveProperty("result");
      });
    });

    // add brackets after getStorageAt to indicate that it is a method
    describe("getStorageAt()", () => {
      const TEST_CONTRACT_ADDR =
        // You should type this before testing. Add regex testing. Or else not helpful
        "0x03CA81a47bf5E646b45382b7FF397fc5A2CbCb193341019bbc75f6C0Fa58de64";
      const TEST_BLOCK_HASH =
        // You should type this before testing. Add regex testing. Or else not helpful
        "0x1554f5ffdb2b911524293b626e5d34cc3b92cbea5f3206294645d6d8338351b";
      const TEST_KEY = "0x999";

      const validGetStorageAtCases = [
        {
          contractAddress: TEST_CONTRACT_ADDR,
          key: TEST_KEY,
          blockId: { block_id: { block_number: 49 } },
        },
        {
          contractAddress: TEST_CONTRACT_ADDR,
          key: TEST_KEY,
          blockId: { block_id: { block_hash: TEST_BLOCK_HASH } },
        },
        {
          contractAddress: TEST_CONTRACT_ADDR,
          key: TEST_KEY,
          blockId: { block_id: "latest" },
        },
      ];

      // I would put each of these in its own test() block for clarity + simplicity.
      // I don't understand this. "should getStorageAt" doesn't tell me anything about what you're testing.
      // REMEMBER - you are writing code for OTHER developers to read. You are not writing code for yourself.
      test.each(validGetStorageAtCases)(
        "should getStorageAt",
        async function ({ contractAddress, key, blockId }) {
          const response = await rpc.getStorageAt(
            contractAddress,
            key,
            blockId
          );

          // console.log(response.result);

          expect(response).toHaveProperty("result");
        }
      );

      // IMO we don't need to test any of these. This is pathfinder's job to throw error.
      // Not our job to test it.
      const invalidGetStorageAtCases = [
        {
          contractAddress: "",
          key: TEST_KEY,
          blockId: { block_id: { block_number: 49 } },
          expectedError: "Contract not found",
        },
        {
          contractAddress: TEST_CONTRACT_ADDR,
          key: TEST_KEY,
          blockId: { block_id: "pending" },
          expectedError: "Pending data not supported in this configuration",
        },
        {
          contractAddress: TEST_CONTRACT_ADDR,
          key: "invalid_key",
          blockId: { block_id: { block_number: 49 } },
          expectedError: "Invalid nibble found",
        },
        {
          contractAddress: TEST_CONTRACT_ADDR,
          key: TEST_KEY,
          blockId: { block_id: { block_number: 0 } },
          expectedError: "Contract not found",
        },
      ];

      test.each(invalidGetStorageAtCases)(
        "should not getStorageAt",
        async function ({ contractAddress, key, blockId, expectedError }) {
          const response = await rpc.getStorageAt(
            contractAddress,
            key,
            blockId
          );

          // console.log(response.error);

          expect(response).toHaveProperty("jsonrpc");
          expect(response).toHaveProperty("error");
          expect(response).toHaveProperty("id");

          // not required, this is just to see how descriptive error messages are
          expect(response.error.message).toContain(expectedError);
        }
      );
    });
  });
});
