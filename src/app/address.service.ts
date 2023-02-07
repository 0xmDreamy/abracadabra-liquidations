import { Injectable } from '@angular/core';
import { providers } from 'ethers'
import { getAddress, isAddress } from 'ethers/lib/utils';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private provider: providers.BaseProvider) { }

  async getAddress(addressOrEns: string): Promise<string | null> {
    if (isAddress(addressOrEns)) {
      return getAddress(addressOrEns)
    } else {
      return this.provider.resolveName(addressOrEns)
    }
  }
}
