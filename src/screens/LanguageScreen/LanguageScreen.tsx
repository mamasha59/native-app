import { Image } from "expo-image";
import { Text, TouchableOpacity, Animated, View, Vibration } from "react-native";
import { useState, useRef } from "react";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

import WelcomeLayout from "../../Layouts/WelcomeLayout/WelcomeLayout";
import { iLanguage } from "../../types/index";
import { NavigationPropsWelcome } from "../UserData/UserData";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { activateRobotSpeech, handleLoader, setLanguage } from "../../store/slices/appStateSlicer";
import { languages } from "../../utils/const";
import Loader from "../../components/Loader/Loader";

interface iLanguageScreen extends NavigationPropsWelcome<'LanguageScreen'>{}

const LanguageScreen = ({navigation}:iLanguageScreen) => {
  const {t} = useTranslation();

  const dispatch = useAppDispatch();
  const loader = useAppSelector(state => state.appStateSlice.loader);

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
        dispatch(handleLoader(true));
        dispatch(activateRobotSpeech(t("switching_language")));
      })
      .catch((e) => {console.log(e)})
      .finally(() => {
        setTimeout(() => {
          dispatch(handleLoader(false));
        },1000)
      })
      setChosenLanguage(language);
    }
  }

  return (
    <WelcomeLayout currentScreen={0} buttonTitle={t("continue")} handleProceed={handleBegin}>
       <Animated.ScrollView style={{ transform: [{ translateX: shakeAnimation }], position:'relative' }}>
      {loader 
        ? <Loader/>
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
    </WelcomeLayout>
  );
};

export default LanguageScreen;
