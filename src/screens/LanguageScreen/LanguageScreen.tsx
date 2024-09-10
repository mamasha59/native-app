import { Animated, Vibration, ActivityIndicator } from "react-native";
import { useState, useRef } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

import WelcomeLayout from "../../Layouts/WelcomeLayout/WelcomeLayout";
import { iLanguage } from "../../types/index";
import { NavigationPropsWelcome } from "../UserData/UserData";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { activateRobotSpeech, setLanguage } from "../../store/slices/appStateSlicer";
import { languages } from "../../utils/const";
import Alert from "../../components/Alert/Alert";
import Error from "../../components/Alert/Error/Error";
import LanguageItem from "./LanguageItem/LanguageItem";

interface iLanguageScreen extends NavigationPropsWelcome<'LanguageScreen'>{}

const LanguageScreen = ({navigation}:iLanguageScreen) => {
  const {t} = useTranslation();

  const dispatch = useAppDispatch();
  const selectedLanguage = useAppSelector(state => state.appStateSlice.setLanguage);

  const [loader, setLoader] = useState<boolean>(false);
  const [error, showError] = useState<boolean>(false);

  const shakeAnimation = useRef(new Animated.Value(0)).current;
      
  const startShakeAnimation = () => {
      Animated.sequence([
        Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver:true }),
        Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver:true }),
        Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver:true }),
        Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver:true }),
      ]).start();
  };
  
  const handleBegin = () => {
    if(selectedLanguage.title.length > 0){
      dispatch(activateRobotSpeech(''));
      navigation.navigate('FirstDataScreen');
      Vibration.cancel();
    }else{
      Vibration.vibrate(50, true);
      startShakeAnimation();
    }
  }

  const handleClickSwitchLanguage = (language:iLanguage) => {
    if(language.id){
      i18next.changeLanguage(language.id)
      .then(() => {
        dispatch(setLanguage(language));
        setLoader(true);
        dispatch(activateRobotSpeech(t("switching_language")));
      })
      .catch((e) => showError(!error))
      .finally(() => {
        setTimeout(() => {
          setLoader(false);
        },300)
      })
    }
  }

  const closeErrorModal = () => showError(!error); 

  return (
    <WelcomeLayout currentScreen={0} buttonTitle={t("continue")} handleProceed={handleBegin}>
      <Animated.ScrollView style={{ transform: [{ translateX: shakeAnimation }], position:'relative' }}>
      {loader 
        ? <ActivityIndicator size="large" color="#0000ff" />
        : languages.map((el:iLanguage) =>
            <LanguageItem
              item={el}
              chosenLanguage={selectedLanguage}
              handleClickSwitchLanguage={handleClickSwitchLanguage}
              key={el.id}
            />
          )
      }
      </Animated.ScrollView>
      <Alert modalAlertState={error} setModalAlertState={showError} key={'languagescreenerror'}>
        <Error close={closeErrorModal}/>
      </Alert>
    </WelcomeLayout>
  );
};

export default LanguageScreen;
