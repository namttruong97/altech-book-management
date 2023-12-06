import { FC } from 'react';

import { Empty } from 'antd';

import { SearchBookResponse } from 'model/book.model';

import { DEFAULT_PAGESIZE } from '../index';
import { BookCard } from './BookCard';

interface IBookBoardProps {
  data?: SearchBookResponse;
}

export const BookBoard: FC<IBookBoardProps> = ({ data }) => {
  return (
    <div className="grid grid-cols-3 gap-2 mb-4  com__bookBoard md:grid-cols-4 lg:gap-4 lg:grid-cols-5">
      {data?.docs?.length === 0 ? (
        <Empty
          className="mt-16 scale-150 lg:col-span-5"
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Book not found"
        />
      ) : (
        (data?.docs || [...Array(DEFAULT_PAGESIZE)]).map((item, index) => {
          return <BookCard key={index} isLoading={!item} {...item} />;
        })
      )}
    </div>
  );
};
