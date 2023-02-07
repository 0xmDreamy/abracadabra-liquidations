import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { getDefaultProvider, providers } from 'ethers';
import { FormsModule } from '@angular/forms';
import { UnitsPipe } from './units.pipe';
import { ExplorerPipe } from './explorer.pipe';
import { AppComponent } from './app.component';
import { AddressFieldComponent } from './shared/address-field/address-field.component';
import { LiquidationsTableComponent } from './liquidations/liquidations-table/liquidations-table.component';
import { LiquidationRowComponent } from './liquidations/liquidations-table/liquidation-row/liquidation-row.component';
import { LandingComponent } from './landing/landing.component';
import { LiquidationsComponent } from './liquidations/liquidations.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressFieldComponent,
    LiquidationsTableComponent,
    LiquidationRowComponent,
    LandingComponent,
    LiquidationsComponent,
    UnitsPipe,
    ExplorerPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule
  ],
  providers: [{
    provide: providers.BaseProvider,
    useFactory: () => getDefaultProvider('mainnet')
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
