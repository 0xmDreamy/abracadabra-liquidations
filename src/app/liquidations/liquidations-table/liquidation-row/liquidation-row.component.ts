import { Component, Input } from '@angular/core';
import { Liquidation } from 'src/app/liquidations.service';

@Component({
  selector: 'tr[app-liquidation-row]',
  templateUrl: './liquidation-row.component.html',
  styleUrls: ['./liquidation-row.component.css']
})
export class LiquidationRowComponent {
  @Input() liquidation: Liquidation | undefined
}
