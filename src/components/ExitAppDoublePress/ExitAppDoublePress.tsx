import { ToastAndroid, Vibration, BackHandler, Platform } from "react-native";
import {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";

export const ExitAppDoublePress = () => {
    const {t} = useTranslation();
    const [exitApp, setExitApp] = useState(0);

    const backAction = () => {
        setTimeout(() => {
          setExitApp(0);
        }, 2000); // 2 seconds to tap second-time
    
        if (exitApp === 0) {
          setExitApp(exitApp + 1);
          Vibration.vibrate(10, true)
          ToastAndroid.show(t("press_one_more_time"), ToastAndroid.SHORT);
        } else if (exitApp === 1) {
          BackHandler.exitApp();
        }
        return true;
      };
    
      useEffect(() => {
        const backHandler = BackHandler.addEventListener(
          'hardwareBackPress',
          backAction,
        );
        return () => backHandler.remove();
      });
  return (
    <></>
  );
};

export default function DoubleTapToClose() {
    return Platform.OS !== 'ios' ? (
      <ExitAppDoublePress/>
    ) : (
      <></>
    );
  }