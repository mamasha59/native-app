import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Image } from "expo-image";

import { iLanguage } from "../../../types";

interface iLanguageItem {
    item: iLanguage,
    handleClickSwitchLanguage: (language: iLanguage) => void,
    chosenLanguage: iLanguage,
}

const LanguageItem = ({item, handleClickSwitchLanguage, chosenLanguage}:iLanguageItem) => {
    
  return (
    <TouchableOpacity
            className="flex-row justify-between items-center mb-5 py-5 px-2 border-b border-[#bdc3c755]"
            key={item.id}
            onPress={() => handleClickSwitchLanguage(item)}>
        <View className="flex-row items-center">
        <View className="w-8 h-8 mr-2 items-center">
            <Image
                style={{width:'100%', height:'100%'}}
                source={item.icon}
                placeholder={item.id}
                contentFit="cover"
                transition={1000}
            />
        </View>
        <Text style={{fontFamily: chosenLanguage?.id === item.id ? 'geometria-bold' : 'geometria-regular'}} className={`text-center text-[#101010] text-lg leading-[22px] ml-1`}>{item.title}</Text>
        </View>
        <View className="border border-[#bdc3c7] w-5 h-5 rounded-full items-center justify-center">
            <View className={`w-[11px] h-[11px] rounded-full bg-main-blue hidden ${chosenLanguage?.id === item.id && 'flex'}`}></View>
        </View>
    </TouchableOpacity>
  );
};

export default LanguageItem;
