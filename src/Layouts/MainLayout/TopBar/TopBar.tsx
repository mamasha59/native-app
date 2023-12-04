import { View, Text, TouchableOpacity, Animated } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';
import { useRef } from 'react';

import { ArrowBack, Bell } from "../../../assets/images/icons";
import { StackNavigation } from "../../../App";

const TopBar = () => {
    const route = useRoute(); // берем имена маршрутов
    const navigation = useNavigation<StackNavigation>(); // берем навигацию, так как это лейаут то не можем через пропс скринов
    const opacityAnimation = useRef(new Animated.Value(0)).current;

    const showLogo = route.name === 'Home'

    const goBack = () => navigation.canGoBack() && navigation.goBack(); // проверяем есть ли куда назад еще идти 

  return (
    <View className="flex-row justify-between items-center p-6">
        {showLogo 
            ? (<Text style={{fontFamily: 'geometria-bold'}} className="text-xl flex-1 leading-7 text-[#FFFFFF]">
                Uro<Text className="italic text-xl leading-7 font-bold">Control</Text> {/*UROCONTROL LOGO*/}
              </Text>)
            // КНОПКА НАЗАД
            : (<TouchableOpacity onPress={goBack}><ArrowBack width={20} height={28} color={'#ffff'}/></TouchableOpacity>)}
          <TouchableOpacity onPress={() => navigation.navigate('NoticeAccessScreens')}>
              <Bell width={20} height={20}/>
          </TouchableOpacity>
    </View>
  );
};
export default TopBar;
