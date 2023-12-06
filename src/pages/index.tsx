import backgroundImage from 'assets/book-background.jpg';
import BookSearch from 'layouts/BookSearch';

import { useAtom } from 'jotai';
import Image from 'next/image';

import { Layout } from 'components/Layout';

import { bookAtom } from 'store/bookAtom';

export default function Homepage() {
  const [bookGlobalStore] = useAtom(bookAtom);

  return (
    <Layout title="Altech - Book Management" isLoading={!bookGlobalStore?.length}>
      <div className="gap-4 lg:grid lg:grid-cols-3 lg:px-12">
        <div className="flex flex-col justify-between mb-8 lg:mb-0">
          <div className="flex-1">
            <Image
              className="col-span-1 lg:w-[30vw] lg:fixed lg:rounded"
              src={backgroundImage}
              alt="Sidebar image"
            />
          </div>

          <span className="hidden mt-8 text-base italic text-secondary animate-pulse lg:block">
            Designed by Nam Truong
          </span>
        </div>
        <BookSearch className="px-4 min-w-[350px] md:px-24 md:min-w-[650px] lg:col-span-2 lg:px-0 lg:block" />
      </div>
    </Layout>
  );
}
