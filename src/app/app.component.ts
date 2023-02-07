import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Liquidation, LiquidationsService } from './liquidations.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  liquidations: Liquidation[] | null = null
  liquidationsSubscription: Subscription | null = null

  constructor(private liquidationService: LiquidationsService) {}

  onNewAddress(address: string | null): void {
    this.liquidationsSubscription?.unsubscribe()
    if (address != null) {
      this.liquidationService.getLiquidations(address).subscribe((liquidations) => {
        this.liquidations = liquidations
      })
    } else {
      this.liquidations = null
    }
  }

  ngOnDestroy(): void {
    this.liquidationsSubscription?.unsubscribe()
  }
}
