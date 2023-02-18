import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { mergeMap, of, Subject, Subscription } from 'rxjs'
import { AddressService } from '../address.service'
import { Liquidation, LiquidationsService } from '../liquidations.service'

@Component({
  selector: 'app-liquidations',
  templateUrl: './liquidations.component.html',
  styleUrls: ['./liquidations.component.css'],
})
export class LiquidationsComponent implements OnInit, OnDestroy {
  liquidations: Liquidation[] | null = null
  private liquidationsSubscription: Subscription | null = null

  currentAddress: string = ''

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private liquidationService: LiquidationsService
  ) {}

  ngOnInit(): void {
    this.liquidationsSubscription = this.route.paramMap
      .pipe(
        mergeMap((params) => {
          const address = params.get('address')
          if (address != null) {
            this.currentAddress = address
            return this.liquidationService.getLiquidations(address)
          } else {
            return of(null)
          }
        })
      )
      .subscribe((liquidations) => {
        this.liquidations = liquidations
      })
  }

  ngOnDestroy(): void {
    this.liquidationsSubscription?.unsubscribe()
  }
  onNewAddress(address: string | null): void {
    if (address != null) {
      this.router.navigate(['/liquidations', address])
    }
  }
}
