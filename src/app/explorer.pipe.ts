import { Pipe, PipeTransform } from '@angular/core';

export const BLOCKCHAIN_EXPLORERS: Record<string, string> = {
  Ethereum: "https://etherscan.io/tx/",
  Avalanche: "https://showtrace.io/tx/",
  Arbitrum: "https://arbiscan.io/tx/",
  Fantom: "https://ftmscan.com/tx/",
  Binance: "https://bscscan.com/tx/"
}

@Pipe({
  name: 'explorer'
})
export class ExplorerPipe implements PipeTransform {

  

  transform(value: string, chain: string): string {
    return `${BLOCKCHAIN_EXPLORERS[chain]}${value}`;
  }

}
