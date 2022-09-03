import RPCProvider from "../RPC";
const RPC_URL = "http://localhost:9545";

const rpc = new RPCProvider(RPC_URL);

const TEST_CONTRACT_ADDR = "0x03CA81a47bf5E646b45382b7FF397fc5A2CbCb193341019bbc75f6C0Fa58de64";
const TEST_BLOCK_HASH = "0x1554f5ffdb2b911524293b626e5d34cc3b92cbea5f3206294645d6d8338351b";
const TEST_KEY = "0x0";
const EXPECTED_RESULT = { jsonrpc: '2.0', result: '0x0', id: '0' };

describe("getStorageAt", function() {

  const validGetStorageAtCases = [
    {
      contractAddress: TEST_CONTRACT_ADDR,
      key: TEST_KEY,
      blockId: {block_id: {block_number: 49}},
      expected: EXPECTED_RESULT
    }, {
      contractAddress: TEST_CONTRACT_ADDR,
      key: TEST_KEY,
      blockId: {block_id: {block_hash: TEST_BLOCK_HASH}},
      expected: EXPECTED_RESULT
    },{
      contractAddress: TEST_CONTRACT_ADDR,
      key: TEST_KEY,
      blockId: {block_id: "latest"},
      expected: EXPECTED_RESULT
    }
  ];

  test.each(validGetStorageAtCases)("should getStorageAt", async function({ contractAddress, key, blockId, expected }) {
    expect(await rpc.getStorageAt(contractAddress, key, blockId)).toEqual(expected);
  })

  const invalidGetStorageAtCases = [
    {
      contractAddress: "",
      key: TEST_KEY,
      blockId: {block_id: {block_number: 49}},
      expectedError: {
        jsonrpc: '2.0',
        error: {
          code: 20,
          message: "Contract not found",
        },
        id: '0'
      }
    },
    {
      contractAddress: TEST_CONTRACT_ADDR,
      key: TEST_KEY,
      blockId: {block_id: "pending"},
      expectedError: {
        jsonrpc: '2.0',
        error: {
          code: -32000,
          message: "Pending data not supported in this configuration",
        },
        id: '0'
      }
    }, {
      contractAddress: TEST_CONTRACT_ADDR,
      key: "invalid_key",
      blockId: {block_id: {block_number: 49}},
      expectedError: {
        jsonrpc: '2.0',
        error: {
          code: -32602,
          message: 'Invalid nibble found: 0x69 at line 1 column 108'
        },
        id: '0'
      }
    }, {
      contractAddress: TEST_CONTRACT_ADDR,
      key: TEST_KEY,
      blockId: {block_id: {block_number: 0}},
      expectedError: {
        jsonrpc: '2.0',
        error: {
          code: 20,
          message: 'Contract not found'
        },
        id: '0'
      }
    },
  ];

  test.each(invalidGetStorageAtCases)("should not getStorageAt", async function({ contractAddress, key, blockId, expectedError }) {
    expect(await rpc.getStorageAt(contractAddress, key, blockId)).toEqual(expectedError);
  })
})
