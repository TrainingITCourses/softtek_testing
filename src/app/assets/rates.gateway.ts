import { Rate } from "./rate.type.ts";

export interface GetSymbolRate {
  get(symbol: string): Rate;
}

export class RatesGateway implements GetSymbolRate {
  public get(symbol: string): Rate {
    const date = new Date();
    const price = Number.parseFloat((Math.random() * 499 + 1).toFixed(2));
    return { symbol, date, price, name: symbol };
  }
}
