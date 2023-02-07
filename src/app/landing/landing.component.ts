import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent {
  constructor(private router: Router) { }

  onNewAddress(address: string | null): void {
    if (address != null) {
      this.router.navigate(['/liquidations', address])
    }
  }
}
