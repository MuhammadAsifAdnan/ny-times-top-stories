import { Injectable } from '@angular/core';
import { IDBPDatabase, openDB } from 'idb';
import { SectionEnum } from '../enums/section.enum';
import { Article } from '../models/article';
import { NytTopStoriesDB } from '../models/db-schema';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  private nytTopStoriesDB!: IDBPDatabase<NytTopStoriesDB>;

  constructor() {
    this.connectToDB();
  }

  private async connectToDB() {
    this.nytTopStoriesDB = await openDB<NytTopStoriesDB>(
      'ny-times-top-stories',
      1,
      {
        async upgrade(nytTopStoriesDB) {
          // last_updated store -> stores the last update time of each section
          await nytTopStoriesDB.createObjectStore('last_updated');
          // stores for each section
          Object.values(SectionEnum).map(async (sectionName) => {
            const articlesStore = await nytTopStoriesDB.createObjectStore(
              sectionName,
              {
                keyPath: 'uri',
              }
            );
            await articlesStore.createIndex('updated_date', 'updated_date');
          });
        },
      }
    );
  }

  // in case we try to perform any queries before we are connected to the DB
  // todo: this can be improved
  private async checkIfDBConnected() {
    !this.nytTopStoriesDB && (await this.connectToDB());
  }

  // public async putArticle(storeName: SectionEnum, article: Article) {
  //   await this.checkIfDBConnected();
  //   await this.nytTopStoriesDB.put(storeName, article);
  // }

  public async putArticlesList(
    sectionName: SectionEnum,
    articles: Article[],
    lastUpdated: number
  ) {
    await this.checkIfDBConnected();
    const tx = this.nytTopStoriesDB.transaction(
      [sectionName, 'last_updated'],
      'readwrite'
    );
    await Promise.all([
      articles.map((article) => tx.objectStore(sectionName).put(article)),
      tx.objectStore('last_updated').put(lastUpdated, sectionName), // put last updated time in last_updated store
      tx.done,
    ]);
  }

  public async getArticle(storeName: SectionEnum, key: string) {
    await this.checkIfDBConnected();
    return await this.nytTopStoriesDB.get(storeName, key);
  }

  public async getAllArticles(storeName: SectionEnum) {
    await this.checkIfDBConnected();
    return await this.nytTopStoriesDB.getAllFromIndex(
      storeName,
      'updated_date'
    );
  }

  public async getLastUpdatedTime(section: SectionEnum) {
    await this.checkIfDBConnected();
    return (await this.nytTopStoriesDB.get('last_updated', section)) || 0;
  }
}
