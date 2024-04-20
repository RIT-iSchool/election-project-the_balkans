'use client';
import { useSystemReport } from '@/hooks/use-system-report';

export default function Page() {
  const { data: systemReport } = useSystemReport();

  return (
    <div className="flex min-h-screen flex-col p-4">
      <pre>{JSON.stringify(systemReport, null, 2)}</pre>
    </div>
  );
}
