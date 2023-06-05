import { View, Text, Pressable } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView } from "react-native-safe-area-context";

import { NavigationPropsStart } from "../../App";

interface iSlider extends NavigationPropsStart<'Slider'> {
    // Дополнительные свойства, специфичные для экрана Slider
    // ...
  }

const Slider = ({navigation}:iSlider) => {

    const handleStart = () => {
        navigation.navigate("Main");
    }

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
        <View className="bg-[#FFFFFF] flex-1 rounded-t-2xl border pt-[60px] px-[38px] h-full justify-between">
            <View className="items-center flex-1 border">
                {/* <FlatList
                    horizontal
                    data={}
                    renderItem={({item}) => <SlideItem item={item}/>}
                    keyExtractor={(item) => item.id}
                    pagingEnabled={true}
                /> */}
                <View className="items-center mt-10">
                    <Text>тут пагинация</Text>
                </View>
            </View>
            
            <View className="w-full items-center mb-5">
                <Pressable onPress={() => handleStart()} className="max-w-[300px] w-full py-[19px] bg-[#4BAAC5] rounded-[89px] items-center">
                    <Text className="text-base leading-5 text-[#FFFFFF]">Начать пользоваться</Text>
                </Pressable>
            </View>

        </View>
    </SafeAreaView>
    </LinearGradient>
  );
};

export default Slider;
