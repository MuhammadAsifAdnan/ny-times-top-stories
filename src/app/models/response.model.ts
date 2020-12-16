import { Article } from './article';

export interface ResponseModel {
  copyright: string;
  last_updated: string;
  num_results: string;
  section: string;
  status: string;
  results: Article[];
}
