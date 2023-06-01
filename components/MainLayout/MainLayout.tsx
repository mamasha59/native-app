import { StatusBar } from "expo-status-bar";
import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bell } from "../../imgs/icons";

interface iMainLayout {
    children: React.ReactNode;
}

const MainLayout = ({children}:iMainLayout) => {
  return (
    <SafeAreaView className="bg-blue-300 font-geometrica">
       
            <View className="mt-7 px-6 flex-row justify-between items-center max-h-[10%]">
                <Text className="text-xl leading-7 font-bold text-[#FFFFFF]">Uro<Text className="italic text-xl leading-7 font-bold">Control</Text></Text>
                <TouchableOpacity>
                    <Bell width={20} height={20}/>
                </TouchableOpacity>
     
            </View>
            <View className="h-[90%] relative bg-white mt-6 rounded-t-2xl pt-[25px]">
                <View>
                    {children} 
                </View>
            </View>

            <StatusBar style="auto" /> 
    </SafeAreaView>
  );
};

export default MainLayout;
