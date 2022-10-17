import { useBoolean } from './useBoolean';

export function useLoading(initValue = false) {
  const { bool: loading, setTrue: startLoading, setFalse: endLoading } = useBoolean();

  return {
    loading,
    startLoading,
    endLoading,
  };
}
