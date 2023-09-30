import { View, Text, Pressable, ScrollView } from "react-native";
import GradientBackground from "../GradientBackground/GradientBackground";

interface iWelcomeLayout {
    children: React.ReactNode;
    title?: string;
    handleProceed: () => void;
    buttonTitle: string;
    index?: number;
    skip?: boolean;
    skipNextScreen?: () => void;
}

const WelcomeLayout = ({children,title,handleProceed,buttonTitle, index, skip, skipNextScreen}:iWelcomeLayout) => {

  return (
    <GradientBackground> 
    <View className="items-center">
        <Text style={{fontFamily:'geometria-bold'}} className="w-full text-center text-[40px] leading-[48px] text-[#FFFFFF] my-[50px]">
            Uro<Text className="italic">Control</Text>
        </Text>
    </View>

    <View className="bg-[#FFFFFF] flex-1 rounded-t-2xl pt-[60px] px-[38px] h-full justify-between items-center">
        <ScrollView className="flex-1 w-full">
            <View className="w-full">
                <Text style={{fontFamily:'geometria-bold'}} className="text-main-blue text-center text-lg leading-5 mb-10">{title}</Text>
                {children}
            </View>
        </ScrollView>

        <View className="w-full items-center mb-5">
            <Pressable onPress={handleProceed} className="max-w-[300px] w-full py-[19px] bg-main-blue rounded-[89px] items-center">
                <Text style={{fontFamily:'geometria-bold'}} className="text-base leading-5 text-[#FFFFFF]">{buttonTitle}</Text>
            </Pressable>
            {(index || skip) && 
            <View className="w-full items-center justify-center mt-10">
                {index 
                ? <Text style={{fontFamily:'geometria-regular'}} className="text-xs leading-[14px] text-[#101010] opacity-50">Шаг {index} из 3</Text>
                : skip && <Pressable onPress={skipNextScreen}><Text style={{fontFamily:'geometria-regular'}} className="text-xs leading-[14px] text-main-blue opacity-50">Изменить позже</Text></Pressable>
                }
            </View>}
        </View>
    </View>
    </GradientBackground>
  );
};

export default WelcomeLayout;