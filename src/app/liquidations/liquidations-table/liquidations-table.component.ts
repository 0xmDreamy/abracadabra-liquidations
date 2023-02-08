import { Component, Input } from '@angular/core'
import { Liquidation } from 'src/app/liquidations.service'

@Component({
  selector: 'app-liquidations-table',
  templateUrl: './liquidations-table.component.html',
  styleUrls: ['./liquidations-table.component.css'],
})
export class LiquidationsTableComponent {
  @Input() liquidations: Liquidation[] = []
}
