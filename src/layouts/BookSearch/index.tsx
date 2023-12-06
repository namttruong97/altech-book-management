import { FC, HTMLAttributes, useState } from 'react';

import { Pagination, Spin } from 'antd';
import { useAtom } from 'jotai';
import { useQuery } from 'react-query';
import { searchBook } from 'services/book';
import { classMapping } from 'utils/helper';
import { SearchQueryParams } from 'utils/types';

import { SearchField } from 'components/SearchField';

import { bookAtom } from 'store/bookAtom';

import { SearchBookResponse } from 'model/book.model';

import { BookBoard } from './components/BookBoard';
import { BookFilter } from './components/BookFilter';

export const DEFAULT_PAGESIZE = 20;
const DEFAULT_SEARCH_TITLE = 'Developer';

type IBookSearchProps = HTMLAttributes<HTMLDivElement>;

const BookSearch: FC<IBookSearchProps> = ({ className }) => {
  const [bookGlobalStore, setBookGlobalStore] = useAtom(bookAtom);
  const [paramQueryModel, setParamQueryModel] = useState<SearchQueryParams>({
    title: DEFAULT_SEARCH_TITLE,
    q: '',
    lang: '',
    offset: 1,
    limit: DEFAULT_PAGESIZE,
    total: 0,
  });

  const { data: listBook, isLoading } = useQuery<SearchBookResponse, Error>(
    ['searchBook', paramQueryModel],
    () => searchBook({ ...paramQueryModel }),
    {
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (!bookGlobalStore?.length) {
          setBookGlobalStore(data.docs);
        }
      },
    }
  );

  const handlePaginationChange = (offset: number, limit: number) => {
    setParamQueryModel({ ...paramQueryModel, offset, limit, total: listBook?.numFound });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (value: string): void => {
    setParamQueryModel({
      ...paramQueryModel,
      title: value.trim(),
      offset: 1,
      limit: DEFAULT_PAGESIZE,
    });
  };

  const handleFilter = (checked: boolean): void => {
    setParamQueryModel({
      ...paramQueryModel,
      offset: 1,
      lang: checked ? 'fr' : '',
      q: checked ? 'language:fre' : '',
      limit: DEFAULT_PAGESIZE,
    });
  };

  return (
    <div className={classMapping('com__bookSearch', className)}>
      <Spin className="h-full" spinning={isLoading}>
        <SearchField size="large" placeholder="Enter book name" onSearch={handleSearch} />
        <BookFilter onFilter={handleFilter} />
        <BookBoard data={listBook} />

        {!!listBook?.numFound && (
          <Pagination
            className="float-right"
            showSizeChanger
            responsive
            total={listBook?.numFound || paramQueryModel?.total}
            defaultPageSize={DEFAULT_PAGESIZE}
            showTotal={(total: number) => `Total ${total}`}
            current={paramQueryModel?.offset}
            onChange={handlePaginationChange}
          />
        )}
      </Spin>
    </div>
  );
};

export default BookSearch;
