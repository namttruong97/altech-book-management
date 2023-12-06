export type BookResponse = {
  title: string;
  publish_date: string[];
  isbn: string[];
  author_name: string[];
  language: string[];
};

export type SearchBookResponse = {
  // count
  numFound: number;

  start: number;
  offset: number;
  docs: BookResponse[];
};
