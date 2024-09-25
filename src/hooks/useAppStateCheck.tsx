import { useCallback, useEffect } from 'react';
import { NativeEventSubscription, AppState, AppStateStatus } from 'react-native';

interface useAppStateCheckProps {
  setAppStateStatus: React.Dispatch<React.SetStateAction<AppStateStatus>>;
}

export default function useAppStateCheck(props: useAppStateCheckProps) {
  const { setAppStateStatus } = props;

  const handleAppStateChange = useCallback(async (nextAppState: AppStateStatus) => {
    setAppStateStatus(nextAppState);
  }, [setAppStateStatus]);

  useEffect(() => {
    let eventListener: NativeEventSubscription;
    eventListener = AppState.addEventListener('change', handleAppStateChange);

    return () => {
      eventListener && eventListener.remove();
    };
  }, [handleAppStateChange]);
}