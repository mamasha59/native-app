import { Text, TouchableOpacity, Animated } from "react-native";
import WelcomeLayout from "../../components/WelcomeLayout/WelcomeLayout";
import { useState, useRef } from "react";

const LanguageScreen = ({navigation}) => {

    const languages = [
        {
          id: 'Русский',
          title: 'Русский',
        },
        {
          id: 'Английский',
          title: 'Английский',
        },
        {
          id: 'Немецкий',
          title: 'Немецкий',
        },
        {
          id: 'Французкий',
          title: 'Французкий',
        },
      ];
      
    const [chosenLanguage, setChosenLanguage] = useState<string>(''); // берем выбранный язык
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
        if(chosenLanguage.length > 0){
            // перенаправляем пользователя на следующую страницу заполнений данных
            navigation.navigate('WelcomeScreens');
            //TODO - менять язык, сетить язык в сторе
        }else{
           startShakeAnimation()
        }
    }

  return (
    <WelcomeLayout title={'Выберите язык'} buttonTitle="Начать пользоваться" handleProceed={handleBegin}>
            <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
              {languages.map((e,index)=>
              <TouchableOpacity key={index} onPress={() => setChosenLanguage(e.title)}>
                    <Text className="mb-[30px] text-center text-lg leading-[22px] font-normal">{e.title}</Text>
              </TouchableOpacity>
              )}
            </Animated.View>
    </WelcomeLayout>
  );
};

export default LanguageScreen;
