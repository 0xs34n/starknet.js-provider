import RPCProvider from "./RPC";
const RPC_URL = "http://localhost:9545";

const rpc = new RPCProvider(RPC_URL);

async function main() {
  const block = await rpc.getBlockWithTxHashes({
    block_id: { block_number: 10 },
  });
  console.log(block);
}

main();
