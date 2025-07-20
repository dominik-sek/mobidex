import { useEffect, useState } from 'react';

interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export const useFetch = <T>(fetchFn: () => Promise<T>, deps: any[] = []): UseFetchState<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetchFn()
      .then((res) => {
        if (!cancelled) {
          setData(res);
          setLoading(false);
      }
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(err instanceof Error ? err : new Error(String(err)))
          setLoading(false);
      }
      })
    return () => {
      cancelled = true
    }
  }, deps)

  return {
    loading,
    error,
    data
  }
}
