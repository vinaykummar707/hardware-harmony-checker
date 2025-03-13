
import { useState } from 'react';

interface UseMutationOptions<TData, TError, TVariables> {
  mutationFn: (variables: TVariables) => Promise<TData>;
  onSuccess?: (data: TData, variables: TVariables) => void;
  onError?: (error: TError, variables: TVariables) => void;
  onSettled?: (data: TData | undefined, error: TError | null, variables: TVariables) => void;
}

interface UseMutationResult<TData, TError, TVariables> {
  mutate: (variables: TVariables) => void;
  mutateAsync: (variables: TVariables) => Promise<TData>;
  data: TData | undefined;
  error: TError | null;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  reset: () => void;
}

export function useMutation<TData, TError = Error, TVariables = unknown>(
  options: UseMutationOptions<TData, TError, TVariables>
): UseMutationResult<TData, TError, TVariables> {
  const [data, setData] = useState<TData | undefined>(undefined);
  const [error, setError] = useState<TError | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  const reset = () => {
    setData(undefined);
    setError(null);
    setIsLoading(false);
    setIsSuccess(false);
    setIsError(false);
  };

  const mutateAsync = async (variables: TVariables): Promise<TData> => {
    setIsLoading(true);
    setIsSuccess(false);
    setIsError(false);
    
    try {
      const result = await options.mutationFn(variables);
      setData(result);
      setIsSuccess(true);
      
      if (options.onSuccess) {
        options.onSuccess(result, variables);
      }
      
      if (options.onSettled) {
        options.onSettled(result, null, variables);
      }
      
      return result;
    } catch (err) {
      setError(err as TError);
      setIsError(true);
      
      if (options.onError) {
        options.onError(err as TError, variables);
      }
      
      if (options.onSettled) {
        options.onSettled(undefined, err as TError, variables);
      }
      
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const mutate = (variables: TVariables) => {
    mutateAsync(variables).catch((_) => {
      // Error handling is done in mutateAsync
    });
  };

  return {
    mutate,
    mutateAsync,
    data,
    error,
    isLoading,
    isSuccess,
    isError,
    reset,
  };
}
