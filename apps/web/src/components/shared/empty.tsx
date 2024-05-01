import { cn } from '@/lib/cn';
import { IconProps } from '@frosted-ui/icons/types';
import { Text } from 'frosted-ui';
import { ForwardRefExoticComponent } from 'react';

type EmptyProps = {
  icon: ForwardRefExoticComponent<IconProps>;
  title: string;
  subtitle: string;
  ghost?: boolean;
  className?: string;
};

const Empty = ({
  icon: Icon,
  title,
  subtitle,
  ghost,
  className,
}: EmptyProps) => {
  return (
    <div className="w-full px-6">
      <div
        className={cn(
          'border-gray-a5 flex h-72 flex-col items-center justify-center space-y-2 rounded-md py-10',
          {
            border: !ghost,
          },
          className,
        )}
      >
        <div className="border-gray-a5 mb-6 flex h-20 w-20 items-center justify-center rounded-xl border shadow-lg">
          <Icon className="text-gray-a9" />
        </div>
        <Text size="4" weight="medium">
          {title}
        </Text>
        <Text size="2" color="gray">
          {subtitle}
        </Text>
      </div>
    </div>
  );
};

export { Empty };
