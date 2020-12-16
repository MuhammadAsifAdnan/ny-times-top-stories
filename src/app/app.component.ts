import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  styleUrls: ['./app.component.scss'],
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
})
export class AppComponent {}
