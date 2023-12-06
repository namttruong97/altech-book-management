import { SearchQueryParams } from 'utils/types';

import httpRequest, { IParams, parseQueryURL } from './httpRequest';

const API_ENDPOINT = 'https://openlibrary.org';
const COVER_ENDPOINT = 'https://covers.openlibrary.org/b/isbn';

export const searchBook = (params: SearchQueryParams) => {
  const obj: IParams = {
    url: parseQueryURL(`${API_ENDPOINT}/search.json`, params),
  };

  return httpRequest.get(obj);
};

export const getBookCover = async (key: string) => {
  const obj: IParams = {
    url: `${COVER_ENDPOINT}/${key}-M.jpg`,
    config: {
      responseType: 'blob',
    },
  };

  const result: Blob = await httpRequest.get(obj);

  if (!result.type.includes('image')) {
    return '';
  }
  return URL.createObjectURL(result);
};
