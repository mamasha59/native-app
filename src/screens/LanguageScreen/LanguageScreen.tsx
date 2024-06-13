import { Text, TouchableOpacity, Animated, View, Vibration } from "react-native";
import { useState, useRef } from "react";
import { Feather } from '@expo/vector-icons';

import WelcomeLayout from "../../Layouts/WelcomeLayout/WelcomeLayout";
import { iLanguage } from "../../types/index";
import { NavigationPropsWelcome } from "../UserData/UserData";

interface iLanguageScreen extends NavigationPropsWelcome<'LanguageScreen'>{}

const LanguageScreen = ({navigation}:iLanguageScreen) => {

  const [chosenLanguage, setChosenLanguage] = useState<iLanguage>(); // берем выбранный язык
  const shakeAnimation = useRef(new Animated.Value(0)).current;

    const languages: iLanguage[] = [
        {
          id: 'Russian',
          title: 'Русский',
          chosed: false,
        },
        {
          id: 'English',
          title: 'English',
          chosed: false,
        },
        {
          id: 'Deutsch',
          title: 'Deutsch',
          chosed: false,
        },
        {
          id: 'Français',
          title: 'Français',
          chosed: false,
        },
        {
          id: 'Italiano',
          title: 'Italiano',
          chosed: false,
        },
      ];
      
    const startShakeAnimation = () => {
        Animated.sequence([
          Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver:true }),
          Animated.timing(shakeAnimation, { toValue: 10, duration: 50, useNativeDriver:true }),
          Animated.timing(shakeAnimation, { toValue: -10, duration: 50, useNativeDriver:true }),
          Animated.timing(shakeAnimation, { toValue: 0, duration: 50, useNativeDriver:true }),
        ]).start();
      };
    
    const handleBegin = () => { // начать пользоваться
        if(chosenLanguage && chosenLanguage.title.length > 0){
            // перенаправляем пользователя на следующую страницу заполнений данных
            navigation.navigate('FirstDataScreen');
            Vibration.cancel();
        }else{
           Vibration.vibrate(50, true)
           startShakeAnimation()
        }
    }

    const handleClickLang = (language:iLanguage) => {
      setChosenLanguage(language);
    }

  return (
    <WelcomeLayout currentScreen={0} buttonTitle="продолжить" handleProceed={handleBegin}>
      <Animated.ScrollView style={{ transform: [{ translateX: shakeAnimation }] }}>
        {languages.map((el:iLanguage,index:number)=>
          <TouchableOpacity className="flex-row justify-between items-center mb-5 py-5 px-2 border-b border-[#bdc3c755]" key={index} onPress={() => handleClickLang(el)}>
                <View className="flex-row">
                    <Feather name="flag" size={24} color="red" />
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
