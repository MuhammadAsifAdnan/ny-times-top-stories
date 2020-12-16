import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-article',
  template: `
    <div class="article-wrapper" *ngIf="article">
      <h1 class="title">{{ article.title }}</h1>
      <p class="byline">{{ article.byline }}</p>
      <span>{{ article.published_date | date }}</span>
      <app-multimedia-view
        [multimedia]="article.multimedia"
        format="superJumbo"
      ></app-multimedia-view>
      <p class="abstract">{{ article.abstract }}</p>
    </div>
  `,
  styleUrls: ['./article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ArticleComponent implements OnInit {
  @Input() article?: Article | null;
  constructor() {}

  ngOnInit(): void {}
}
