import { Component, OnInit } from '@angular/core';
import { SectionEnum } from 'src/app/enums/section.enum';
import { Nav } from 'src/app/models/nav';

@Component({
  selector: 'app-navigation',
  styleUrls: ['./navigation.component.scss'],
  template: `<mat-toolbar color="primary" class="app-navigation-wrapper">
    <span class="badge">{{ badge }}</span>
    <div class="nav-links-wrapper">
      <a
        *ngFor="let nav of navList"
        mat-button
        class="nav-link"
        routerLink="{{ nav.path }}"
        routerLinkActive="active"
        >{{ nav.displayName | uppercase }}
      </a>
    </div>
  </mat-toolbar>`,
})
export class NavigationComponent implements OnInit {
  constructor() {}

  badge = 'NY Times';
  navList: Nav[] = [
    { displayName: SectionEnum.Home, path: 'top-stories/home' },
    { displayName: SectionEnum.US, path: 'top-stories/us' },
    { displayName: SectionEnum.World, path: 'top-stories/world' },
    { displayName: SectionEnum.Science, path: 'top-stories/science' },
    { displayName: SectionEnum.Arts, path: 'top-stories/arts' },
  ];

  ngOnInit(): void {}
}
