import { Image } from "expo-image";
import { Text, TouchableOpacity, Animated, View, Vibration, ActivityIndicator } from "react-native";
import { useState, useRef } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

import WelcomeLayout from "../../Layouts/WelcomeLayout/WelcomeLayout";
import { iLanguage } from "../../types/index";
import { NavigationPropsWelcome } from "../UserData/UserData";
import { useAppDispatch } from "../../store/hooks";
import { activateRobotSpeech, setLanguage } from "../../store/slices/appStateSlicer";
import { languages } from "../../utils/const";
import Alert from "../../components/Alert/Alert";
import Error from "../../components/Alert/Error/Error";

interface iLanguageScreen extends NavigationPropsWelcome<'LanguageScreen'>{}

const LanguageScreen = ({navigation}:iLanguageScreen) => {
  const {t} = useTranslation();

  const dispatch = useAppDispatch();
  const [loader, setLoader] = useState<boolean>(false);
  const [error, showError] = useState<boolean>(false);
  const [chosenLanguage, setChosenLanguage] = useState<iLanguage>({
    id: '',
    title: '',
    selected: false,
    icon: '',
  });

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
    if(chosenLanguage.title!.length > 0){
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
      setChosenLanguage(language);
    }
  }

  const closeErrorModal = () => showError(!error); 

  return (
    <WelcomeLayout currentScreen={0} buttonTitle={t("continue")} handleProceed={handleBegin}>
       <Animated.ScrollView style={{ transform: [{ translateX: shakeAnimation }], position:'relative' }}>
      {loader 
        ? <ActivityIndicator size="large" color="#0000ff" />
        : languages.map((el:iLanguage, index:number) =>
          <TouchableOpacity
            className="flex-row justify-between items-center mb-5 py-5 px-2 border-b border-[#bdc3c755]"
            key={index}
            onPress={() => handleClickSwitchLanguage(el)}>
            <View className="flex-row items-center">
              <View className="w-8 h-8 mr-2 items-center">
                <Image
                  style={{width:'100%', height:'100%'}}
                  source={el.icon}
                  placeholder={el.id}
                  contentFit="cover"
                  transition={1000}
                />
              </View>
              <Text style={{fontFamily: chosenLanguage?.id === el.id ? 'geometria-bold' : 'geometria-regular'}} className={`text-center text-[#101010] text-lg leading-[22px] ml-1`}>{el.title}</Text>
            </View>
            <View className="border border-[#bdc3c7] w-5 h-5 rounded-full items-center justify-center">
              <View className={`w-[11px] h-[11px] rounded-full bg-main-blue hidden ${chosenLanguage?.id === el.id && 'flex'}`}></View>
            </View>
          </TouchableOpacity>
        )}
      </Animated.ScrollView>
      <Alert modalAlertState={error} setModalAlertState={showError} key={'languagescreenerror'}>
        <Error close={closeErrorModal}/>
      </Alert>
    </WelcomeLayout>
  );
};

export default LanguageScreen;
