import RPCProvider from "../RPC";
const RPC_URL = "http://localhost:9545";

const rpc = new RPCProvider(RPC_URL);

describe("getBlockWithTxHashes", () => {
  test("getBlockWithTxHashes with block_number", async () => {
    const response = await rpc.getBlockWithTxHashes({
      block_id: { block_number: 10 },
    });

    // TODO for jung: I think the best way to test is if the response status is 200
    // but since we are getting the json, not sure what's best way

    // Sean: we can validate the field exists
    expect(response).toHaveProperty("jsonrpc");
    expect(response).toHaveProperty("result");
    expect(response).toHaveProperty("id");
  });
});

// Sean: I'd test different cases like below
describe("getStorageAt", () => {
  const TEST_CONTRACT_ADDR =
    "0x03CA81a47bf5E646b45382b7FF397fc5A2CbCb193341019bbc75f6C0Fa58de64";
  const TEST_BLOCK_HASH =
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

  test.each(validGetStorageAtCases)(
    "should getStorageAt",
    async function ({ contractAddress, key, blockId }) {
      const response = await rpc.getStorageAt(contractAddress, key, blockId);

      // console.log(response.result);

      expect(response).toHaveProperty("jsonrpc");
      expect(response).toHaveProperty("result");
      expect(response).toHaveProperty("id");
    }
  );

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
      const response = await rpc.getStorageAt(contractAddress, key, blockId);

      // console.log(response.error);

      expect(response).toHaveProperty("jsonrpc");
      expect(response).toHaveProperty("error");
      expect(response).toHaveProperty("id");

      // not required, this is just to see how descriptive error messages are
      expect(response.error.message).toContain(expectedError);
    }
  );
});
