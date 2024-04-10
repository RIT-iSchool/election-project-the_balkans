'use client';

import { useDebounce } from '@/hooks/use-debounce';
import { useSocieties } from '@/hooks/use-societies';
import { useState } from 'react';

export default function Page() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 200);
  const societies = useSocieties({ search: debouncedQuery });

  console.log(societies);

  return (
    <div className="flex min-h-screen flex-col p-4">
      <div>yo</div>
    </div>
  );
}
