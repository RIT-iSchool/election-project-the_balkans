'use client';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { Button, Text } from 'frosted-ui';
import pluralize from 'pluralize';

const PAGE_SIZE = 15;

type PaginationProps = {
  totalCount?: number;
  resource: string;
};

const Pagination = ({ totalCount = 0, resource }: PaginationProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const page = Number(searchParams.get('page') || 1);
  const hasMore = page * PAGE_SIZE < totalCount;
  const hasPrev = page > 1;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const showing = useMemo(
    () =>
      `Showing ${page * PAGE_SIZE - PAGE_SIZE + 1}-${Math.min(
        page * PAGE_SIZE,
        totalCount,
      )} of ${totalCount} ${pluralize(resource, totalCount)}`,
    [page, totalCount, resource],
  );

  const goToPrevious = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set('page', (page - 1).toString());

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, searchParams, router, page]);

  const goToNext = useCallback(() => {
    const params = new URLSearchParams(searchParams);
    params.set('page', (page + 1).toString());

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, searchParams, router, page]);

  return (
    <div className="border-gray-a5 flex w-full items-center justify-between border-t px-6 py-2">
      <Text
        size="2"
        color="gray"
        className="hidden text-sm text-neutral-500 sm:block"
      >
        {showing}
      </Text>
      <div className="text-sm text-neutral-500 sm:hidden">
        Page {page} of {totalPages}
      </div>

      <div className="space-x-2">
        <Button
          onClick={goToPrevious}
          disabled={!hasPrev}
          type="button"
          size="2"
        >
          Previous
        </Button>
        <Button onClick={goToNext} disabled={!hasMore} type="button" size="2">
          Next
        </Button>
      </div>
    </div>
  );
};

Pagination.displayName = 'Pagination';

export { Pagination };
