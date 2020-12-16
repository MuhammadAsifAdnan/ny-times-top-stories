import { DBSchema } from 'idb';
import { SectionEnum } from '../enums/section.enum';
import { Article } from './article';

export interface NytTopStoriesDB extends DBSchema {
  home: ArticleStoreSchema;
  us: ArticleStoreSchema;
  world: ArticleStoreSchema;
  science: ArticleStoreSchema;
  arts: ArticleStoreSchema;
  last_updated: { key: SectionEnum; value: number };
}

interface ArticleStoreSchema {
  key: string;
  value: Article;
  indexes: { updated_date: string };
}
