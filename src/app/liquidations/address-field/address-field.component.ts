import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  Output,
} from '@angular/core'
import { from, Subscription } from 'rxjs'
import { AddressService } from 'src/app/address.service'

@Component({
  selector: 'app-address-field',
  templateUrl: './address-field.component.html',
  styleUrls: ['./address-field.component.css'],
})
export class AddressFieldComponent implements OnDestroy {
  @Output() address = new EventEmitter<string | null>()
  @Input() addressOrEns: string = ''

  isLoading: boolean = false
  private addressServiceSubscription: Subscription | null = null

  constructor(private addressService: AddressService) {}

  onSubmit(): void {
    this.addressServiceSubscription?.unsubscribe()
    this.isLoading = true
    from(this.addressService.getAddress(this.addressOrEns)).subscribe(
      (address) => {
        this.isLoading = false
        this.address.emit(address)
      }
    )
  }

  ngOnDestroy(): void {
    this.addressServiceSubscription?.unsubscribe()
  }
}
