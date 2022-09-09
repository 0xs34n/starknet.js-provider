import FeederGatewayProvider from "../index";

const feederGateway = new FeederGatewayProvider("TEST_NET");
import {
  blockHash,
  blockId,
  blockNumber,
  contractAddress,
  key,
  transactionHash,
  transactionId,
} from "./fixtures";

describe("Feeder Gateway Provider", () => {
  test("getContractAddresses()", async () => {
    const response = await feederGateway.getContractAddresses();

    expect(response).toEqual(expect.anything());
  });

  test("getBlock()", async () => {
    const response = await feederGateway.getBlock(blockHash);

    expect(response).toEqual(expect.anything());
  });

  test("getBlockHashById()", async () => {
    const response = await feederGateway.getBlockHashById(blockId);

    expect(response).toEqual(expect.anything());
  });

  test("getBlockIdByHash()", async () => {
    const response = await feederGateway.getBlockIdByHash(blockHash);

    expect(response).toEqual(expect.anything());
  });

  test("getTransactionHashById()", async () => {
    const response = await feederGateway.getTransactionHashById(transactionId);

    expect(response).toEqual(expect.anything());
  });

  test("getTransactionIdByHash()", async () => {
    const response = await feederGateway.getTransactionIdByHash(
      transactionHash
    );

    expect(response).toEqual(expect.anything());
  });

  test("getStorageAt()", async () => {
    const response = await feederGateway.getStorageAt({
      ...contractAddress,
      ...key,
      ...blockNumber,
    });

    expect(response).toEqual(expect.anything());
  });

  test("getTransactionStatus()", async () => {
    const response = await feederGateway.getTransactionStatus(transactionHash);

    expect(response).toEqual(expect.anything());
  });

  test("getTransaction()", async () => {
    const response = await feederGateway.getTransaction(transactionHash);

    expect(response).toEqual(expect.anything());
  });

  test("getTransactionReceipt()", async () => {
    const response = await feederGateway.getTransactionReceipt(transactionHash);

    expect(response).toEqual(expect.anything());
  });

  test("getTransactionTrace()", async () => {
    const response = await feederGateway.getTransactionTrace(transactionHash);

    expect(response).toEqual(expect.anything());
  });

  test("getFullContract()", async () => {
    const response = await feederGateway.getFullContract(contractAddress);

    expect(response).toEqual(expect.anything());
  });

  test("getStateUpdate()", async () => {
    const response = await feederGateway.getStateUpdate(blockNumber);

    expect(response).toEqual(expect.anything());
  });
});
