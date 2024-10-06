import { createContext } from 'react';
import { AppStateStatus } from 'react-native';

interface iAppStateStatusContext {
    appStateStatus: AppStateStatus;
    setAppStateStatus: React.Dispatch<React.SetStateAction<AppStateStatus>>
}

const AppStateStatusContext = createContext<iAppStateStatusContext>({
    appStateStatus: 'active',
    setAppStateStatus: () => {},
});

export default AppStateStatusContext;