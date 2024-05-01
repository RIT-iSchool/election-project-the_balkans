'use client';
import { PageTitle } from '@/components/shared/page-title';
import { StatsCard } from '@/components/shared/stats-card';
import { useSystemReport } from '@/hooks/use-system-report';

export default function Page() {
  const { data: systemReport } = useSystemReport();

  return (
    <div className="flex min-h-screen flex-col gap-5 pt-6">
      <div className="space-y-5 px-6">
        <PageTitle
          title="System Report"
          description="Gather important statistics about the american dream elections system."
        />

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            label="Active Elections"
            count={systemReport?.activeElections}
          />

          <StatsCard
            label="Logged in users"
            count={systemReport?.loggedInUsers}
          />

          <StatsCard
            label="Average Response Time"
            count={systemReport?.averageResponseTime.toFixed(3)}
            unit="ms"
          />

          <StatsCard
            label="Average Request Time"
            count={systemReport?.averageRequestTime.toFixed(3)}
            unit="ms"
          />
        </div>
      </div>
    </div>
  );
}
