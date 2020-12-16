import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { CarouselModule } from 'ngx-owl-carousel-o';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/business/navigation/navigation.component';
import { PageNotFoundComponent } from './components/business/page-not-found/page-not-found.component';
import { NewsCategoryComponent } from './components/business/news-category/news-category.component';

import { HttpRequestInterceptor } from './interceptors/http-request.interceptor';
import { AppConfigService } from './services/app-config.service';
import { AppConfigInitializer } from './services/app-initializer.service';
import { ArticleComponent } from './components/business/article/article.component';
import { StoryTilesComponent } from './components/business/story-tiles/story-tiles.component';
import { MultimediaViewComponent } from './components/business/multimedia-view/multimedia-view.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PageNotFoundComponent,
    NewsCategoryComponent,
    ArticleComponent,
    StoryTilesComponent,
    MultimediaViewComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatIconModule,
    CarouselModule,
  ],
  providers: [
    AppConfigService,
    {
      provide: APP_INITIALIZER,
      useFactory: AppConfigInitializer,
      deps: [AppConfigService],
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
