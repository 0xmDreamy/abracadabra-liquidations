import { LiquidationsDocument, LiquidationsQuery } from '.graphclient'
import { Injectable } from '@angular/core'
import { ApolloQueryResult } from '@apollo/client/core/types'
import { Apollo } from 'apollo-angular'
import { BigNumber } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'
import { combineLatest, map, Observable } from 'rxjs'
import { APOLLO_SUBGRAPH_NAMES } from './graphql.module'

export interface Liquidation {
  chain: string
  txHash: string
  timestampMillies: number
  liquidationPrice: number
  oraclePrice: number
  collateralAmount: BigNumber
  mimRepaid: number
  borrowedAsset: Asset
  collateralAsset: Asset
}

export interface Asset {
  contractAddress: string
  name: string
  symbol: string
  decimals: number
}

@Injectable({
  providedIn: 'root',
})
export class LiquidationsService {
  constructor(private apollo: Apollo) {}

  getLiquidations(address: string): Observable<Liquidation[]> {
    let liquidationsObsevables: Record<
      string,
      Observable<ApolloQueryResult<LiquidationsQuery>>
    > = {}
    for (const chain in APOLLO_SUBGRAPH_NAMES) {
      const subgraphName = APOLLO_SUBGRAPH_NAMES[chain]

      liquidationsObsevables[chain] = this.apollo.use(subgraphName).query({
        query: LiquidationsDocument,
        variables: {
          liquidatee: address.toLowerCase(),
        },
      })
    }
    const combinedLiquidationObservables = combineLatest(liquidationsObsevables)

    return combinedLiquidationObservables.pipe(
      map((results) => {
        return Object.entries(results)
          .flatMap(([chain, liquidations]) => {
            return liquidations.data.liquidates.map(
              (liquidation): Liquidation => {
                const mimRepaid = liquidation.amountUSD - liquidation.profitUSD
                const collateralAmount = BigNumber.from(liquidation.amount)
                const collateralAmountFormatted = formatUnits(
                  collateralAmount,
                  liquidation.market.inputToken.decimals
                )
                const liquidationPrice = mimRepaid / +collateralAmountFormatted
                const oraclePrice = liquidation.amountUSD / +collateralAmountFormatted
                return {
                  chain: chain,
                  txHash: liquidation.hash,
                  timestampMillies: liquidation.timestamp * 1000,
                  liquidationPrice: liquidationPrice,
                  oraclePrice,
                  collateralAmount,
                  mimRepaid,
                  borrowedAsset: {
                    contractAddress: liquidation.asset.id,
                    name: liquidation.asset.name,
                    symbol: liquidation.asset.symbol,
                    decimals: liquidation.asset.decimals,
                  },
                  collateralAsset: {
                    contractAddress: liquidation.market.inputToken.id,
                    name: liquidation.market.inputToken.name,
                    symbol: liquidation.market.inputToken.symbol,
                    decimals: liquidation.market.inputToken.decimals,
                  },
                }
              }
            )
          })
          .sort((a, b) => b.timestampMillies - a.timestampMillies)
      })
    )
  }
}
