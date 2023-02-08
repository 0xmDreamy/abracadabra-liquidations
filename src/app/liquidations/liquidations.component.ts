import { Component, OnDestroy, OnInit } from '@angular/core'
import { ActivatedRoute, Router } from '@angular/router'
import { mergeMap, Subscription } from 'rxjs'
import { Liquidation, LiquidationsService } from '../liquidations.service'

@Component({
  selector: 'app-liquidations',
  templateUrl: './liquidations.component.html',
  styleUrls: ['./liquidations.component.css'],
})
export class LiquidationsComponent implements OnInit, OnDestroy {
  liquidations: Liquidation[] = []
  private liquidationsSubscription: Subscription | null = null

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private liquidationService: LiquidationsService
  ) {}

  ngOnInit(): void {
    this.liquidationsSubscription = this.route.paramMap
      .pipe(
        mergeMap((params) =>
          this.liquidationService.getLiquidations(params.get('address')!)
        )
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
