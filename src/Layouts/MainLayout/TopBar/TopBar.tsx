import { View, Text, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';

import { ArrowBack } from "../../../assets/images/icons";
import RecomendationIcon from "../../../assets/images/iconsComponent/TabMenuIcons/RecomendationIcon";
import { StackNavigationRoot } from "../../../components/RootNavigations/RootNavigations";

const TopBar = () => {
    const route = useRoute(); // берем имена маршрутов
    const navigation = useNavigation<StackNavigationRoot>(); // берем навигацию, так как это лейаут то не можем через пропс скринов

    const showLogo = route.name === 'Home'

    const goBack = () => navigation.canGoBack() && navigation.goBack(); // проверяем есть ли куда назад еще идти 

  return (
    <View className="flex-row justify-between items-center h-16 px-6">
      {showLogo 
        ? (
          <View className="justify-center flex-grow-0">
            <Text style={{fontFamily: 'geometria-regular'}} className="absolute top-0 text-[#fff]">Use</Text>
            <Text style={{fontFamily: 'geometria-bold'}} className="py-3 text-xl leading-7 text-[#fff]">Nelaton</Text>
            <Text style={{fontFamily: 'geometria-regular'}} className="absolute bottom-0 right-0 text-[#fff]">easily</Text>
          </View>
        )
        // КНОПКА НАЗАД
        : (<TouchableOpacity onPress={goBack}><ArrowBack width={20} height={28} color={'#ffff'}/></TouchableOpacity>)}
        <TouchableOpacity onPress={() => navigation.navigate('Recomendation')}>
            <RecomendationIcon color={'#fff'} width={20}/>
        </TouchableOpacity>
    </View>
  );
};
export default TopBar;
