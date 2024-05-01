import { useState, useCallback } from 'react';

type FunctionArguments<T extends (...args: any) => Promise<any>> =
  Parameters<T>;

interface UseMutationOptions<T extends (...args: any) => Promise<any>> {
  mutationFn: T;
  onSuccess?: (result: Awaited<ReturnType<T>>) => void;
  onError?: (error: Error) => void;
}

export type ProxiedUseMutationOptions = Omit<
  UseMutationOptions<() => Promise<unknown>>,
  'mutationFn'
>;

export const useMutation = <T extends (...args: any) => Promise<any>>({
  mutationFn,
  onSuccess,
  onError,
}: UseMutationOptions<T>) => {
  const [isLoading, setIsLoading] = useState(false);

  const callback = useCallback(
    async (...args: FunctionArguments<T>): Promise<Awaited<ReturnType<T>>> => {
      setIsLoading(true);
      try {
        const result = await mutationFn(...args);
        if (onSuccess) {
          onSuccess(result);
        }
        return result;
      } catch (err) {
        if (onError) {
          onError(err as Error);
        }
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [mutationFn, onSuccess, onError],
  );

  return {
    mutateAsync: callback,
    isLoading,
  };
};
