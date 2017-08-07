// Example response {"base":"USD","date":"2017-07-28","rates":{"GBP":0.76365}}
// Date ignored

export interface FxResponse {
  base: string;
  rates: {
    [key: string]: number;
  }
}

export const findRate = (symbol: string, response: FxResponse): number => {
  if (response && response.rates) {
    return response.rates[symbol];
  }
  return 0;
}