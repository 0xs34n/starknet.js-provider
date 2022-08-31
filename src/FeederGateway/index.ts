import { getFeederGatewayUrl } from "./utils";
import { network } from "./types";

class FeederGateway {
  url: URL;

  constructor(network: network) {
    this.url = new URL(getFeederGatewayUrl(network));
  }

  getContractAddresses() {}

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
