import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="app-wrapper">
      <header>
        <app-navigation></app-navigation>
      </header>
      <div class="app-body">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {}
