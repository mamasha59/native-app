import { View, Text, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';

import { ArrowBack, Bell } from "../../../imgs/icons";
import { NavigationPropsStart } from "../../../App";

interface iNoticeAndAccess extends NavigationPropsStart<'MainScreen'> {}

const TopBar = () => {
// TODO СДЕЛАТЬ ТИП ДЛЯ useNavigation
    const route = useRoute(); // берем имена маршрутов
    const navigation = useNavigation(); // берем навигацию, так как это лейаут то не можем через пропс скринов
    const showLogo = route.name === 'Home';

    const goBack = () => { navigation.canGoBack() && navigation.goBack() } // проверяем есть ли куда назад еще идти 

  return (
    <View className="mt-7 px-6 flex-row justify-between items-center">
        {showLogo 
            ? (<Text style={{fontFamily: 'geometria-bold'}} className="text-xl flex-1 leading-7 text-[#FFFFFF]">Uro<Text className="italic text-xl leading-7 font-bold">Control</Text></Text>)
            : (<TouchableOpacity onPress={goBack}><ArrowBack width={20} height={28} color={'#ffff'}/></TouchableOpacity>)}
        <TouchableOpacity onPress={() => navigation.navigate('NoticeAccessScreens')}>
            <Bell width={20} height={20}/>
        </TouchableOpacity>
    </View>
  );
};

export default TopBar;
