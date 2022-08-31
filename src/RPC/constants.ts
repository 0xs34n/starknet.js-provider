import { JSONRPCBody } from "./types";

export const JSON_RPC_BODY_COMMON: Pick<JSONRPCBody, "jsonrpc" | "id"> = {
  jsonrpc: "2.0",
  id: "0",
};
