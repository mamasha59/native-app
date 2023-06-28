import { View, Text, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from "expo-linear-gradient";
import { StatusBar } from "expo-status-bar";

interface iWelcomeLayout {
    children: React.ReactNode;
    title?: string;
    handleProceed: () => void;
    buttonTitle: string;
    index?: number;
    skip?: boolean;
    skipNextScreen?: (() => void | undefined);
}

const WelcomeLayout = ({children,title,handleProceed,buttonTitle, index, skip, skipNextScreen}:iWelcomeLayout) => {

  return (
    <LinearGradient
        colors={['#4BAAC5', '#7076B0']}
        start={[0.001, 0.495]}
        end={[1, 0.505]}
        style={{ flex: 1 }}
    >
    <SafeAreaView className="flex-1">
        
    <View className="items-center">
        <Text className="text-[40px] leading-[48px] font-bold text-[#FFFFFF] my-[50px]">
            Uro<Text className="italic text-[40px] leading-[48px] font-bold">Control</Text>
        </Text>
    </View>

    <View className="bg-[#FFFFFF] flex-1 rounded-t-2xl pt-[60px] px-[38px] h-full justify-between items-center">

        <ScrollView className="flex-1 w-full">
            <View className="w-full">
                <Text className="text-[#4BAAC5] text-center text-lg leading-5 font-bold mb-10">{title}</Text>
                {children}
            </View>
        </ScrollView>
 
        <View className="w-full items-center mb-5">
            <Pressable onPress={handleProceed} className="max-w-[300px] w-full py-[19px] bg-[#4BAAC5] rounded-[89px] items-center">
                <Text className="text-base leading-5 text-[#FFFFFF]">{buttonTitle}</Text>
            </Pressable>
            {(index || skip) && 
            <View className="w-full items-center justify-center mt-10">
                {index 
                ? <Text className="text-xs leading-[14px] text-[#101010] opacity-50">Шаг {index} из 3</Text>
                : skip && <Pressable onPress={()=>skipNextScreen()}><Text className="text-xs leading-[14px] text-[#4BAAC5] opacity-50">Изменить позже</Text></Pressable>
                }
            </View>}
        </View>
      
    </View>  

    <StatusBar style="auto"/>
    </SafeAreaView>
    </LinearGradient>
  );
};

export default WelcomeLayout;
