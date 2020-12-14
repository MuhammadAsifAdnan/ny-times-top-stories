import { Component } from '@angular/core';
import { openDB } from 'idb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ny-times';
  // hello = openDB.open('hello', 1);
}
