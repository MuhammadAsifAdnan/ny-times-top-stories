import { Component, Input, OnInit } from '@angular/core';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article',
  template: `
    <div class="article-wrapper" *ngIf="article">
      <h1>{{ article.title }}</h1>
      <p>{{ article.byline }}</p>
      <app-multimedia-view
        [multimedia]="article.multimedia"
        format="superJumbo"
      ></app-multimedia-view>
    </div>
  `,
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent implements OnInit {
  @Input() article?: Article;
  constructor() {}

  ngOnInit(): void {}
}
