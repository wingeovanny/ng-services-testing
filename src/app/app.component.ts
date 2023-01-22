import { Calculator } from './calculator';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'ng-services-testing';

  ngOninit() {
    const calculator = new Calculator();
    const rst = calculator.div(3, 0);
    console.log(rst === null);
    const rdiv = calculator.mul(3, 4);
    console.log(rdiv === 12);
  }
}
