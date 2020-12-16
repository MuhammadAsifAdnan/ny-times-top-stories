import { Injectable } from '@angular/core';
import { DBSchema, IDBPDatabase } from 'idb';
import { openDB } from 'idb/with-async-ittr.js';
import { SectionEnum } from '../enums/section.enum';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root',
})
export class IndexedDBService {
  private nytTopStoriesDB!: IDBPDatabase<NytTopStoriesDB>;

  constructor() {
    this.connectToDB();
  }

  async connectToDB() {
    this.nytTopStoriesDB = await openDB<NytTopStoriesDB>(
      'ny-times-top-stories',
      1,
      {
        upgrade(nytTopStoriesDB) {
          // creating stores for each section
          Object.values(SectionEnum).map((sectionName) => {
            const articlesStoreHome = nytTopStoriesDB.createObjectStore(
              sectionName,
              {
                keyPath: 'uri',
              }
            );
            articlesStoreHome.createIndex('updated_date', 'updated_date');
          });
        },
      }
    );
  }

  private async checkIfDBConnected() {
    !this.nytTopStoriesDB && (await this.connectToDB());
  }

  public async putArticle(storeName: SectionEnum, article: Article) {
    await this.checkIfDBConnected();
    await this.nytTopStoriesDB.put(storeName, article);
  }

  public async putArticlesList(storeName: SectionEnum, articles: Article[]) {
    await this.checkIfDBConnected();
    const tx = this.nytTopStoriesDB.transaction(storeName, 'readwrite');
    await Promise.all([
      articles.map((article) => tx.store.put(article)),
      tx.done,
    ]);
  }

  public async getArticle(storeName: SectionEnum, key: number) {
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
}

interface NytTopStoriesDB extends DBSchema {
  home: ArticleStoreSchema;
  us: ArticleStoreSchema;
  world: ArticleStoreSchema;
  science: ArticleStoreSchema;
  arts: ArticleStoreSchema;
}

interface ArticleStoreSchema {
  key: number;
  value: Article;
  indexes: { updated_date: string };
}
