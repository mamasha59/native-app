import * as React from 'react';
import { AppStateStatus } from 'react-native';

const AppStateStatusContext = React.createContext<{appStateStatus: AppStateStatus; setAppStateStatus: React.Dispatch<React.SetStateAction<AppStateStatus>>}>({
    appStateStatus: 'active',
    setAppStateStatus: () => {},
});

export default AppStateStatusContext;