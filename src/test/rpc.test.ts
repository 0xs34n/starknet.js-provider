import RPCProvider from "../RPC";
const RPC_URL = "http://localhost:9545";

const rpc = new RPCProvider(RPC_URL);

describe("getBlockWithTxHashes()", () => {
  test("getBlockWithTxHashes() with block_number", async () => {
    const block = await rpc.getBlockWithTxHashes(10);

    // TODO for jung: I think the best way to test is if the response status is 200
    // but since we are getting the json, not sure what's best way
    expect(block).toHaveProperty("jsonrpc");
  });
});
