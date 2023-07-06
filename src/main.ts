import 'zone.js/dist/zone';
import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { bootstrapApplication } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'my-app',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>Shopping cart</h1>
    <select
    [ngModel]="quantity()"
    (change)="onQuantitySelected($any($event-target).value)">
      <option disabled value=""> ----  select a quantity ---- </option>
      <option *ngFor="let q of qtyAvailable()"> {{ q }} </option>
    </select>
  `,
})
export class App {
  name = 'Angular';

  quantity = signal(1);

  qtyAvailable = signal([1, 2, 3, 4, 5, 6]);

  onQuantitySelected(qty: number){
    this.quantity.set(qty);
  }
}

bootstrapApplication(App);
