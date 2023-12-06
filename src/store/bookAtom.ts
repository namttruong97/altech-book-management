import { atom } from 'jotai';

import { BookResponse } from 'model/book.model';

export const bookAtom = atom<BookResponse[]>([]);
