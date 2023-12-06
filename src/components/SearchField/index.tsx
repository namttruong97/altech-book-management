import Search, { SearchProps } from 'antd/lib/input/Search';

import { FC } from 'react';

import { classMapping } from 'utils/helper';

type ISearchFieldProps = SearchProps;

export const SearchField: FC<ISearchFieldProps> = (props) => {
  return (
    <Search
      className={classMapping('relative w-full rounded-2xl mb-4', props.className)}
      allowClear
      enterButton="Search"
      {...props}
    />
  );
};
