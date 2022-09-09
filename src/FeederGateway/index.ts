import { gatewayCheck, getFeederGatewayUrl, handleResponse } from "./utils";
import {
  Network,
  BlockHash,
  BlockId,
  TransactionId,
  TransactionHash,
  ContractAddress,
  Key,
  BlockNumber,
} from "./types";

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
      url.searchParams.append(key, params[key]);
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

  async getBlock(params: BlockHash) {
    return await this.fetchGetEndpoint("get_block", params);
  }

  getBlockTraces() {}

  async getStateUpdate(params: BlockNumber) {
    return await this.fetchGetEndpoint("get_state_update", params);
  }

  async getCode(params: ContractAddress) {
    return await this.fetchGetEndpoint("get_code", params);
  }

  async getFullContract(params: ContractAddress) {
    return await this.fetchGetEndpoint("get_full_contract", params);
  }

  getClassHashAt() {}

  getClassByHash() {}

  async getStorageAt(params: ContractAddress & Key & BlockNumber) {
    return await this.fetchGetEndpoint("get_storage_at", params);
  }

  async getTransactionStatus(params: TransactionHash) {
    return await this.fetchGetEndpoint("get_transaction_status", params);
  }

  async getTransaction(params: TransactionHash) {
    return await this.fetchGetEndpoint("get_transaction", params);
  }

  async getTransactionReceipt(params: TransactionHash) {
    return await this.fetchGetEndpoint("get_transaction_receipt", params);
  }

  async getTransactionTrace(params: TransactionHash) {
    return await this.fetchGetEndpoint("get_transaction_trace", params);
  }

  async getBlockHashById(params: BlockId) {
    return await this.fetchGetEndpoint("get_block_hash_by_id", params);
  }

  async getBlockIdByHash(params: BlockHash) {
    return await this.fetchGetEndpoint("get_block_id_by_hash", params);
  }

  async getTransactionHashById(params: TransactionId) {
    return await this.fetchGetEndpoint("get_transaction_hash_by_id", params);
  }

  async getTransactionIdByHash(params: TransactionHash) {
    return await this.fetchGetEndpoint("get_transaction_id_by_hash", params);
  }
}

export default FeederGatewayProvider;
