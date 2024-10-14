import { View, Text, TouchableOpacity } from "react-native";
import { useRoute, useNavigation } from '@react-navigation/native';

import { ArrowBack } from "../../../assets/images/icons";
import { StackNavigationRoot } from "../../../components/RootNavigations/RootNavigations";
import RecommendationIcon from "../../../assets/images/iconsComponent/TabMenuIcons/RecommendationIcon";
import { Image } from "expo-image";

const TopBar = () => {
    const route = useRoute(); // берем имена маршрутов
    const navigation = useNavigation<StackNavigationRoot>(); // берем навигацию, так как это лейаут то не можем через пропс скринов

    const showLogo = route.name === 'Home'

    const goBack = () => navigation.canGoBack() && navigation.goBack(); // проверяем есть ли куда назад еще идти

  return (
    <View className="flex-row justify-between items-center h-16 px-6">
      {showLogo 
        ? (
          <View className="w-1/2 py-1">
              <Image
                style={{width: '100%', height: '100%'}}
                source={require('../../../assets/images/AppLogo.png')}
                contentFit="contain"
                transition={1000}
                contentPosition={'left center'}
                alt="Use Nelaton Easily Logo"
              />
          </View>
        )
        // Back button
        : (<TouchableOpacity onPress={goBack}><ArrowBack width={20} height={28} color={'#ffff'}/></TouchableOpacity>)}
        <TouchableOpacity onPress={() => navigation.navigate('Recommendation')}>
            <RecommendationIcon color={'#fff'} width={20}/>
        </TouchableOpacity>
    </View>
  );
};
export default TopBar;
