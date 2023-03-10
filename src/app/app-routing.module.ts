import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { LiquidationsComponent } from './liquidations/liquidations.component'

const routes: Routes = [
  {
    path: 'liquidations/:address',
    component: LiquidationsComponent,
  },
  {
    path: '',
    component: LiquidationsComponent,
  },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
