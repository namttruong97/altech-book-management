import { ShareAltOutlined, ShoppingCartOutlined } from '@ant-design/icons';

import { FC, useMemo } from 'react';

import { Card, Skeleton } from 'antd';
import Image from 'next/image';
import { useQuery } from 'react-query';
import { getBookCover } from 'services/book';
import { capitalized } from 'utils/helper';

import { DropDown } from 'components/DropDown';

import { BookResponse } from 'model/book.model';

interface IBookCardProps extends BookResponse {
  isLoading: boolean;
}

export const BookCard: FC<IBookCardProps> = (props) => {
  const { data: bookCover, isLoading: isLoadingCover } = useQuery<string, Error>(
    ['bookCover', props.isbn?.[0]],
    () => getBookCover(props.isbn[0]),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      enabled: !!props.isbn?.[0],
    }
  );

  const coverImage = useMemo(() => {
    if (props?.isLoading || isLoadingCover) {
      // Loading image
      return <Skeleton.Image className="!w-full !h-[140px] lg:!h-[240px]" active />;
    } else if (!bookCover) {
      // Loading image failed
      return <Skeleton.Image className="!w-full !h-[140px] lg:!h-[240px]" />;
    } else {
      return (
        <div className="relative h-[140px] lg:h-[240px]">
          <Image alt="Avatar" className="object-contain" fill layout="cover" src={bookCover} />
        </div>
      );
    }
  }, [bookCover, isLoadingCover, props?.isLoading]);

  return (
    <Card
      hoverable
      loading={props?.isLoading}
      className="w-full"
      cover={coverImage}
      actions={[
        <ShoppingCartOutlined key="cart" className="lg:!text-xl" />,
        <DropDown key="share" placement="top" arrow>
          <ShareAltOutlined className="lg:!text-xl" />
        </DropDown>,
      ]}
    >
      <article className="p-2">
        <h1 className="h-12 font-medium lg:mb-2 lg:text-base text-primary line-clamp-2">
          {props?.title}
        </h1>

        <ul className="text-xs lg:text-sm">
          <li className="h-5 line-clamp-1">{props?.author_name?.[0]}</li>
          <li className="h-5 text-xs text-secondary">{props?.publish_date?.[0]}</li>
          <li className="h-5 mt-2 line-clamp-1 text-purple-primary">
            {props?.language?.map((item) => capitalized(item)).join(', ')}
          </li>
        </ul>
      </article>
    </Card>
  );
};
