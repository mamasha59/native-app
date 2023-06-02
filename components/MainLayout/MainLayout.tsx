import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute, useNavigation } from '@react-navigation/native';

import { ArrowBack, Bell } from "../../imgs/icons";
import { LinearGradient } from 'expo-linear-gradient';

interface iMainLayout {
    children: React.ReactNode;
}

const MainLayout = ({children}:iMainLayout) => {
  const route = useRoute(); // берем именя маршрутов
  const navigation = useNavigation(); // берем навигацию, так как это лейаут то не можем через пропс скринов
  const showLogo = route.name === 'Home';

  const goBack = () => { // проверяем есть ли куда назад еще идти 
    if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };
    
  return (
    <LinearGradient
      colors={['#4BAAC5', '#7076B0']}
      start={[0.001, 0.495]}
      end={[1, 0.505]}
      style={{ flex: 1 }}
    >
    <SafeAreaView className="font-geometrica flex-1">
  
      
        <View className="mt-7 px-6 flex-row justify-between items-center">
            {showLogo 
                ? (<Text className="text-xl leading-7 font-bold text-[#FFFFFF]">Uro<Text className="italic text-xl leading-7 font-bold">Control</Text></Text>)
                : (<TouchableOpacity onPress={goBack}><ArrowBack width={20} height={28} color={'#ffff'}/></TouchableOpacity>)}
            <TouchableOpacity>
                <Bell width={20} height={20}/>
            </TouchableOpacity>
        </View>

        <ScrollView className="h-full flex-1 bg-white mt-[15px] rounded-t-2xl pt-[25px]">
            {children} 
        </ScrollView>

        <StatusBar style="auto" /> 
 
    </SafeAreaView>

    </LinearGradient>
  );
};

export default MainLayout;
