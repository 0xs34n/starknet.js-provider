import FeederGatewayProvider from "../index";

const feederGateway = new FeederGatewayProvider("TEST_NET");

describe("Feeder Gateway Provider", () => {
  test("getContractAddresses()", async () => {
    const response = await feederGateway.getContractAddresses();

    expect(response).toEqual(expect.anything());
  });
});
