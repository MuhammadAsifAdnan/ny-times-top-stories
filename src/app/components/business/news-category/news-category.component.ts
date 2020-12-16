import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { SectionEnum } from 'src/app/enums/section.enum';
import { Article } from 'src/app/models/article';
import { ResponseModel } from 'src/app/models/response.model';
import { ApiService } from 'src/app/services/api.service';
import { AppConfigService } from 'src/app/services/app-config.service';
import { IndexedDBService } from 'src/app/services/indexed-db.service';

@Component({
  selector: 'app-news-category',
  styleUrls: ['./news-category.component.scss'],
  template: `
    <p *ngFor="let story of stories">{{ story.title }}</p>
    <mat-spinner *ngIf="loadingSpinner" class="loading-spinner"></mat-spinner>
  `,
})
export class NewsCategoryComponent implements OnInit, OnDestroy {
  routeParamSubscription!: Subscription;
  stories: Article[] | [] = [];
  loadingSpinner = false; // todo loading spinner be refactored when we introduce state management

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private indexedDBService: IndexedDBService
  ) {}

  ngOnInit(): void {
    this.routeParamSubscription = this.activatedRoute.paramMap.subscribe(
      async (params: ParamMap) => {
        const param = params.get('section');
        const section = this.getSectionName(param);
        this.loadSectionData(section);
      }
    );
  }

  ngOnDestroy(): void {
    this.routeParamSubscription.unsubscribe();
  }

  // loads top stories data from indexed db
  async loadSectionData(section: SectionEnum) {
    this.stories = await this.indexedDBService
      .getAllArticles(section)
      .then((articles: Article[]) =>
        articles.sort((a: Article, b: Article) => {
          const a_updated = new Date(a.updated_date).getTime();
          const b_updated = new Date(b.updated_date).getTime();
          if (a_updated === b_updated) {
            return 0;
          }
          return a_updated > b_updated ? -1 : 1;
        })
      );

    const lastUpdated = await this.indexedDBService.getLastUpdatedTime(section);
    const shouldUpdate =
      new Date().getTime() - lastUpdated >
      AppConfigService.appConfig.updateClientStoragePeriod;

    // if we do not have stories or the last updated time is more what mentioned in config.json we fetch again
    if (!this.stories.length || shouldUpdate) {
      this.getTopStories(section);
    }
  }

  // fetches data from api
  async getTopStories(section: SectionEnum) {
    this.loadingSpinner = true;
    this.apiService.fetchTopStories(section).subscribe(
      (topStoriesResponse: ResponseModel) => {
        if (topStoriesResponse.status === 'OK') {
          const { results } = topStoriesResponse;
          // todo : also store last_updated from api response
          this.indexedDBService
            .putArticlesList(section, results, new Date().getTime())
            .then(() => this.loadSectionData(section))
            .catch((error) => console.log(error))
            .finally(() => (this.loadingSpinner = false));
        }
      },
      (error) => {
        console.log('oops', error);
        this.loadingSpinner = false;
      } // todo: Better error handling
    );
  }

  // todo refactor
  getSectionName(section: string | null): SectionEnum {
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
}
