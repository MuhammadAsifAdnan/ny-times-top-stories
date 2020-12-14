import { Component, OnInit } from '@angular/core';
import { NavigationEnum } from 'src/app/enums/nav-list';
import { Nav } from 'src/app/models/nav';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
})
export class NavigationComponent implements OnInit {
  constructor() {}

  badge = 'NyTimes';
  navList: Nav[] = [
    { displayName: NavigationEnum.Home, path: 'top-stories/home' },
    { displayName: NavigationEnum.US, path: 'top-stories/us' },
    { displayName: NavigationEnum.World, path: 'top-stories/world' },
    { displayName: NavigationEnum.Science, path: 'top-stories/science' },
    { displayName: NavigationEnum.Arts, path: 'top-stories/arts' },
  ];

  ngOnInit(): void {}
}
