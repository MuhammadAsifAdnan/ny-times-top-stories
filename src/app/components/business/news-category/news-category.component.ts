import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { SectionEnum } from 'src/app/enums/section.enum';
import { Article } from 'src/app/models/article';
import { ResponseModel } from 'src/app/models/response.model';
import { ApiService } from 'src/app/services/api.service';
import { IndexedDBService } from 'src/app/services/indexed-db.service';

@Component({
  selector: 'app-news-category',
  styleUrls: ['./news-category.component.scss'],
  template: ` <p *ngFor="let story of stories">{{ story.title }}</p> `,
})
export class NewsCategoryComponent implements OnInit, OnDestroy {
  routeParamSubscription: Subscription;
  stories: Article[] | [] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private indexedDBService: IndexedDBService
  ) {
    this.routeParamSubscription = this.activatedRoute.paramMap.subscribe(
      async (params: ParamMap) => {
        const section = params.get('section') || '';
        // section && this.fetchTopStories(this.getSectionName(section));
        this.stories = await indexedDBService.getAllArticles(
          this.getSectionName(section)
        );
      }
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.routeParamSubscription.unsubscribe();
  }

  // todo refactor
  getSectionName(section: string): SectionEnum {
    switch (section) {
      case SectionEnum.Home:
        return SectionEnum.Home;
      case SectionEnum.Arts:
        return SectionEnum.Arts;
      case SectionEnum.US:
        return SectionEnum.US;
      case SectionEnum.World:
        return SectionEnum.World;
      case SectionEnum.Science:
        return SectionEnum.Science;
      default:
        return SectionEnum.Home;
    }
  }

  fetchTopStories(section: SectionEnum): void {
    this.apiService
      .fetchTopStories(section)
      .subscribe((topStoriesResponse: ResponseModel) => {
        if (topStoriesResponse.status === 'OK') {
          // const { section, results } = topStoriesResponse;
          this.indexedDBService.connectToDB();

          this.indexedDBService
            .putArticlesList(section, topStoriesResponse.results)
            .catch((error) => console.log(error));
        }
      });
  }

  putArticle() {}

  async getArticle() {}
}
