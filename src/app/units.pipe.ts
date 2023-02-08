import { Pipe, PipeTransform } from '@angular/core'
import { BigNumberish } from 'ethers'
import { formatUnits } from 'ethers/lib/utils'

@Pipe({
  name: 'units',
})
export class UnitsPipe implements PipeTransform {
  transform(
    value: BigNumberish,
    unitName: string | BigNumberish = 'ether'
  ): string {
    return formatUnits(value, unitName)
  }
}
