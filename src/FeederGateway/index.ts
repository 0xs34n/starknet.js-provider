import { checkGateway, getFeederGatewayUrl, handleResponse } from "./utils";
import { Network } from "./types";

class FeederGatewayProvider {
  url: URL;

  constructor(network: Network) {
    this.url = new URL(getFeederGatewayUrl(network));
  }

  async fetchPostEndpoint(endpoint: string, body: Object) {
    const gateway = gatewayCheck(endpoint);

    const response = await fetch(`${this.url}${gateway}/${endpoint}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(body),
    });

    return await response.json();
  }

  async fetchGetEndpoint(endpoint: string, params?: any) {
    const url = new URL(`${this.url}feeder_gateway/${endpoint}`);

    for (const key in params) {
      url.searchParams.append(key, params.key);
    }

    try {
      const response = await fetch(url.href);
      return handleResponse(response);
    } catch (err) {
      throw err;
    }
  }

  async getContractAddresses() {
    return await this.fetchGetEndpoint("get_contract_addresses");
  }

  callContract() {}

  estimateFee() {}

  getBlock() {}

  getBlockTraces() {}

  getStateUpdate() {}

  getCode() {}

  getFullContract() {}

  getClassHashAt() {}

  getClassByHash() {}

  getStorageAt() {}

  getTransactionStatus() {}

  getTransaction() {}

  getTransactionReceipt() {}

  getTransactionTrace() {}

  getBlockHashById() {}

  getBlockIdByHash() {}

  getTransactionHashById() {}

  getTransactionIdByHash() {}
}

export default FeederGatewayProvider;
