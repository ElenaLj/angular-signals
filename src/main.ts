import 'zone.js/dist/zone';
import { Component, computed, effect, signal } from '@angular/core';
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
    (change)="onQuantitySelected($any($event.target).value)">
      <option disabled value=""> ----  select a quantity ---- </option>
      <option *ngFor="let q of qtyAvailable()"> {{ q }} </option>
    </select>

    <div>Vehicle: {{ selectedVehicle().name }} </div>
    <div>Price: {{ selectedVehicle().price | number: '1.2-2' }} </div>
    <div>Total: {{ extendedPrice() | number: '1.2-2' }}</div>
  `,
})
export class App {
  quantity = signal(1);
  qtyAvailable = signal([1, 2, 3, 4, 5, 6]);
  selectedVehicle = signal<Vehicle>({ id: 1, name: "Volvo", price: 30000 })
  vehicles = signal<Vehicle[]>([]);

  // computed value
  extendedPrice = computed(() => this.selectedVehicle().price * this.quantity())

  constructor(){
    console.log(this.quantity());

    // NOTE: This will print 2 in the select!
    this.quantity.update(qty => qty * 2);

    this.selectedVehicle.mutate(v => v.price = v.price + (v.price * .2))
  }

  onQuantitySelected(qty: number){
    this.quantity.set(qty);

    // Always set to the most recent value. Uncomment to see!
    // this.quantity.set(5);
    // this.quantity.set(42);
  }

  qtyEffect = effect(() => console.log("Latest quantity: ", this.quantity()));

}

bootstrapApplication(App);


export interface Vehicle {
  id: number, 
  name: string, 
  price: number
}