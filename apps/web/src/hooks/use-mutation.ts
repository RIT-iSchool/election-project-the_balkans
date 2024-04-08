import { useState, useCallback } from 'react';

type FunctionArguments<T extends (...args: any) => Promise<any>> =
  Parameters<T>;

interface UseMutationOptions<T extends (...args: any) => Promise<any>> {
  mutationFn: T;
  onSuccess: (result: ReturnType<T>) => void;
  onError: (error: Error) => void;
}

export const useMutation = <T extends (...args: any) => Promise<any>>({
  mutationFn,
  onSuccess,
  onError,
}: UseMutationOptions<T>) => {
  const [isLoading, setIsLoading] = useState(false);

  const callback = useCallback(
    async (...args: FunctionArguments<T>) => {
      setIsLoading(true);

      try {
        const result = await mutationFn(...args);
        onSuccess(result);
        return result;
      } catch (err) {
        onError(err as Error);
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn],
  );

  return {
    mutateAsync: callback,
    isLoading: isLoading,
  };
};
