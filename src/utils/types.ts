export interface SearchQueryParams {
  title: string;
  q: string;

  offset?: number;
  limit?: number;
  total?: number;
  lang?: string;
}
