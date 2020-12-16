import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-story-tiles',
  template: `
    <owl-carousel-o [options]="customOptions">
      <ng-container *ngFor="let story of stories">
        <ng-template carouselSlide [id]="story.uri">
          <div class="story-tile-wrapper" (click)="setSelectedStory(story)">
            <h4 class="title">{{ story.title }}</h4>
            <app-multimedia-view
              [multimedia]="story.multimedia"
              format="mediumThreeByTwo210"
            ></app-multimedia-view>
          </div>
        </ng-template>
      </ng-container>
    </owl-carousel-o>
  `,
  styleUrls: ['./story-tiles.component.scss'],
})
export class StoryTilesComponent implements OnInit {
  @Input() stories: Article[] | [] = [];
  @Output() onSelectedArticle = new EventEmitter<Article>();
  customOptions: OwlOptions = {
    loop: false,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<', '>'],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 4,
      },
      940: {
        items: 5,
      },
    },
    nav: true,
  };
  constructor() {}

  ngOnInit(): void {}

  setSelectedStory(story: Article) {
    this.onSelectedArticle.emit(story);
  }
}
