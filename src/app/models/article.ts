export interface Article {
  title: string;
  abstract: string;
  byline: string;
  created_date: string;
  updated_date: string;
  published_date: string;
  url: string;
  uri: string;
  section: string;
  subsection: string;
  multimedia: Multimedia[];
}

interface Multimedia {
  caption: string;
  type: string;
  url: string;
  height: number;
  width: number;
  copyright: string;
  format: string;
}
