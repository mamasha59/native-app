import { View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

const Selects = () => {

    const [selectedLanguage, setSelectedLanguage] = useState();

  return (
    <View className="pb-5">
        <Text className="text-[#101010] text-xs leading-[14px] mb-[10px]">Режим катетеризации</Text>
        {/*  Режим катетеризации   */}
        <View className="flex-row mb-5 gap-[10px]">
            <View className="border border-main-blue rounded-xl min-w-[185px] flex-1">
                <Picker
                    mode="dialog"
                    itemStyle={{fontSize:12}}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                }>
                    <Picker.Item label="Кол-во (5 раз в день)" value="Кол-во (5 раз в день)" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
            
            <View className="border border-main-blue rounded-xl min-w-[130px] flex-1">
                <Picker
                    mode="dialog"
                    itemStyle={{fontSize:12}}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                }>
                    <Picker.Item label="Каждые 3,5 ч" value="Каждые 3,5 ч" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>

        </View>
        {/*  Режим катетеризации   */}  

        {/*  Катетеризация в ночное время   */}  
        <Text className="text-[#101010] text-xs leading-[14px] mb-[10px]">Катетеризация в ночное время</Text>
        <View className="flex-row mb-5 gap-[10px]">
            <View className="border border-main-blue rounded-xl min-w-[185px] flex-1">
                <Picker
                    mode="dialog"
                    itemStyle={{fontSize:12}}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                }>
                    <Picker.Item label="Нелатон" value="Нелатон" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
            
            <View className="border border-main-blue rounded-xl min-w-[130px] flex-1">
                <Picker
                    mode="dialog"
                    itemStyle={{fontSize:12}}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                }>
                    <Picker.Item label="Да" value="Да" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
        </View>
        {/* 2я часть селектов Катетеризация в ночное время   */} 
        <View className="flex-row mb-5 gap-[10px]">
            <View className="border border-main-blue rounded-xl min-w-[185px] flex-1">
                <Picker
                    mode="dialog"
                    itemStyle={{fontSize:12}}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                }>
                    <Picker.Item label="Измерение кол-ва выделяемой  мочи " value="Измерение кол-ва выделяемой  мочи " />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
            
            <View className="border border-main-blue rounded-xl min-w-[130px] flex-1">
                <Picker
                    mode="dialog"
                    itemStyle={{fontSize:12}}
                    selectedValue={selectedLanguage}
                    onValueChange={(itemValue, itemIndex) =>
                        setSelectedLanguage(itemValue)
                }>
                    <Picker.Item label="Да" value="Да" />
                    <Picker.Item label="JavaScript" value="js" />
                </Picker>
            </View>
        </View>
        {/*  Катетеризация в ночное время   */}  
  </View>
  );
};

export default Selects;
