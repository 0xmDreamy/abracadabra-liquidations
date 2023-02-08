import { Component, EventEmitter, OnDestroy, Output } from '@angular/core'
import { from, Subscription } from 'rxjs'
import { AddressService } from 'src/app/address.service'

@Component({
  selector: 'app-address-field',
  templateUrl: './address-field.component.html',
  styleUrls: ['./address-field.component.css'],
})
export class AddressFieldComponent implements OnDestroy {
  @Output() address = new EventEmitter<string | null>()

  private addressServiceSubscription: Subscription | null = null

  constructor(private addressService: AddressService) {}

  onSubmit(addressOrEns: string): void {
    this.addressServiceSubscription?.unsubscribe()
    from(this.addressService.getAddress(addressOrEns)).subscribe((address) => {
      this.address.emit(address)
    })
  }

  ngOnDestroy(): void {
    this.addressServiceSubscription?.unsubscribe()
  }
}
