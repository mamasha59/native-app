import { Text, TouchableOpacity, Animated, View } from "react-native";
import { useState, useRef } from "react";

import WelcomeLayout from "../../components/WelcomeLayout/WelcomeLayout";
import { NavigationPropsStart } from "../../App";
import { iLanguage } from "../../Types";

interface iLanguageScreen extends NavigationPropsStart<'LanguageScreen'>{}

const LanguageScreen = ({navigation}:iLanguageScreen) => {

  const [chosenLanguage, setChosenLanguage] = useState<string>(''); // берем выбранный язык
  const shakeAnimation = useRef(new Animated.Value(0)).current;

    const languages: iLanguage[] = [
        {
          id: 'Русский',
          title: 'Русский',
          chosed: false,
        },
        {
          id: 'Английский',
          title: 'Английский',
          chosed: false,
        },
        {
          id: 'Немецкий',
          title: 'Немецкий',
          chosed: false,
        },
        {
          id: 'Французкий',
          title: 'Французкий',
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
        if(chosenLanguage.length > 0){
            // перенаправляем пользователя на следующую страницу заполнений данных
            navigation.navigate('WelcomeScreens');
            //TODO - менять язык, сетить язык в сторе
        }else{
           startShakeAnimation()
        }
    }

    const handleClickLang = (title:string) => {
      setChosenLanguage(title);
    }

  return (
    <WelcomeLayout title={'Выберите язык'} buttonTitle="Начать пользоваться" handleProceed={handleBegin}>
            <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
              {languages.map((el:iLanguage,index:number)=>
              <TouchableOpacity key={index} onPress={() => handleClickLang(el.title)}>
                    <Text className={`mb-[30px] text-center text-[#101010] text-lg leading-[22px] font-normal`}>{el.title}</Text>
              </TouchableOpacity>
              )}
              {chosenLanguage && <View className="items-center mt-32">
                  <Text>Вы выбрали: <Text className="text-[#9966AA]">{chosenLanguage}</Text></Text>
              </View>}
            </Animated.View>
    </WelcomeLayout>
  );
};

export default LanguageScreen;
