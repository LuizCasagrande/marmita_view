import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: []
})
export class LoginComponent {

  @Output() deslogar: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }

}
