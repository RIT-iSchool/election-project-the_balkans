import { Card, Flex, Text } from 'frosted-ui';

type StatsCardProps = {
  label: string;
  count?: number | string;
  unit?: string;
};

export const StatsCard = ({ label, count, unit }: StatsCardProps) => {
  return (
    <Card>
      <Flex direction="column">
        <Text size="2" weight="medium" color="gray">
          {label}
        </Text>
        <Text size="6" weight="medium">
          {count} {unit}
        </Text>
      </Flex>
    </Card>
  );
};
