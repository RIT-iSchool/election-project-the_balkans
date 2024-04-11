import { Text } from 'frosted-ui';

type PageTitle = {
  title: string;
  description: string;
};

export const PageTitle = ({ title, description }: PageTitle) => {
  return (
    <div className="flex flex-col gap-0.5">
      <Text size="8" className="font-[600]">
        {title}
      </Text>
      <Text size="3" color="gray">
        {description}
      </Text>
    </div>
  );
};
