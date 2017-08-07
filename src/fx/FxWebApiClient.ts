import { makeRequest } from "../net/WebApiClient";

const url = "http://api.fixer.io/latest?";

export const fxQuery = <FxResponse>(base: string, target: string): Promise<FxResponse> => {  
  const method = "get";
  const params = {
    base,
    symbols: target,
  };
  return makeRequest<FxResponse>({url, method, params});
};
