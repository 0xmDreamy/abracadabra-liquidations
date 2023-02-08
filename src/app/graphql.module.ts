import { NgModule } from '@angular/core'
import {
  ApolloModule,
  APOLLO_NAMED_OPTIONS,
  NamedOptions,
} from 'apollo-angular'
import { InMemoryCache } from '@apollo/client/core'
import { HttpLink } from 'apollo-angular/http'

export const APOLLO_SUBGRAPH_NAMES: Record<string, string> = {
  Ethereum: 'messariEthereum',
  Avalanche: 'messariAvalanche',
  Arbitrum: 'messariArbitrum',
  Fantom: 'messariFantom',
  Binance: 'messariBsc',
}

export function createApollo(httpLink: HttpLink): NamedOptions {
  return {
    messariEthereum: {
      cache: new InMemoryCache(),
      link: httpLink.create({
        uri: 'https://api.thegraph.com/subgraphs/name/messari/abracadabra-money-ethereum',
      }),
    },
    messariAvalanche: {
      cache: new InMemoryCache(),
      link: httpLink.create({
        uri: 'https://api.thegraph.com/subgraphs/name/messari/abracadabra-money-avalanche',
      }),
    },
    messariArbitrum: {
      cache: new InMemoryCache(),
      link: httpLink.create({
        uri: 'https://api.thegraph.com/subgraphs/name/messari/abracadabra-money-arbitrum',
      }),
    },
    messariFantom: {
      cache: new InMemoryCache(),
      link: httpLink.create({
        uri: 'https://api.thegraph.com/subgraphs/name/messari/abracadabra-money-fantom',
      }),
    },
    messariBsc: {
      cache: new InMemoryCache(),
      link: httpLink.create({
        uri: 'https://api.thegraph.com/subgraphs/name/messari/abracadabra-money-bsc',
      }),
    },
  }
}

@NgModule({
  exports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_NAMED_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
