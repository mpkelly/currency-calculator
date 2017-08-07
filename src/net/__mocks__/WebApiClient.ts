declare var module: any;

import { RequestOptions } from "../WebApiClient";

const api = jest.genMockFromModule('../WebApiClient.ts') as any;

const rates = {
  "USDGBP": 1.32,
  "GBPUSD": .76,
  "USDEUR": 1.18,
  "EURUSD": .85,
} as any;

api.makeRequest = <T>(opts: RequestOptions): Promise<T> => {
  const base = opts.params.base;
  const target = opts.params.symbols;
  const rate = rates[base+target];

  return new Promise<T>(
    (resolve, reject) => {
     setImmediate(
      ()=> {
        if (rate) {
          const result = JSON.parse(`{"base":"${base}","date":"2017-07-28","rates":{"${target}":${rate}}}`);         
          resolve(result);
         } else {
          reject(`no rate found for ${base} and target ${target}`)
         }          
      }
     )         
    }
  );
}      

module.exports = api;